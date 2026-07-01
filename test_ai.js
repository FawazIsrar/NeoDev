const { GoogleGenAI } = require('@google/genai');
const config = require('./config/default.json');

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Hello, how are you?',
    });
    console.log("SUCCESS:", response.text);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}
test();
