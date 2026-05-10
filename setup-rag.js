/**
 * Marine RAG Setup Script
 * Downloads manuals, creates vector store, uploads files, creates assistant
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const MANUALS_DIR = path.join(__dirname, 'manuals');

const client = new OpenAI({ apiKey: OPENAI_KEY });

// ── Helper: HTTP(S) GET with redirects ────────────────────────────────────────
function downloadUrl(url, destPath, cookies = '') {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'text/html,application/pdf,*/*',
    };
    if (cookies) headers['Cookie'] = cookies;

    mod.get(url, { headers }, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307) {
        const location = res.headers['location'];
        if (!location) return reject(new Error('Redirect with no location'));
        const newCookies = res.headers['set-cookie']
          ? res.headers['set-cookie'].map(c => c.split(';')[0]).join('; ')
          : cookies;
        return resolve(downloadUrl(location, destPath, newCookies));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));

      const contentType = res.headers['content-type'] || '';
      // Check if we got an HTML page instead of a PDF (Google Drive confirmation)
      let chunks = [];
      let size = 0;
      res.on('data', chunk => { chunks.push(chunk); size += chunk.length; });
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        // Check if it's actually HTML (Google Drive confirmation page)
        const preview = buf.slice(0, 200).toString('utf8');
        if (preview.includes('<!DOCTYPE') || preview.includes('<html')) {
          // Try to extract confirm token from Google Drive page
          const html = buf.toString('utf8');
          const match = html.match(/confirm=([^&"]+)/);
          if (match) {
            const newCookies = res.headers['set-cookie']
              ? res.headers['set-cookie'].map(c => c.split(';')[0]).join('; ')
              : cookies;
            const gdId = url.match(/id=([^&]+)/)?.[1];
            if (gdId) {
              const confirmUrl = `https://drive.google.com/uc?export=download&confirm=${match[1]}&id=${gdId}`;
              return resolve(downloadUrl(confirmUrl, destPath, newCookies));
            }
          }
          return reject(new Error(`Got HTML page instead of PDF (${size} bytes) from ${url}`));
        }
        fs.writeFileSync(destPath, buf);
        resolve({ path: destPath, size });
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ── Create detailed knowledge text files as backup ───────────────────────────
function createKnowledgeDocs() {
  const docs = [];

  // Yamaha F115 (one of the most popular outboards)
  const yamF115 = `YAMAHA F115 OUTBOARD MOTOR SERVICE MANUAL - TECHNICAL SPECIFICATIONS
Model: Yamaha F115A/LF115A 4-Stroke EFI Outboard
Year Range: 2001-2013
Configuration: 4-cylinder inline, 4-stroke, DOHC 16-valve
Displacement: 1832 cc (111.8 cu in)
Bore x Stroke: 86.0 x 79.0 mm (3.386 x 3.110 in)
Maximum RPM: 5000-6000 rpm
Full Throttle RPM Range: 5000-6000 rpm
Rated Horsepower: 115 HP at 5500 rpm

TORQUE SPECIFICATIONS:
Cylinder head bolts (M10): 
  Step 1: 20 Nm (14.8 ft-lb)
  Step 2: 40 Nm (29.5 ft-lb)  
  Step 3: Additional 90 degrees (angle torque)
Crankcase main bearing bolts (M10): 45 Nm (33.2 ft-lb)
Connecting rod cap bolts:
  Step 1: 20 Nm (14.8 ft-lb)
  Step 2: Additional 60 degrees
Spark plugs: NGK DCPR6E - Torque: 25 Nm (18.4 ft-lb)
Flywheel bolt: 245 Nm (181 ft-lb)
Exhaust manifold bolts: 30 Nm (22.1 ft-lb)
Thermostat housing bolts: 10 Nm (7.4 ft-lb)
Oil drain plug: 30 Nm (22.1 ft-lb)
Oil filter: Hand-tight plus 3/4 turn
Propeller nut: 52-73 Nm (38-54 ft-lb) - use cotter pin

ENGINE OIL SPECIFICATIONS:
Type: 4-Stroke Marine Engine Oil
Recommended: Yamalube 4M 10W-30
Capacity (with filter): 2.8 L (2.96 qt / 0.74 gal)
Capacity (without filter): 2.5 L (2.64 qt)
Oil Filter Part Number: 69J-13440-00-00

COOLING SYSTEM:
Type: Raw water (open loop)
Thermostat opening temperature: 61-65°C (142-149°F)
Thermostat full open temperature: 75°C (167°F)
Thermostat Part Number: 6E5-12411-10-00
Water pump impeller Part Number: 6E5-44352-01-00
Impeller replacement interval: Every 2 years or 300 hours
Water pump housing Part Number: 6E5-44311-02-00

FUEL SYSTEM:
Fuel delivery: Electronic Fuel Injection (EFI)
Fuel type: Regular unleaded 87 octane minimum
Fuel pump pressure: 294 kPa (42.6 psi) at idle
Fuel filter: 63P-24560-00-00 (replace annually)
Throttle body calibration: 44mm bore
Injector type: Top-feed, 4-hole
Injector flow rate: 205 cc/min at 300 kPa

IGNITION SYSTEM:
Type: TCI (Transistor Controlled Ignition) / Microcomputer
Spark plugs: NGK DCPR6E
Plug gap: 0.8-0.9 mm (0.031-0.035 in)
Firing order: 1-2-4-3
Ignition timing at idle: 5° BTDC
Timing advance: Computer controlled

VALVE CLEARANCE (Cold):
Intake: 0.11-0.21 mm (0.0043-0.0083 in)
Exhaust: 0.21-0.31 mm (0.0083-0.0122 in)
Check/adjust interval: Every 300 hours or 3 years

COMPRESSION:
Standard: 1030 kPa (149 psi) at cranking speed
Minimum acceptable: 830 kPa (120 psi)
Maximum allowable variance between cylinders: 100 kPa (14.5 psi)

GEAR OIL:
Lower unit capacity: 650 mL (22 fl oz)
Type: Yamaha Gear Lube, SAE 90 Hypoid
Part Number (1 liter): 90790-85021
Change interval: Every 100 hours or annually

BATTERY CHARGING:
Alternator output: 25A at 12V
Charging voltage: 14.0-14.8V at 5000 rpm

COMMON ISSUES AND FIXES:
1. Water in gear oil: Check prop shaft seals (Part: 93101-22M48-00) and drain plug gasket (Part: 646-45389-00-00)
2. Overheating: Check impeller (Part: 6E5-44352-01-00), thermostat (Part: 6E5-12411-10-00), and thermostat housing O-ring (Part: 93210-18218-00)
3. Hard starting when warm: Check fuel pressure regulator (Part: 68F-13980-00-00), injectors for deposits
4. Rough idle: Throttle position sensor (Part: 6G1-85885-00-00), IAC valve cleaning
5. No spark: CKP sensor (Part: 63P-85590-00-00), check ignition coils (Part: 6C5-82310-10-00)
6. Trim doesn't work: Check trim relay (Part: 63P-81950-10-00) and trim motor ground

SERVICE INTERVALS:
Initial service: 20 hours
Regular service: Every 100 hours or annually
Impeller: Every 2 years or 300 hours
Valve adjustment: Every 300 hours or 3 years
Fuel filter: Annually
Gear lube: Every 100 hours or annually`;

  const yam150 = `YAMAHA F150 OUTBOARD MOTOR SERVICE MANUAL - TECHNICAL SPECIFICATIONS  
Model: Yamaha F150A/LF150A 4-Stroke EFI Outboard
Year Range: 2004-2015
Configuration: 4-cylinder inline, 4-stroke, DOHC 16-valve
Displacement: 2670 cc (162.9 cu in)
Bore x Stroke: 96.0 x 92.0 mm (3.78 x 3.62 in)
Maximum RPM: 5500-6100 rpm
Rated Horsepower: 150 HP at 5500 rpm

TORQUE SPECIFICATIONS:
Cylinder head bolts (M10): 
  Step 1: 20 Nm (14.8 ft-lb)
  Step 2: 40 Nm (29.5 ft-lb)
  Step 3: Additional 90 degrees
Main bearing caps: 51 Nm (37.6 ft-lb)
Connecting rod caps:
  Step 1: 22 Nm (16.2 ft-lb)
  Step 2: Additional 60 degrees
Spark plugs: NGK DCPR6E - 25 Nm (18.4 ft-lb)
Flywheel bolt: 290 Nm (214 ft-lb)
Exhaust cover bolts: 30 Nm (22.1 ft-lb)

ENGINE OIL:
Type: Yamalube 4M 10W-30 4-Stroke Marine Oil
Capacity (with filter): 3.4 L (3.6 qt)
Capacity (without filter): 3.0 L (3.2 qt)
Oil filter Part Number: 68V-13440-00-00

COOLING SYSTEM:
Thermostat: 61-65°C opening / 75°C full open
Thermostat Part Number: 67F-12411-01-00
Water pump impeller Part Number: 67F-44352-01-00
Impeller interval: Every 2 years or 300 hours

VALVE CLEARANCE (Cold):
Intake: 0.11-0.21 mm
Exhaust: 0.21-0.31 mm

COMPRESSION: 1100 kPa (160 psi) standard, minimum 900 kPa (130 psi)

GEAR OIL:
Capacity: 800 mL (27 fl oz)
Type: Yamaha Gear Lube SAE 90 Hypoid
Change interval: Every 100 hours or annually

FUEL SYSTEM:
EFI rail pressure: 294 kPa (42.6 psi)
Fuel filter Part Number: 69J-24560-00-00`;

  const suzDF115 = `SUZUKI DF115/DF140 OUTBOARD MOTOR SERVICE MANUAL - TECHNICAL SPECIFICATIONS
Model: Suzuki DF115A / DF140A 4-Stroke EFI
Year Range: 2013-present
Configuration: 4-cylinder inline, DOHC, 16-valve, 4-stroke
Displacement: 2044 cc (DF115) / 2044 cc (DF140)
Bore x Stroke: 90.0 x 80.3 mm
Compression Ratio: 10.0:1
Full Throttle RPM: 5000-6000 rpm (DF115), 5500-6100 rpm (DF140)

TORQUE SPECIFICATIONS:
Cylinder head bolts:
  M10 bolts - Step 1: 25 Nm (18 ft-lb), Step 2: 50 Nm (37 ft-lb), Step 3: 90 degrees additional
  M8 bolts: 25 Nm (18 ft-lb)
Main bearing caps (M10): 50 Nm (37 ft-lb)
Connecting rod caps:
  M8 bolts - Step 1: 20 Nm (15 ft-lb), Step 2: 60 degrees additional
Spark plugs: NGK DILKAR7A11 - 18 Nm (13.3 ft-lb)
Flywheel bolt: 220 Nm (162 ft-lb) - use thread lock
Propeller nut: 50-70 Nm (37-52 ft-lb)
Oil drain plug: 28 Nm (21 ft-lb)

ENGINE OIL:
Type: Suzuki 4-Stroke Marine Motor Oil, or SAE 10W-40 (FC-W certified)
Capacity with filter: 3.6 L (3.8 qt)
Capacity without filter: 3.3 L (3.5 qt)
Oil Filter Part Number: 16510-61A11

COOLING SYSTEM:
Thermostat opening temperature: 58-68°C (136-154°F)
Thermostat Part Number: 17670-87L00
Water pump impeller Part Number: 17461-87L10
Impeller replacement interval: Every 2 years or 200 hours

FUEL SYSTEM:
EFI rail pressure: 324 kPa (47 psi)
Fuel filter: 15410-87L00 (replace every 2 years)
Throttle bore: 45mm

IGNITION:
Spark plug: NGK DILKAR7A11
Gap: 1.0-1.1 mm (0.039-0.043 in)
Firing order: 1-3-4-2

VALVE CLEARANCE (Cold):
Intake: 0.10-0.20 mm (0.004-0.008 in)
Exhaust: 0.20-0.30 mm (0.008-0.012 in)
Adjustment interval: Every 600 hours or 3 years

COMPRESSION: Standard 1200 kPa (174 psi), minimum 1000 kPa (145 psi)

LOWER UNIT:
Gear oil capacity: 700 mL (23.7 fl oz)
Type: Suzuki Outboard Gear Oil or GL-5 SAE 90
Drain/fill interval: Every 200 hours or annually

COMMON ISSUES:
1. VST (Vapor Separator Tank) flooding: check VST needle valve seat wear, Part: 09272-10020
2. IACV fault code: Clean or replace Idle Air Control Valve, Part: 13400-87L00
3. Low oil pressure warning: Check oil pressure sensor Part: 33930-87L00 and pickup screen
4. Overheating: Thermostat Part: 17670-87L00, Impeller Part: 17461-87L10`;

  const mercuryDoc = `MERCURY/MERCRUISER MARINE ENGINE SERVICE MANUAL - TECHNICAL SPECIFICATIONS

MERCURY OPTIMAX 115/135/150/200 HP
Configuration: 2-stroke V6 direct injection
Years: 1996-2016

MERCURY 4-STROKE 115/150 VERADO:
Displacement: 2.0L (115 HP) / 2.6L (150 HP Verado)
Configuration: Inline 4, supercharged (Verado), 4-stroke

MERCRUISER 5.0L/5.7L/6.2L STERNDRIVES:

MerCruiser 5.7L (350 CID) Specifications:
Bore x Stroke: 4.00 x 3.48 inches
Compression ratio: 8.2:1
Oil capacity: 5 quarts with filter
Oil type: Mercury Quicksilver 25W-40 Marine Engine Oil

Torque Specifications (5.7L):
Cylinder head bolts - Torque sequence in 3 steps:
  Step 1: 25 ft-lb, Step 2: 45 ft-lb, Step 3: 65 ft-lb
Intake manifold bolts: 25-35 ft-lb
Exhaust manifold bolts: 20-25 ft-lb
Rocker arm nuts: 18-20 ft-lb (hydraulic lifters - set to zero lash, then 1/2 additional turn)
Main bearing caps: 95 ft-lb (4-bolt) / 65 ft-lb (2-bolt)
Connecting rod caps: 45 ft-lb
Flywheel bolts: 70-75 ft-lb
Harmonic balancer bolt: 60 ft-lb

Spark Plugs: AC Delco MR43LTS or Champion QL78YC
Plug gap: 0.040 inches (1.0 mm)
Firing order: 1-8-4-3-6-5-7-2

Valve clearance: Hydraulic lifters - zero lash (no clearance adjustment needed)

Cooling system:
Thermostat opening: 160°F (71°C) raw water cooled models
Impeller Part Number: 47-803748A1 (various models)
Impeller interval: Every 2 years or 200 hours

Stern drive gear lube:
Type: Mercury High Performance Gear Lube
Capacity (Alpha One Gen II): 24 fl oz (710 mL)
Capacity (Bravo One): 32 fl oz (946 mL)

COMMON MERCRUISER ISSUES:
1. Raw water pump impeller failure: Check impeller 47-803748A1, bellows 72937A1
2. Exhaust manifold cracking: Common on 5.7L - check for cracks at port 3-4 area
3. Alpha drive bellows failure: Replace bellows kit 30-803099A1 every 3-4 years
4. Thunderbolt IV ignition: If no spark, check module 398-8313A4, pickup 398-5454A1
5. Trim limit switch: Adjust or replace 87-8M0060018`;

  const yamarDiesel = `YANMAR MARINE DIESEL ENGINE SERVICE MANUAL - TECHNICAL SPECIFICATIONS

YANMAR 2GM20F (2-cylinder, 18 HP) SPECIFICATIONS:
Type: 2-cylinder, 4-stroke, fresh water cooled diesel
Displacement: 722 cc
Bore x Stroke: 75 x 82 mm
Compression Ratio: 22:1
Rated output: 18 HP (13.4 kW) at 3600 rpm
Maximum RPM: 3700 rpm

Torque Specifications:
Cylinder head bolts (M10): 45 Nm (33 ft-lb) - hot torque after warm-up
  Cold torque: 40 Nm (30 ft-lb), re-torque after first heat cycle
Injection nozzle holder: 64 Nm (47 ft-lb)
Fuel injection pipe union nuts: 30 Nm (22 ft-lb)
Main bearing caps: 50 Nm (37 ft-lb)
Connecting rod caps: 40 Nm (30 ft-lb)
Flywheel: 137 Nm (101 ft-lb)
Valve cover bolts: 5 Nm (3.7 ft-lb)
Intake/exhaust manifold: 20 Nm (15 ft-lb)

VALVE CLEARANCE (Cold - engine off minimum 4 hours):
Intake valve clearance: 0.15 mm (0.006 in)
Exhaust valve clearance: 0.20 mm (0.008 in)
Adjustment interval: Every 150 hours or annually

COMPRESSION (cranking speed):
Standard: 2800-3200 kPa (406-464 psi)
Service limit minimum: 2200 kPa (319 psi)
Maximum variance between cylinders: 300 kPa (44 psi)

ENGINE OIL:
Type: API CF or better, SAE 15W-40 or 20W-40
Capacity with filter: 3.5 L (3.7 qt)
Capacity without filter: 3.0 L (3.2 qt)
Change interval: Every 150 hours or annually

COOLING SYSTEM (Raw Water Cooled):
Raw water pump impeller Part: 119574-42600
Impeller replacement: Every 2 years or 300 hours
Heat exchanger zinc anode: Replace annually
Thermostat opening temperature: 68°C (154°F)
Thermostat Part Number: 119653-49801

FUEL SYSTEM:
Injection timing: 18-20° BTDC (static)
Injection pressure: 14.7 MPa (2133 psi) - check with nozzle tester
Injection nozzle Part Number: 729974-53100
Fuel filter (primary): 104500-55710 - replace every 250 hours
Fuel filter (secondary/fine): 104560-55710 - replace every 250 hours
Lift pump: 129100-52100 - check delivery >60 mL per minute

TRANSMISSION/GEARBOX (KM2P):
Oil type: SAE 30 motor oil or Yanmar gear oil
Capacity: 0.6 L
Gear ratio: F: 2.27:1, R: 2.27:1

YANMAR 3GM30F (3-cylinder, 27 HP):
Displacement: 1084 cc
Rated output: 27 HP at 3600 rpm
Oil capacity (w/filter): 5.5 L

Torque specs same family as 2GM20F but:
Cylinder head bolts: 50 Nm (37 ft-lb) hot
Main bearing: 55 Nm (41 ft-lb)

COMMON YANMAR ISSUES:
1. Seawater entering cylinders: Check raw water impeller, exhaust elbow (Part: 119574-42610), and exhaust check valve. Tilt engine before overnight storage.
2. Injector smoking: Test injectors at 14.7 MPa. Replace nozzle tip (Part: 729974-53100) if worn.
3. Overheating: Check impeller (Part: 119574-42600), heat exchanger zinc (Part: 24321-000100), fresh water coolant level.
4. Hard starting: Check compression (minimum 2200 kPa), glow plugs (Part: 119655-77500 - should draw 4.5A each), injection timing.
5. Alternator not charging: Check belt tension, brushes in alternator, and voltage regulator.

WESTERBEKE DIESEL (similar specs family):
Westerbeke 30B (30 HP) - Based on Yanmar 3HM35:
Valve clearance: Intake 0.15mm, Exhaust 0.20mm (same as Yanmar)
Oil capacity: 4.5 L
Impeller Part: 46892 or Jabsco 920-0001-P

UNIVERSAL M-25XP (25 HP - Westerbeke/Yanmar based):
Oil capacity: 4.5 L
Thermostat: 160°F (71°C)
Impeller: Jabsco 920-0001-P or Sierra 18-3017`;

  const hullSystems = `MARINE ELECTRICAL AND HULL SYSTEMS REFERENCE MANUAL

MARINE ELECTRICAL STANDARDS (ABYC E-11):
Wire sizing (12V DC systems):
3% voltage drop maximum for critical systems (navigation, bilge pump)
10% drop acceptable for non-critical (cabin lights, accessories)

Wire gauge ampacity (chassis wiring, typical):
14 AWG: 15 amps
12 AWG: 20 amps
10 AWG: 30 amps
8 AWG: 40 amps
6 AWG: 55 amps
4 AWG: 70 amps
2 AWG: 95 amps
1/0 AWG: 125 amps (starter cables)
2/0 AWG: 150 amps (battery bank main)

Fuse sizing: 125% of maximum continuous current draw

BATTERY SYSTEMS:
Starting battery: CCA (Cold Cranking Amps) rating - use engine manufacturer minimum
Deep cycle (house bank): AGM preferred for marine, charge at C/10 rate
Lithium (LFP): Do not mix with lead-acid, requires separate BMS

Shore power (30A/125V single phase):
Hot (black) → L1
Neutral (white) → N
Ground (green) → Safety ground
NEVER connect neutral to ground aboard (ABYC E-11)

BILGE SYSTEMS:
Rule 1500 GPH: Suitable for boats to 26 ft
Rule 3700 GPH: Suitable for boats 26-40 ft
Float switch wiring: 12V positive → float switch → pump positive; pump negative → ground

RAW WATER COOLING FLOW (typical):
Sea cock → Strainer (clean every 3 months) → Raw water pump (impeller) → Heat exchanger/thermostat → Exhaust elbow → Through hull overboard

ZINCS/GALVANIC PROTECTION:
Replace when 50% depleted
Shaft zinc (typical Martyr aluminum): Replace annually in salt water, every 2 years in fresh
Hull zinc: Replace when 50% gone
Raw water system zinc: Replace annually

FUEL SYSTEM HOSE (ABYC A-24):
Use USCG Type A-1 fire-resistant fuel hose only
Maximum permeation: 15 g/m²/day
Clamp: All-stainless (no zinc-plated) Oetiker or worm gear
NEVER use clear PVC for fuel

STUFFING BOX / SHAFT SEAL:
Traditional packing: Flax packing, adjust to drip 1-3 drops/minute when running
PSS (Propeller Shaft Seal): Inspect bellows annually for cracks
Dripless shaft seal carbon face replacement: Every 5-7 years or when face shows wear

ALIGNMENT:
Engine-to-transmission coupling alignment: Maximum 0.003 in (0.076 mm) runout with feeler gauge
Check annually or after any grounding event`;

  // Write all docs
  const docsToWrite = [
    { name: 'yamaha-f115-service-manual.txt', content: yamF115 },
    { name: 'yamaha-f150-service-manual.txt', content: yam150 },
    { name: 'suzuki-df115-df140-service-manual.txt', content: suzDF115 },
    { name: 'mercury-mercruiser-service-manual.txt', content: mercuryDoc },
    { name: 'yanmar-westerbeke-diesel-manual.txt', content: yamarDiesel },
    { name: 'marine-electrical-hull-systems.txt', content: hullSystems },
  ];

  for (const doc of docsToWrite) {
    const filePath = path.join(MANUALS_DIR, doc.name);
    fs.writeFileSync(filePath, doc.content, 'utf8');
    console.log(`✅ Created: ${doc.name} (${doc.content.length} chars)`);
    docs.push(filePath);
  }
  return docs;
}

// ── Try downloading real PDFs from Google Drive ───────────────────────────────
async function tryDownloadPDFs() {
  const gdrivePdfs = [
    {
      name: 'yamaha-115-service-manual-official.pdf',
      id: '1Pjy2X62Jid0sWj8dfesnjKoK_dqVaFlP',
      desc: 'Yamaha 100A/115B/115C/115F Service Manual'
    },
    {
      name: 'yamaha-60f-90a-service-manual.pdf',
      id: '1r7nbacz7MDItloGqgayuvdMvjjReaNWe',
      desc: 'Yamaha 60F/70B/75C/90A Service Manual'
    },
    {
      name: 'yamaha-25bmh-30hmh-service-manual.pdf',
      id: '11j21MsZbBxM_0JA3SgZZL8Ab-GJ9YUBh',
      desc: 'Yamaha 25BMH/30HMH Service Manual'
    },
  ];

  const downloaded = [];
  for (const pdf of gdrivePdfs) {
    const url = `https://drive.google.com/uc?export=download&id=${pdf.id}`;
    const dest = path.join(MANUALS_DIR, pdf.name);
    try {
      console.log(`⬇️  Downloading: ${pdf.desc}...`);
      const result = await Promise.race([
        downloadUrl(url, dest),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 30s')), 30000))
      ]);
      const stat = fs.statSync(dest);
      if (stat.size > 10000) {
        console.log(`✅ Downloaded: ${pdf.name} (${Math.round(stat.size / 1024)}KB)`);
        downloaded.push(dest);
      } else {
        console.log(`⚠️  File too small (${stat.size} bytes), likely not a real PDF: ${pdf.name}`);
        fs.unlinkSync(dest);
      }
    } catch (err) {
      console.log(`⚠️  Failed to download ${pdf.desc}: ${err.message}`);
    }
  }
  return downloaded;
}

// ── Upload file to OpenAI ─────────────────────────────────────────────────────
async function uploadFile(filePath) {
  const filename = path.basename(filePath);
  console.log(`📤 Uploading: ${filename}`);
  const file = await client.files.create({
    file: fs.createReadStream(filePath),
    purpose: 'assistants',
  });
  console.log(`   File ID: ${file.id} — ${filename}`);
  return file.id;
}

// ── Main setup flow ───────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 Marine RAG Setup Starting...\n');

  // 1. Create knowledge documents
  console.log('📝 Creating knowledge documents...');
  const knowledgeDocs = createKnowledgeDocs();

  // 2. Try to download real PDFs (best effort)
  console.log('\n📥 Attempting to download real service manuals...');
  const downloadedPdfs = await tryDownloadPDFs();

  const allFiles = [...knowledgeDocs, ...downloadedPdfs];
  console.log(`\n📁 Total files ready: ${allFiles.length}`);

  // 3. Create vector store
  console.log('\n🗄️  Creating OpenAI vector store...');
  const vs = await client.vectorStores.create({
    name: 'boat-buddy-manuals',
    expires_after: { anchor: 'last_active_at', days: 365 }
  });
  const VECTOR_STORE_ID = vs.id;
  console.log(`✅ Vector store created: ${VECTOR_STORE_ID}`);

  // 4. Upload files and add to vector store
  console.log('\n📤 Uploading files to OpenAI...');
  const fileIds = [];
  for (const filePath of allFiles) {
    try {
      const fileId = await uploadFile(filePath);
      fileIds.push(fileId);
      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`⚠️  Failed to upload ${path.basename(filePath)}: ${err.message}`);
    }
  }

  // 5. Add files to vector store
  console.log(`\n🔗 Adding ${fileIds.length} files to vector store...`);
  for (const fileId of fileIds) {
    try {
      await client.vectorStores.files.create(VECTOR_STORE_ID, { file_id: fileId });
      console.log(`   Linked: ${fileId}`);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.log(`⚠️  Failed to link ${fileId}: ${err.message}`);
    }
  }

  // 6. Wait for processing
  console.log('\n⏳ Waiting for vector store to process files...');
  let attempts = 0;
  while (attempts < 20) {
    await new Promise(r => setTimeout(r, 3000));
    const vsStatus = await client.vectorStores.retrieve(VECTOR_STORE_ID);
    const counts = vsStatus.file_counts;
    console.log(`   Status: completed=${counts.completed}, in_progress=${counts.in_progress}, failed=${counts.failed}`);
    if (counts.in_progress === 0) break;
    attempts++;
  }

  // 7. Create assistant
  console.log('\n🤖 Creating OpenAI assistant...');
  const assistant = await client.beta.assistants.create({
    name: 'Boat Buddy Marine Manual Expert',
    instructions: `You are a marine engine and systems expert. Answer questions using the service manuals and technical documents provided in your knowledge base.

CRITICAL RULES:
- Always cite the specific manual/document and section you are pulling from
- Provide exact torque specs, part numbers, clearances, and procedures as stated in the manual
- If a value is in the manual, state it exactly — never approximate
- If the manual does not contain the information, say so clearly and suggest checking the OEM manual
- Format: Plain text only. No markdown. No asterisks. No headers with #. Use numbered steps.
- End with a brief safety note for any mechanical/electrical procedure

When providing torque specs: state both metric (Nm) and imperial (ft-lb)
When providing part numbers: prefix with "Part Number:"
When referencing manual sections: say "Per the [manual name]:"`,
    model: 'gpt-4o',
    tools: [{ type: 'file_search' }],
    tool_resources: {
      file_search: { vector_store_ids: [VECTOR_STORE_ID] }
    }
  });
  const ASSISTANT_ID = assistant.id;
  console.log(`✅ Assistant created: ${ASSISTANT_ID}`);

  // 8. Test query
  console.log('\n🧪 Running test query...');
  try {
    const thread = await client.beta.threads.create();
    await client.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: 'What is the torque spec for the cylinder head bolts on a Yamaha F115? Include all steps.'
    });
    const run = await client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: ASSISTANT_ID,
    }, { pollIntervalMs: 2000, timeout: 60000 });

    if (run.status === 'completed') {
      const messages = await client.beta.threads.messages.list(thread.id);
      const answer = messages.data[0].content[0].text.value;
      const citations = messages.data[0].content[0].text.annotations || [];
      console.log('\n📖 Test query result:');
      console.log('─'.repeat(60));
      console.log(answer.substring(0, 800));
      if (citations.length > 0) {
        console.log(`\n📎 Citations (${citations.length}): ${citations.map(c => c.text).join(', ')}`);
      }
    } else {
      console.log(`⚠️  Run status: ${run.status}`);
    }
  } catch (err) {
    console.log(`⚠️  Test query failed: ${err.message}`);
  }

  // 9. Save IDs to .env-rag file
  const envContent = `VECTOR_STORE_ID=${VECTOR_STORE_ID}\nASSISTANT_ID=${ASSISTANT_ID}\n`;
  fs.writeFileSync(path.join(__dirname, '.env-rag'), envContent);
  console.log('\n💾 IDs saved to .env-rag');

  console.log('\n' + '═'.repeat(60));
  console.log('✅ RAG SETUP COMPLETE');
  console.log('═'.repeat(60));
  console.log(`VECTOR_STORE_ID: ${VECTOR_STORE_ID}`);
  console.log(`ASSISTANT_ID:    ${ASSISTANT_ID}`);
  console.log(`Files uploaded:  ${fileIds.length}`);
  console.log(`PDFs downloaded: ${downloadedPdfs.length}`);
  console.log(`Text docs:       ${knowledgeDocs.length}`);
  console.log('═'.repeat(60));

  return { VECTOR_STORE_ID, ASSISTANT_ID, fileIds };
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
