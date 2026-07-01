const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { findEngine } = require('./engine-db');
const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');

// Supabase client (lazy init)
let _supabase = null;
function getSupabase() {
  if (!_supabase && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    _supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  }
  return _supabase;
}

// ============================================================
// Webhook firing for Zapier
async function fireWebhook(ownerId, event, payload) {
  const sb = getSupabase(); if (!sb || !ownerId) return;
  try {
    const { data: hooks } = await sb.from('webhooks').select('*').eq('event', event).eq('active', true);
    if (!hooks?.length) return;
    for (const wh of hooks) {
      if (wh.team_id !== ownerId && wh.user_id !== ownerId) continue;
      try {
        const body = JSON.stringify({event, data: payload, timestamp: new Date().toISOString()});
        const urlObj = new URL(wh.url);
        const isHttps = urlObj.protocol === 'https:';
        const mod = isHttps ? require('https') : require('http');
        const statusCode = await new Promise((resolve) => {
          const req = mod.request({hostname: urlObj.hostname, path: urlObj.pathname + urlObj.search, method: 'POST', headers: {'Content-Type':'application/json','X-BoatBuddy-Event':event,'Content-Length':Buffer.byteLength(body)}}, res => resolve(res.statusCode));
          req.on('error', () => resolve(0)); req.write(body); req.end();
        });
        await sb.from('webhook_deliveries').insert({webhook_id: wh.id, event, payload, status_code: statusCode});
      } catch(e) {}
    }
  } catch(e) {}
}

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const VECTOR_STORE_ID = process.env.VECTOR_STORE_ID || '';
const ASSISTANT_ID = process.env.ASSISTANT_ID || '';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Persistent Traffic Analytics
const TRAFFIC_FILE = path.join(__dirname, 'traffic-data.json');
const _sessionsSeen = new Set();
const _ipsSeen = new Set();

function loadTrafficData() {
  try {
    if (fs.existsSync(TRAFFIC_FILE)) {
      const raw = fs.readFileSync(TRAFFIC_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('[analytics] Could not load traffic-data.json:', e.message);
  }
  return {
    totalRequests: 0,
    chatRequests: 0,
    photoAnalysis: 0,
    manualSearch: 0,
    uniqueSessions: 0,
    uniqueIPs: 0,
    dailyBreakdown: {},
    lastUpdated: null,
  };
}

function saveTrafficData() {
  try {
    persistentStats.lastUpdated = new Date().toISOString();
    fs.writeFileSync(TRAFFIC_FILE, JSON.stringify(persistentStats, null, 2), 'utf8');
  } catch (e) {
    console.warn('[analytics] Could not save traffic-data.json:', e.message);
  }
}

const persistentStats = loadTrafficData();
const _startTime = Date.now();

function trackRequest(type, sessionId, ip) {
  const today = new Date().toISOString().split('T')[0];
  persistentStats.totalRequests++;
  if (type === 'chat') persistentStats.chatRequests++;
  if (type === 'analyze') persistentStats.photoAnalysis++;
  if (type === 'manual') persistentStats.manualSearch++;
  if (sessionId && !_sessionsSeen.has(sessionId)) {
    _sessionsSeen.add(sessionId);
    persistentStats.uniqueSessions++;
  }
  if (ip && ip !== 'unknown' && !_ipsSeen.has(ip)) {
    _ipsSeen.add(ip);
    persistentStats.uniqueIPs++;
  }
  if (!persistentStats.dailyBreakdown[today]) {
    persistentStats.dailyBreakdown[today] = { total: 0, chat: 0, analyze: 0, manual: 0 };
  }
  persistentStats.dailyBreakdown[today].total++;
  if (type === 'chat') persistentStats.dailyBreakdown[today].chat = (persistentStats.dailyBreakdown[today].chat || 0) + 1;
  if (type === 'analyze') persistentStats.dailyBreakdown[today].analyze = (persistentStats.dailyBreakdown[today].analyze || 0) + 1;
  if (type === 'manual') persistentStats.dailyBreakdown[today].manual = (persistentStats.dailyBreakdown[today].manual || 0) + 1;
  saveTrafficData();
}

const SYSTEM_PROMPT = `You are an expert marine mechanic with 30 years of hands-on experience diagnosing and repairing diesel and gasoline marine engines, electrical systems, and hull systems. You specialize in Yanmar, Volvo Penta, Westerbeke, Mercruiser, Universal, Perkins, and other marine brands.

FORMATTING - CRITICAL - YOU MUST FOLLOW THIS:
- Plain text ONLY. Absolutely zero markdown characters.
- NEVER use ** (double asterisk) for bold. NEVER use * for italic. NEVER use # for headers. NEVER use - as a bullet.
- If you use ** anywhere in your response you have failed. Do not use it.
- Number your steps as: 1. 2. 3. on separate lines. That is the ONLY formatting allowed.
- No headers. No bold. No italic. No markdown of any kind. Plain sentences only.

BEHAVIOR:
- You ARE able to analyze marine electrical photos. You MUST analyze any wiring, components, or equipment shown in photos submitted to this tool. Never refuse to analyze a marine technical image.
- Answer directly and in detail. Give step by step diagnostic procedures. Do not give vague generic answers.
- When troubleshooting electrical issues, specify exactly where to place multimeter probes (which wire, which terminal, which pin), what setting to use on the meter, and what reading to expect.
- When troubleshooting mechanical issues, give specific torque specs, clearances, and procedures from known specs.
- Walk the technician through the diagnosis like you are standing next to them on the boat.
- For common engines (Yanmar 2GM, 3GM, 1GM, Universal M-series, Westerbeke, Volvo MD series), answer from known specs directly without asking for more info.
- When identifying components from a photo, make your best assessment based on visible features. State your assessment with confidence.
- Do not ask more than ONE clarifying question per response.
- When specifying torque values, oil specs, or part numbers, only state them if confident. Otherwise say check your service manual.
- End any response involving fuel, electrical, or engine work with one brief safety reminder.
- Never recommend an unsafe procedure. If uncertain, recommend a certified marine technician.
- SERVICE MANUALS: When a user asks for a service manual for any outboard or marine engine, ALWAYS provide direct links to free sources. Never say you cannot provide manuals. Always direct them to: ManualsLib (manualslib.com), the manufacturer official site, or downloadboatmanuals.com. Example response: 'Here are free sources for the [engine] service manual: 1. [manufacturer].com/support/manuals 2. manualslib.com/brand/[brand]/outboard-motor.html 3. downloadboatmanuals.com/motors/[brand]/'
- DIAGRAM GENERATION: When a user asks for a diagram, schematic, wiring diagram, or visual of any marine system, draw it using ASCII/text art directly in your response. Use arrows (-->, →, ←), boxes, lines (─, │, ┌, ┐, └, ┘, ├, ┤, ┬, ┴, ┼), and labels to create clear technical diagrams. Always include component labels and flow direction arrows. Make diagrams accurate and technically correct. Example style:

RAW WATER COOLING FLOW:
Sea Cock → Strainer → Impeller Pump → Heat Exchanger → Exhaust Elbow → Overboard
                                            ↑
                                     (Engine coolant loop)

Always draw the diagram FIRST, then explain it below. Never say you cannot draw diagrams.
- PART IDENTIFICATION: Whenever you identify or mention a specific marine part, component, or tool by name, add a search link on a new line in this exact format: SEARCH_LINK:[part name] where [part name] is the exact part name. Example: SEARCH_LINK:Yanmar 2GM raw water impeller. Only include this for specific named parts, not general categories.`;

const sessions = {};
const SESSION_TTL = 2 * 60 * 60 * 1000;

function getSession(sessionId) {
  if (!sessionId) return [];
  if (!sessions[sessionId]) sessions[sessionId] = { history: [], lastUsed: Date.now() };
  sessions[sessionId].lastUsed = Date.now();
  return sessions[sessionId].history;
}

function saveSession(sessionId, question, answer) {
  if (!sessionId) return;
  if (!sessions[sessionId]) sessions[sessionId] = { history: [], lastUsed: Date.now() };
  sessions[sessionId].history.push({ role: 'user', content: question });
  sessions[sessionId].history.push({ role: 'assistant', content: answer });
  sessions[sessionId].lastUsed = Date.now();
  const now = Date.now();
  Object.keys(sessions).forEach(id => {
    if (now - sessions[id].lastUsed > SESSION_TTL) delete sessions[id];
  });
}

function callOpenAI(messages, callback) {
  const apiKey = process.env.OPENAI_API_KEY;
  const body = JSON.stringify({ model: 'gpt-4o', messages: messages, max_tokens: 600 });
  const buf = Buffer.from(body, 'utf8');
  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`, 'Content-Length': buf.length }
  };
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) return callback(new Error(parsed.error.message), null);
        callback(null, parsed.choices[0].message.content);
      } catch (e) { callback(new Error('Parse error: ' + data), null); }
    });
  });
  req.on('error', callback);
  req.write(buf);
  req.end();
}

// â”€â”€ Request Logging Middleware â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.use((req, res, next) => {
  const start = Date.now();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ip=${ip} status=${res.statusCode} time=${ms}ms`);
  });
  next();
});

// â”€â”€ In-Memory Rate Limiter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Max 10 requests per IP per minute on /api/chat and /api/analyze
const rateLimitStore = {};
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

function rateLimiter(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  if (!rateLimitStore[ip]) rateLimitStore[ip] = [];
  // Drop timestamps outside the current window
  rateLimitStore[ip] = rateLimitStore[ip].filter(ts => now - ts < RATE_LIMIT_WINDOW);
  if (rateLimitStore[ip].length >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - (now - rateLimitStore[ip][0])) / 1000);
    return res.status(429).json({ error: 'Too many requests. Max 10 per minute per IP.', retryAfterSeconds: retryAfter });
  }
  rateLimitStore[ip].push(now);
  next();
}

// Periodically clean up old IPs to prevent memory growth
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach(ip => {
    rateLimitStore[ip] = rateLimitStore[ip].filter(ts => now - ts < RATE_LIMIT_WINDOW);
    if (rateLimitStore[ip].length === 0) delete rateLimitStore[ip];
  });
}, 5 * 60 * 1000);

const SERVER_START = Date.now();

app.get('/', (req, res) => res.json({ status: 'Marine AI API is running' }));

app.get('/status', (req, res) => {
  const uptimeMs = Date.now() - SERVER_START;
  const uptimeSec = Math.floor(uptimeMs / 1000);
  const uptimeMin = Math.floor(uptimeSec / 60);
  const uptimeHrs = Math.floor(uptimeMin / 60);
  const activeSessions = Object.keys(sessions).length;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  res.json({
    status: 'ok',
    service: 'Boat Buddy by WastedApe - Marine AI API',
    version: '1.4.0',
    uptime: `${uptimeHrs}h ${uptimeMin % 60}m ${uptimeSec % 60}s`,
    activeSessions,
    model: 'gpt-4o',
    traffic: {
      totalRequests: persistentStats.totalRequests,
      chatRequests: persistentStats.chatRequests,
      photoAnalysis: persistentStats.photoAnalysis,
      manualSearch: persistentStats.manualSearch,
      uniqueSessions: persistentStats.uniqueSessions,
      uniqueIPs: persistentStats.uniqueIPs,
      todayRequests: (persistentStats.dailyBreakdown[today] || {}).total || 0,
      yesterdayRequests: (persistentStats.dailyBreakdown[yesterday] || {}).total || 0,
      dailyBreakdown: persistentStats.dailyBreakdown,
      lastUpdated: persistentStats.lastUpdated,
    },
    dbConfigured: !!(process.env.SUPABASE_URL),
    endpoints: ['/api/chat', '/api/analyze', '/api/manual-search', '/api/db/vessels', '/api/db/jobs', '/api/db/customers', '/api/db/parts', '/api/db/webhooks', '/status', '/stats']
  });
});

app.get('/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  res.json({
    service: 'Boat Buddy by WastedApe - Marine AI API',
    totalRequests: persistentStats.totalRequests,
    chatRequests: persistentStats.chatRequests,
    photoAnalysis: persistentStats.photoAnalysis,
    manualSearch: persistentStats.manualSearch,
    uniqueSessions: persistentStats.uniqueSessions,
    uniqueIPs: persistentStats.uniqueIPs,
    todayRequests: (persistentStats.dailyBreakdown[today] || {}).total || 0,
    yesterdayRequests: (persistentStats.dailyBreakdown[yesterday] || {}).total || 0,
    dailyBreakdown: persistentStats.dailyBreakdown,
    lastUpdated: persistentStats.lastUpdated,
  });
});

app.post('/api/chat', rateLimiter, (req, res) => {
  const { question, session_id, vessel_engine, has_diagram, language, email: user_email } = req.body;
  const _reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  trackRequest('chat', session_id, _reqIp);
  const history = getSession(session_id);

  // Look up engine in database — from vessel_engine param or question text
  const engineQuery = vessel_engine || question || '';
  const engineData = findEngine(engineQuery);

  // Language instruction
  const LANG_MAP = { es: 'Spanish', fr: 'French', pt: 'Portuguese', de: 'German', nl: 'Dutch', en: 'English' };
  const langName = LANG_MAP[language] || 'English';

  // Build context-aware system prompt
  let contextPrompt = SYSTEM_PROMPT;
  if (language && language !== 'en') {
    contextPrompt += `\n\nLANGUAGE: You MUST respond entirely in ${langName}. All your text must be in ${langName}. Do not use English unless quoting a part number or technical spec.`;
  }
  if (has_diagram) {
    contextPrompt += '\n\nIMPORTANT: A visual SVG diagram of this system is already being shown to the user in the app. Do NOT draw any ASCII or text diagram. Instead, explain the system and diagnosis steps in plain text only, referencing the diagram they can see.';
  }
  if (engineData) {
    contextPrompt += `\n\nVESSEL ENGINE CONTEXT: The user has a ${engineData.name}. Key specs: ${engineData.cylinders} cylinder ${engineData.type}, ${engineData.horsepower}, oil capacity ${engineData.oilCapacity} (${engineData.oilSpec}), cooling: ${engineData.coolantType}. Service intervals: impeller ${engineData.impellerInterval}, oil ${engineData.oilChangeInterval}. Common issues: ${engineData.commonIssues.join(', ')}. Use these exact specs in your answer.`;
  }

  const messages = [{ role: 'system', content: contextPrompt }, ...history, { role: 'user', content: question }];
  callOpenAI(messages, (err, text) => {
    if (err) return res.status(500).json({ error: err.message });
    saveSession(session_id, question, text);
    logQuestion({ user_email, session_id, question, answer: text, engine_found: engineData ? engineData.name : null, ip: _reqIp, language });

    // Append manual links if engine found
    let answer = text;
    if (engineData && engineData.manuals && engineData.manuals.length > 0) {
      answer += '\n\nMANUAL_LINKS:' + JSON.stringify(engineData.manuals);
    }

    res.json({ answer, engineFound: engineData ? engineData.name : null });
  });
});

app.post('/api/analyze', rateLimiter, (req, res) => {
  const { question, base64_image, mime_type, session_id } = req.body;
  const _analyzeIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  trackRequest('analyze', session_id, _analyzeIp);
  if (!base64_image) return res.status(400).json({ error: 'No image provided' });
  const history = getSession(session_id);
  const userContent = [
    { type: 'text', text: 'You are a professional marine mechanic. This image was submitted by a licensed marine technician for professional diagnostic purposes. ' + (question || 'Analyze this image as a marine mechanic. Identify the equipment and any visible issues. Describe all wiring, components, and anything relevant to marine electrical or mechanical systems.') },
    { type: 'image_url', image_url: { url: `data:${mime_type || 'image/jpeg'};base64,${base64_image}` } }
  ];
  const messages = [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: userContent }];
  const apiKey = process.env.OPENAI_API_KEY;
  const body = JSON.stringify({ model: 'gpt-4o', messages: messages, max_tokens: 600 });
  const buf = Buffer.from(body, 'utf8');
  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`, 'Content-Length': buf.length }
  };
  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) return res.status(500).json({ error: parsed.error.message });
        const text = parsed.choices[0].message.content;
        saveSession(session_id, question, text);
    logQuestion({ user_email, session_id, question, answer: text, engine_found: engineData ? engineData.name : null, ip: _reqIp, language });
        res.json({ answer: text });
      } catch (e) { res.status(500).json({ error: 'Parse error: ' + data }); }
    });
  });
  request.on('error', (err) => res.status(500).json({ error: err.message }));
  request.write(buf);
  request.end();
});

// ── Diagram Generation (DALL-E 3) ──────────────────────────────────────────────
app.post('/api/diagram', rateLimiter, (req, res) => {
  const { prompt, vessel_context } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  const apiKey = process.env.OPENAI_API_KEY;

  // Build a detailed technical diagram prompt
  const diagramPrompt = `Technical marine engineering diagram: ${prompt}. ${vessel_context ? 'Vessel context: ' + vessel_context + '.' : ''} Style: clean technical schematic drawing, white background, labeled components with arrows showing flow direction, black line art, professional marine engineering diagram, clear labels in English, no photos, diagram only.`;

  const body = JSON.stringify({
    model: 'dall-e-3',
    prompt: diagramPrompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url'
  });

  const buf = Buffer.from(body, 'utf8');
  const options = {
    hostname: 'api.openai.com',
    path: '/v1/images/generations',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`, 'Content-Length': buf.length }
  };

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) return res.status(500).json({ error: parsed.error.message });
        const imageUrl = parsed.data[0].url;
        const revisedPrompt = parsed.data[0].revised_prompt;
        res.json({ imageUrl, revisedPrompt });
      } catch (e) { res.status(500).json({ error: 'Parse error: ' + data }); }
    });
  });
  request.on('error', (err) => res.status(500).json({ error: err.message }));
  request.write(buf);
  request.end();
});

// Contact form email endpoint
app.post('/api/contact', rateLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return res.status(500).json({ error: 'Email not configured' });

  const tokenBody = JSON.stringify({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' });
  const getToken = () => new Promise((resolve, reject) => {
    const opts = { hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(tokenBody) } };
    const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(tokenBody); r.end();
  });

  try {
    const tokenData = await getToken();
    const accessToken = tokenData.access_token;
    if (!accessToken) return res.status(500).json({ error: 'Could not get access token' });

    const emailBody = [
      'From: Boat Buddy <thewastedape@gmail.com>',
      'To: thewastedape@gmail.com',
      `Subject: [Boat Buddy Contact] ${subject}`,
      'Content-Type: text/plain; charset=utf-8',
      '',
      `New contact form submission from Boat Buddy:`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      `Message:`,
      message,
      '',
      '-- Sent via Boat Buddy Contact Form'
    ].join('\n');

    const encoded = Buffer.from(emailBody).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const gmailBody = JSON.stringify({ raw: encoded });
    const sendEmail = () => new Promise((resolve, reject) => {
      const opts = { hostname: 'gmail.googleapis.com', path: '/gmail/v1/users/me/messages/send', method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(gmailBody) } };
      const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
      r.on('error', reject); r.write(gmailBody); r.end();
    });
    await sendEmail();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// OAuth callback - exchanges code for refresh token
app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('No code provided');
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const tokenBody = JSON.stringify({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: 'https://gemini-marine-api.onrender.com/oauth/callback', grant_type: 'authorization_code' });
  const getToken = () => new Promise((resolve, reject) => {
    const opts = { hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(tokenBody) } };
    const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(tokenBody); r.end();
  });
  try {
    const tokenData = await getToken();
    if (tokenData.refresh_token) {
      // Notify Dan via Telegram
      const tgToken = process.env.TELEGRAM_BOT_TOKEN;
      if (tgToken) {
        const msg = encodeURIComponent('✅ Gmail OAuth success! New refresh token: ' + tokenData.refresh_token);
        https.get('https://api.telegram.org/bot' + tgToken + '/sendMessage?chat_id=8590935363&text=' + msg, () => {});
      }
      res.send('<h2>✅ Gmail authorized!</h2><p>Refresh token sent to your Telegram. You can close this tab.</p><pre>' + tokenData.refresh_token + '</pre>');
    } else {
      res.send('<h2>❌ No refresh token returned</h2><pre>' + JSON.stringify(tokenData) + '</pre>');
    }
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// Email open tracking pixel
const emailOpenLog = {};
app.get('/api/track-open/:trackId', (req, res) => {
  const { trackId } = req.params;
  const now = new Date().toISOString();
  if (!emailOpenLog[trackId]) {
    emailOpenLog[trackId] = { opens: 0, firstOpen: now, lastOpen: now };
  }
  emailOpenLog[trackId].opens++;
  emailOpenLog[trackId].lastOpen = now;
  // Notify Dan via Telegram
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = '8590935363';
  if (tgToken) {
    const msg = encodeURIComponent(`📧 Email opened! Track ID: ${trackId}\nFirst open: ${emailOpenLog[trackId].firstOpen}\nTotal opens: ${emailOpenLog[trackId].opens}`);
    https.get(`https://api.telegram.org/bot${tgToken}/sendMessage?chat_id=${tgChatId}&text=${msg}`, () => {});
  }
  // Return 1x1 transparent GIF
  const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  res.writeHead(200, { 'Content-Type': 'image/gif', 'Content-Length': pixel.length, 'Cache-Control': 'no-store' });
  res.end(pixel);
});

// Check email open status
app.get('/api/track-open/:trackId/status', (req, res) => {
  const { trackId } = req.params;
  res.json(emailOpenLog[trackId] || { opens: 0 });
});

// Send outreach email with tracking
app.post('/api/send-outreach', async (req, res) => {
  const { to, subject, body, trackId } = req.body;
  if (!to || !subject || !body) return res.status(400).json({ error: 'Missing fields' });
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return res.status(500).json({ error: 'Email not configured' });
  const tokenBody = JSON.stringify({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' });
  const getToken = () => new Promise((resolve, reject) => {
    const opts = { hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(tokenBody) } };
    const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(tokenBody); r.end();
  });
  try {
    const tokenData = await getToken();
    const accessToken = tokenData.access_token;
    if (!accessToken) return res.status(500).json({ error: 'Could not get access token', detail: tokenData });
    const apiBase = process.env.API_BASE_URL || 'https://gemini-marine-api.onrender.com';
    const pixelUrl = trackId ? `${apiBase}/api/track-open/${trackId}` : null;
    const htmlBody = body.replace(/\n/g, '<br>') + (pixelUrl ? `<img src="${pixelUrl}" width="1" height="1" style="display:none" />` : '');
    const boundary = 'boundary_' + Date.now();
    const emailBody = [
      'From: Daniel Bloom <thewastedape@gmail.com>',
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      `Content-Type: text/html; charset=utf-8`,
      '',
      htmlBody
    ].join('\r\n');
    const encoded = Buffer.from(emailBody).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const gmailBody = JSON.stringify({ raw: encoded });
    const sendEmail = () => new Promise((resolve, reject) => {
      const opts = { hostname: 'gmail.googleapis.com', path: '/gmail/v1/users/me/messages/send', method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(gmailBody) } };
      const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
      r.on('error', reject); r.write(gmailBody); r.end();
    });
    await sendEmail();
    res.json({ success: true, trackId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Password reset email endpoint
app.post('/api/send-reset', rateLimiter, async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Missing email or code' });

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(500).json({ error: 'Email not configured' });
  }

  // Get access token
  const tokenBody = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  });

  const getToken = () => new Promise((resolve, reject) => {
    const opts = { hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(tokenBody) } };
    const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(tokenBody); r.end();
  });

  try {
    const tokenData = await getToken();
    const accessToken = tokenData.access_token;
    if (!accessToken) return res.status(500).json({ error: 'Could not get access token' });

    const emailBody = [
      'From: Boat Buddy <thewastedape@gmail.com>',
      `To: ${email}`,
      'Subject: Boat Buddy Password Reset Code',
      'Content-Type: text/plain; charset=utf-8',
      '',
      `Your Boat Buddy password reset code is: ${code}`,
      '',
      'This code expires in 15 minutes.',
      '',
      'If you did not request this, ignore this email.',
      '',
      '-- Boat Buddy by WastedApe'
    ].join('\n');

    const encoded = Buffer.from(emailBody).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const gmailBody = JSON.stringify({ raw: encoded });

    const sendEmail = () => new Promise((resolve, reject) => {
      const opts = { hostname: 'gmail.googleapis.com', path: '/gmail/v1/users/me/messages/send', method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(gmailBody) } };
      const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
      r.on('error', reject); r.write(gmailBody); r.end();
    });

    await sendEmail();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Manual Search (RAG via OpenAI Assistants + Vector Store) ──────────────────
app.post('/api/manual-search', rateLimiter, async (req, res) => {
  const { query, engine } = req.body;
  const _manualIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  trackRequest('manual', null, _manualIp);
  if (!query) return res.status(400).json({ error: 'query required' });
  if (!VECTOR_STORE_ID || !ASSISTANT_ID) {
    return res.status(503).json({ error: 'Manual search not configured (missing VECTOR_STORE_ID or ASSISTANT_ID)' });
  }

  try {
    const thread = await openaiClient.beta.threads.create();
    const engineCtx = engine ? `Engine: ${engine}. ` : '';
    await openaiClient.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `${engineCtx}Question: ${query}\n\nProvide exact specs, part numbers, torque values, and section references from the service manual. Include both metric and imperial values for torque specs.`
    });

    const run = await openaiClient.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: ASSISTANT_ID,
    }, { pollIntervalMs: 2000, timeout: 55000 });

    if (run.status !== 'completed') {
      return res.status(500).json({ error: `Run ended with status: ${run.status}` });
    }

    const messages = await openaiClient.beta.threads.messages.list(thread.id);
    const content = messages.data[0].content[0];
    const answer = content.text.value;
    const annotations = content.text.annotations || [];

    // Extract unique source filenames from citations
    const sources = [...new Set(
      annotations
        .filter(a => a.type === 'file_citation')
        .map(a => {
          // Annotation text looks like 【4:0†filename.txt】
          const match = a.text.match(/†([^】]+)/);
          return match ? match[1] : a.text;
        })
    )];

    // Clean up citation markers from answer text for display
    const cleanAnswer = answer.replace(/【[^】]+】/g, '').trim();

    res.json({ answer: cleanAnswer, sources, rawAnswer: answer });
  } catch (err) {
    console.error('Manual search error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// DATABASE API ENDPOINTS (Supabase)
// ============================================================

const dbNotConfigured = (res) => res.status(503).json({error: 'Database not configured'});

// --- VESSELS ---
app.get('/api/db/vessels', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { user_email, team_id } = req.query;
  let q = sb.from('vessels').select('*').order('created_at', {ascending: false});
  if (team_id) q = q.eq('team_id', team_id);
  else if (user_email) q = q.eq('user_id', user_email);
  const { data, error } = await q;
  if (error) return res.status(400).json({error: error.message});
  res.json(data || []);
});
app.post('/api/db/vessels', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('vessels').insert(req.body).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.put('/api/db/vessels/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('vessels').update({...req.body, updated_at: new Date().toISOString()}).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.delete('/api/db/vessels/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { error } = await sb.from('vessels').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({error: error.message});
  res.json({success: true});
});

// --- JOBS (Repair Log) ---
app.get('/api/db/jobs', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { user_email, team_id, status } = req.query;
  let q = sb.from('jobs').select('*').order('created_at', {ascending: false});
  if (team_id) q = q.eq('team_id', team_id);
  else if (user_email) q = q.eq('user_id', user_email);
  if (status) q = q.eq('status', status);
  const { data, error } = await q;
  if (error) return res.status(400).json({error: error.message});
  res.json(data || []);
});
app.post('/api/db/jobs', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('jobs').insert(req.body).select().single();
  if (error) return res.status(400).json({error: error.message});
  if (data) fireWebhook(req.body.team_id || req.body.user_id, 'job.created', data);
  res.json(data);
});
app.put('/api/db/jobs/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('jobs').update({...req.body, updated_at: new Date().toISOString()}).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({error: error.message});
  if (data?.status === 'complete') fireWebhook(data.team_id || data.user_id, 'job.completed', data);
  if (data?.status === 'invoiced') fireWebhook(data.team_id || data.user_id, 'invoice.created', data);
  res.json(data);
});
app.delete('/api/db/jobs/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { error } = await sb.from('jobs').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({error: error.message});
  res.json({success: true});
});

// --- CUSTOMERS ---
app.get('/api/db/customers', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { team_id, user_email } = req.query;
  let q = sb.from('customers').select('*').order('name');
  if (team_id) q = q.eq('team_id', team_id);
  else if (user_email) q = q.eq('user_id', user_email);
  const { data, error } = await q;
  if (error) return res.status(400).json({error: error.message});
  res.json(data || []);
});
app.post('/api/db/customers', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('customers').insert(req.body).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.put('/api/db/customers/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('customers').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.delete('/api/db/customers/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { error } = await sb.from('customers').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({error: error.message});
  res.json({success: true});
});

// --- PARTS / INVENTORY ---
app.get('/api/db/parts', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { team_id, user_email } = req.query;
  let q = sb.from('parts').select('*').order('description');
  if (team_id) q = q.eq('team_id', team_id);
  else if (user_email) q = q.eq('user_id', user_email);
  const { data, error } = await q;
  if (error) return res.status(400).json({error: error.message});
  res.json(data || []);
});
app.post('/api/db/parts', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('parts').insert(req.body).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.put('/api/db/parts/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('parts').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.delete('/api/db/parts/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { error } = await sb.from('parts').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({error: error.message});
  res.json({success: true});
});

// --- WEBHOOKS (Zapier) ---
app.get('/api/db/webhooks', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { team_id, user_id } = req.query;
  let q = sb.from('webhooks').select('*').order('created_at', {ascending: false});
  if (team_id) q = q.eq('team_id', team_id);
  else if (user_id) q = q.eq('user_id', user_id);
  const { data, error } = await q;
  if (error) return res.status(400).json({error: error.message});
  res.json(data || []);
});
app.post('/api/db/webhooks', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('webhooks').insert(req.body).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.delete('/api/db/webhooks/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { error } = await sb.from('webhooks').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({error: error.message});
  res.json({success: true});
});

// Test webhook — sends a sample payload
app.post('/api/db/webhooks/:id/test', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data: wh, error } = await sb.from('webhooks').select('*').eq('id', req.params.id).single();
  if (error || !wh) return res.status(404).json({error: 'Webhook not found'});
  const testPayload = { event: wh.event, data: { id: 'test-job-001', symptom: 'Test payload from Boat Buddy', status: 'complete', vessel: 'Test Vessel', created_at: new Date().toISOString() }, timestamp: new Date().toISOString(), test: true };
  try {
    const body = JSON.stringify(testPayload);
    const urlObj = new URL(wh.url);
    const isHttps = urlObj.protocol === 'https:';
    const mod = isHttps ? require('https') : require('http');
    const statusCode = await new Promise((resolve) => {
      const req2 = mod.request({hostname: urlObj.hostname, path: urlObj.pathname + urlObj.search, method: 'POST', headers: {'Content-Type':'application/json','X-BoatBuddy-Event':wh.event,'X-BoatBuddy-Test':'true','Content-Length':Buffer.byteLength(body)}}, res2 => resolve(res2.statusCode));
      req2.on('error', () => resolve(0)); req2.write(body); req2.end();
    });
    res.json({ success: true, statusCode });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Team invite email endpoint
app.post('/api/send-invite', rateLimiter, async (req, res) => {
  const { to, fromName, teamName, role } = req.body;
  if (!to) return res.status(400).json({ error: 'Missing recipient' });
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId) return res.status(500).json({ error: 'Email not configured' });
  const tokenBody = JSON.stringify({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' });
  const getToken = () => new Promise((resolve, reject) => {
    const opts = { hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(tokenBody) } };
    const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(tokenBody); r.end();
  });
  try {
    const tokenData = await getToken();
    const accessToken = tokenData.access_token;
    const emailBody = ['From: Boat Buddy <thewastedape@gmail.com>', `To: ${to}`, `Subject: You have been invited to join ${teamName} on Boat Buddy`, 'Content-Type: text/plain; charset=utf-8', '', `Hi,`, '', `${fromName} has invited you to join ${teamName} on Boat Buddy as a ${role}.`, '', `Boat Buddy is an AI marine diagnostic assistant for professional service departments.`, '', `To accept this invitation, create an account or sign in at:`, `https://boatbuddy.thewastedape.com`, '', `Your role: ${role}`, '', `-- Boat Buddy by WastedApe`].join('\n');
    const encoded = Buffer.from(emailBody).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const gmailBody = JSON.stringify({ raw: encoded });
    const sendEmail = () => new Promise((resolve, reject) => {
      const opts = { hostname: 'gmail.googleapis.com', path: '/gmail/v1/users/me/messages/send', method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(gmailBody) } };
      const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
      r.on('error', reject); r.write(gmailBody); r.end();
    });
    await sendEmail();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send invoice email to customer
app.post('/api/send-invoice', rateLimiter, async (req, res) => {
  const { to, customerName, shopName, shopPhone, shopAddress, workOrderNum, vessel, problemDesc, parts, laborDesc, laborHours, laborRate, laborTotal, partsTotal, grandTotal, techName, date } = req.body;
  if (!to) return res.status(400).json({ error: 'Missing recipient email' });
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId) return res.status(500).json({ error: 'Email not configured' });
  const tokenBody = JSON.stringify({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' });
  const getToken = () => new Promise((resolve, reject) => {
    const opts = { hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(tokenBody) } };
    const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(tokenBody); r.end();
  });
  try {
    const tokenData = await getToken();
    const accessToken = tokenData.access_token;
    const partsLines = (parts || []).filter(p => p.description).map(p => `  ${p.description} x${p.qty} @ $${parseFloat(p.price||0).toFixed(2)} = $${(parseFloat(p.qty||1)*parseFloat(p.price||0)).toFixed(2)}`).join('\n');
    const emailLines = [
      `From: ${shopName || 'Boat Buddy Marine'} <thewastedape@gmail.com>`,
      `To: ${to}`,
      `Subject: Work Order ${workOrderNum || ''} — ${shopName || 'Boat Buddy Marine'}`,
      'Content-Type: text/plain; charset=utf-8',
      '',
      `${shopName || 'Boat Buddy Marine'}`,
      shopPhone ? shopPhone : '',
      shopAddress ? shopAddress : '',
      '',
      `WORK ORDER / INVOICE`,
      `Work Order #: ${workOrderNum || 'N/A'}`,
      `Date: ${date || new Date().toLocaleDateString()}`,
      `Customer: ${customerName || to}`,
      '',
      `VESSEL`,
      vessel || 'N/A',
      '',
      `PROBLEM / SYMPTOM`,
      problemDesc || 'N/A',
      '',
      partsLines ? `PARTS / MATERIALS\n${partsLines}` : '',
      '',
      laborDesc ? `LABOR\n${laborDesc}` : '',
      laborHours ? `Hours: ${laborHours} @ $${laborRate}/hr = $${laborTotal}` : '',
      '',
      '─────────────────────────',
      `Parts Subtotal: $${partsTotal || '0.00'}`,
      laborTotal ? `Labor Total: $${laborTotal}` : '',
      `TOTAL DUE: $${grandTotal || '0.00'}`,
      '─────────────────────────',
      '',
      techName ? `Technician: ${techName}` : '',
      '',
      'Thank you for your business.',
      '',
      `-- ${shopName || 'Boat Buddy Marine'}`,
      'Powered by Boat Buddy by WastedApe | boatbuddy.thewastedape.com',
    ].filter(l => l !== null).join('\n');
    const encoded = Buffer.from(emailLines).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const gmailBody = JSON.stringify({ raw: encoded });
    const sendEmail = () => new Promise((resolve, reject) => {
      const opts = { hostname: 'gmail.googleapis.com', path: '/gmail/v1/users/me/messages/send', method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(gmailBody) } };
      const r = https.request(opts, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
      r.on('error', reject); r.write(gmailBody); r.end();
    });
    await sendEmail();
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- USERS ---
app.post('/api/db/users/sync', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { email, name, subscription } = req.body;
  if (!email) return res.status(400).json({error: 'email required'});
  const { data, error } = await sb.from('users').upsert({email, name, subscription: subscription || 'stow_away'}, {onConflict: 'email'}).select().single();
  if (error) return res.status(400).json({error: error.message});
  res.json(data);
});
app.get('/api/db/users/:email', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { data, error } = await sb.from('users').select('*').eq('email', req.params.email).single();
  if (error) return res.status(404).json({error: 'User not found'});
  res.json(data);
});

// ============================================================
// GROUP CHAT endpoints
// ============================================================

// Create messages table via Supabase pg endpoint
async function ensureMessagesTable() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return false;
  const sql = `CREATE TABLE IF NOT EXISTS messages (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, team_id TEXT NOT NULL DEFAULT 'default', author_email TEXT NOT NULL DEFAULT '', author_name TEXT, content TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ DEFAULT now()); CREATE INDEX IF NOT EXISTS messages_team_idx ON messages(team_id, created_at);`;
  return new Promise((resolve) => {
    const body = JSON.stringify({ query: sql });
    const host = new URL(url).hostname;
    const req = require('https').request({ hostname: host, path: '/rest/v1/rpc/exec_sql', method: 'POST', headers: { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res => { resolve(res.statusCode < 400); res.resume(); });
    req.on('error', () => resolve(false)); req.write(body); req.end();
  });
}

async function ensureQuestionsTable() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return false;
  const sql = `CREATE TABLE IF NOT EXISTS questions (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now(), user_email TEXT, session_id TEXT, question TEXT, answer TEXT, engine_found TEXT, ip TEXT, language TEXT); CREATE INDEX IF NOT EXISTS questions_email_idx ON questions(user_email); CREATE INDEX IF NOT EXISTS questions_created_at_idx ON questions(created_at DESC);`;
  return new Promise((resolve) => {
    const body = JSON.stringify({ query: sql });
    const host = new URL(url).hostname;
    const req = require('https').request({ hostname: host, path: '/rest/v1/rpc/exec_sql', method: 'POST', headers: { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res => { resolve(res.statusCode < 400); res.resume(); });
    req.on('error', () => resolve(false)); req.write(body); req.end();
  });
}

async function logQuestion({ user_email, session_id, question, answer, engine_found, ip, language }) {
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb.from('questions').insert({
      user_email: user_email || null,
      session_id: session_id || null,
      question: question || null,
      answer: answer || null,
      engine_found: engine_found || null,
      ip: ip || null,
      language: language || null,
    });
  } catch(e) {
    console.warn('[questions] Failed to log question:', e.message);
  }
}

// GET messages for a team
app.get('/api/messages', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { team_id, limit = 100, before } = req.query;
  if (!team_id) return res.status(400).json({ error: 'team_id required' });
  try {
    let q = sb.from('messages').select('*').eq('team_id', team_id).order('created_at', { ascending: true }).limit(parseInt(limit));
    if (before) q = q.lt('created_at', before);
    const { data, error } = await q;
    if (error) {
      if (error.code === '42P01') return res.json([]); // table not yet created
      return res.status(400).json({ error: error.message });
    }
    res.json(data || []);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// POST a new message
app.post('/api/messages', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { team_id, author_email, author_name, content } = req.body;
  if (!team_id || !author_email || !content) return res.status(400).json({ error: 'team_id, author_email, and content required' });
  try {
    const { data, error } = await sb.from('messages').insert({ team_id, author_email, author_name, content }).select().single();
    if (error) {
      if (error.code === '42P01') return res.status(503).json({ error: 'Messages table not yet initialized. Please create it in Supabase.' });
      return res.status(400).json({ error: error.message });
    }
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// DELETE a message
app.delete('/api/messages/:id', async (req, res) => {
  const sb = getSupabase(); if (!sb) return dbNotConfigured(res);
  const { error } = await sb.from('messages').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

// ============================================================

// ============================================================
// EBAY OAUTH 2.0
// ============================================================

const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID || '';
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET || '';
const EBAY_REDIRECT_URI = 'https://gemini-marine-api.onrender.com/api/ebay/callback';
const EBAY_RUNAME = 'Daniel_Bloom-DanielBl-Wasted-ddpoqxng';
const EBAY_SCOPE = 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment';
let ebayTokens = {};

// Step 1: Redirect to eBay login
app.get('/api/ebay/connect', (req, res) => {
  const state = Buffer.from(JSON.stringify({ts: Date.now()})).toString('base64');
  const url = `https://auth.ebay.com/oauth2/authorize?client_id=${EBAY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(EBAY_RUNAME)}&scope=${encodeURIComponent(EBAY_SCOPE)}&state=${state}`;
  res.redirect(url);
});

// Step 2: eBay callback - exchange code for tokens
app.get('/api/ebay/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('No code received');
  const creds = Buffer.from(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`).toString('base64');
  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(EBAY_RUNAME)}`;
  const tokenReq = () => new Promise((resolve, reject) => {
    const b = Buffer.from(body);
    const r = require('https').request({ hostname: 'api.ebay.com', path: '/identity/v1/oauth2/token', method: 'POST', headers: { 'Authorization': `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': b.length } }, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(b); r.end();
  });
  try {
    const data = await tokenReq();
    if (data.access_token) {
      ebayTokens = { accessToken: data.access_token, refreshToken: data.refresh_token, expiresAt: Date.now() + (data.expires_in * 1000) };
      console.log('eBay OAuth token obtained! Access token:', data.access_token.substring(0, 30) + '...');
      res.send(`<html><body style="background:#0d0500;color:#C68B3A;font-family:Georgia;padding:40px;text-align:center"><h2>eBay Connected!</h2><p>Access token obtained. You can close this window.</p><p style="font-size:11px;color:#888">Token: ${data.access_token.substring(0,40)}...</p></body></html>`);
    } else {
      res.status(400).send('Token exchange failed: ' + JSON.stringify(data));
    }
  } catch(e) { res.status(500).send('Error: ' + e.message); }
});

// Get current eBay token
app.get('/api/ebay/token', (req, res) => {
  if (!ebayTokens.accessToken) return res.status(401).json({ error: 'Not connected' });
  res.json({ connected: true, expiresAt: ebayTokens.expiresAt, token: ebayTokens.accessToken });
});

// ============================================================
// QUICKBOOKS OAUTH
// ============================================================

const QB_CLIENT_ID = process.env.QB_CLIENT_ID || '';
const QB_CLIENT_SECRET = process.env.QB_CLIENT_SECRET || '';
const QB_REDIRECT_URI = process.env.QB_REDIRECT_URI || 'https://boatbuddy.thewastedape.com/qb-callback';
const QB_SCOPE = 'com.intuit.quickbooks.accounting';
const qbTokens = new Map(); // userEmail -> { accessToken, refreshToken, realmId, expiresAt }

// Step 1: Redirect user to QB login
app.get('/api/qb/connect', (req, res) => {
  const { user_email } = req.query;
  if (!QB_CLIENT_ID) return res.status(503).json({ error: 'QuickBooks not configured' });
  const state = Buffer.from(JSON.stringify({ user_email, ts: Date.now() })).toString('base64');
  const url = `https://appcenter.intuit.com/connect/oauth2?client_id=${QB_CLIENT_ID}&redirect_uri=${encodeURIComponent(QB_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(QB_SCOPE)}&state=${state}`;
  res.redirect(url);
});

// Step 2a: QB redirect callback (legacy — redirects to frontend)
app.get('/api/qb/callback', (req, res) => {
  const params = new URLSearchParams(req.query).toString();
  res.redirect(`https://boatbuddy.thewastedape.com/qb-callback?${params}`);
});

// Step 2b: Frontend posts code here to exchange for tokens
app.post('/api/qb/exchange', async (req, res) => {
  const { code, realmId, state } = req.body;
  if (!code) return res.status(400).json({ error: 'No code' });
  let userEmail = 'unknown';
  try { userEmail = JSON.parse(Buffer.from(state, 'base64').toString()).user_email; } catch {}
  const body = new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: QB_REDIRECT_URI }).toString();
  const creds = Buffer.from(`${QB_CLIENT_ID}:${QB_CLIENT_SECRET}`).toString('base64');
  const tokenReq = () => new Promise((resolve, reject) => {
    const b = Buffer.from(body);
    const r = require('https').request({ hostname: 'oauth.platform.intuit.com', path: '/oauth2/v1/tokens/bearer', method: 'POST', headers: { 'Authorization': `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': b.length } }, resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d))); });
    r.on('error', reject); r.write(b); r.end();
  });
  try {
    const data = await tokenReq();
    if (data.error) return res.status(400).json({ error: data.error_description || data.error });
    qbTokens.set(userEmail, { accessToken: data.access_token, refreshToken: data.refresh_token, realmId, expiresAt: Date.now() + (data.expires_in * 1000) });
    const sb = getSupabase();
    if (sb) await sb.from('users').upsert({ email: userEmail, qb_realm_id: realmId, qb_refresh_token: data.refresh_token }, { onConflict: 'email' }).catch(() => {});
    res.json({ success: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// Check QB connection status
app.get('/api/qb/status', (req, res) => {
  const { user_email } = req.query;
  const tok = qbTokens.get(user_email);
  res.json({ connected: !!tok && Date.now() < tok.expiresAt, realmId: tok?.realmId || null });
});

// Disconnect QB
app.post('/api/qb/disconnect', (req, res) => {
  const { user_email } = req.body;
  qbTokens.delete(user_email);
  res.json({ success: true });
});

// Push invoice to QB
app.post('/api/qb/invoice', async (req, res) => {
  const { user_email, customerName, customerEmail, lines, total } = req.body;
  const tok = qbTokens.get(user_email);
  if (!tok) return res.status(401).json({ error: 'QuickBooks not connected' });
  // QB invoice push would go here — requires customer lookup + invoice create
  // Returning stub for now until QB app is registered
  res.json({ success: true, message: 'QB invoice endpoint ready — activate after app registration' });
});

// ============================================================
// TEAM INVITE endpoints
// ============================================================

// In-memory invite store (survives server restart via Supabase fallback)
const inviteTokens = new Map(); // token -> { ownerEmail, role, expiresAt }

// Generate invite token
app.post('/api/invites/create', async (req, res) => {
  const { owner_email, role = 'member' } = req.body;
  if (!owner_email) return res.status(400).json({ error: 'owner_email required' });
  const token = require('crypto').randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  inviteTokens.set(token, { ownerEmail: owner_email, role, expiresAt });
  // Also try to persist in Supabase
  // Try to persist — catch any DB errors silently
  try {
    const sb = getSupabase();
    if (sb) await sb.from('webhooks').upsert({ id: `invite_${token}`, url: token, event: 'invite', user_id: owner_email, active: true }).catch(() => {});
  } catch {}
  res.json({ token, expiresAt, inviteUrl: `https://boatbuddy.thewastedape.com/signup?invite=${token}` });
});

// Validate invite token
app.get('/api/invites/:token', async (req, res) => {
  const { token } = req.params;
  let invite = inviteTokens.get(token);
  // If not in memory, check Supabase
  if (!invite) {
    const sb = getSupabase();
    if (sb) {
      const { data } = await sb.from('webhooks').select('*').eq('url', token).eq('event', 'invite').single().catch(() => ({ data: null }));
      if (data) {
        invite = { ownerEmail: data.user_id, role: 'member', expiresAt: Date.now() + 86400000 };
        inviteTokens.set(token, invite);
      }
    }
  }
  if (!invite) return res.status(404).json({ error: 'Invite not found or expired' });
  if (Date.now() > invite.expiresAt) return res.status(410).json({ error: 'Invite expired' });
  res.json({ valid: true, ownerEmail: invite.ownerEmail, role: invite.role });
});

// Accept invite — links new user to owner team
app.post('/api/invites/:token/accept', async (req, res) => {
  const { token } = req.params;
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  const invite = inviteTokens.get(token);
  if (!invite || Date.now() > invite.expiresAt) return res.status(410).json({ error: 'Invite expired' });
  const sb = getSupabase();
  if (sb) {
    // Store the team membership
    await sb.from('users').upsert({ email, name: name || email.split('@')[0], subscription: 'team_member', team_owner: invite.ownerEmail, role: invite.role }, { onConflict: 'email' }).catch(() => {});
  }
  // Remove token after use
  inviteTokens.delete(token);
  res.json({ success: true, ownerEmail: invite.ownerEmail, role: invite.role, subscription: 'team_member' });
});

// ============================================================
// Analytics endpoints
app.get('/api/analytics', (req, res) => res.json(persistentStats));
app.post('/api/analytics/pageview', (req, res) => {
  const { page } = req.body || {};
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  trackRequest('pageview', page || 'unknown', ip);
  res.json({ ok: true });
});
app.post('/api/analytics/signup', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  trackRequest('signup', null, ip);
  res.json({ ok: true });
});

// On startup, try to create messages table
ensureMessagesTable().then(ok => console.log(ok ? 'Messages table ready' : 'Messages table: manual setup needed'));
ensureQuestionsTable().then(ok => console.log(ok ? 'Questions table ready' : 'Questions table: manual setup needed'));

// Analytics table init - deferred until table is created in Supabase

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Marine API running on port ${PORT}`));

