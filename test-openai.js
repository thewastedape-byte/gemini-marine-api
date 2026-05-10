const OpenAI = require('openai');
const c = new OpenAI({apiKey:'test'});
console.log('vectorStores keys:', Object.keys(c.vectorStores));
console.log('beta.assistants:', typeof c.beta.assistants);
console.log('beta.threads:', typeof c.beta.threads);
console.log('files:', typeof c.files);
