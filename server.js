import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import basicAuth from 'basic-auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic Authentication Middleware
const auth = (req, res, next) => {
  const user = basicAuth(req);
  const validUser = process.env.VITE_AUTH_USER;
  const validPassword = process.env.VITE_AUTH_PASSWORD;

  if (!user || !validUser || !validPassword || user.name !== validUser || user.pass !== validPassword) {
    res.set('WWW-Authenticate', 'Basic realm="Portfolio Area"');
    return res.status(401).send('Authentication required.');
  }
  next();
};

// Apply authentication to all routes
app.use(auth);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// --- Gemini Chat API ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// System Instruction Data (Hardcoded for server usage)
const PERSONAL_INFO = {
  name: "SHINJI OTA",
  jaName: "太田 真治",
  title: "Principal Consultant / Risk Engineer",
  about: "労働安全のスペシャリスト。鉱山保安のバックグラウンドを持ち、技術士（総合技術監理・衛生工学）として国内外の現場を支援。「事例→リスク抽出→PDCA」の論理的アプローチにより、確実なリスク低減と組織の安全文化醸成をデザインする。",
};

const SYSTEM_INSTRUCTION = `
You are an AI assistant for ${PERSONAL_INFO.name}'s portfolio website. 
Your role is to answer visitor's questions about ${PERSONAL_INFO.name} (Shinji Ota) based on the provided information.
Act as a professional, knowledgeable, yet approachable persona—mirroring Shinji's "Translator of Safety Culture" style.

**Key Persona Traits:**
- **Professional Engineer (Technical):** You value logic, evidence, and safety standards (ISO 45001).
- **Translator:** You bridge the gap between complex regulations/engineering and on-site reality.
- **Consultant:** You provide insights based on risk assessment and practical experience.

Profile:
Name: ${PERSONAL_INFO.name} (${PERSONAL_INFO.jaName})
Title: ${PERSONAL_INFO.title}
Summary: ${PERSONAL_INFO.about}

**Personality:**
- Uses "Interest Adjustment" style: Fair, calm tone, but inclusive of all stakeholders' voices.
- Logical yet empathetic to field workers.

Tone: Professional, logical, and reliable.
Language: Answer in the same language as the user (mostly Japanese).
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('Server Error: GEMINI_API_KEY is missing in environment variables.');
      return res.status(500).json({ error: 'Server configuration error: API Key missing' });
    } else {
      // Log presence without revealing key
      console.log('API Key is present.');
    }

    // Using gemini-pro as a fallback for stability if 1.5-flash fails
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro", 
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Gemini API Error Details:', error);
    // Log detailed response if available (e.g. from Google API error object)
    if (error.response) {
       try {
         // Some Google API errors have a response property
         console.error('Error Response Body:', JSON.stringify(error.response));
       } catch (e) {
         console.error('Could not parse error response');
       }
    }
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
});

// --- Redirects for External Tools ---
app.get('/chat', (req, res) => res.redirect('https://safety-chatbot.onrender.com'));

// Handle SPA routing: return index.html for any unknown route
// Using regex to avoid path-to-regexp errors with '*'
app.get(/.*/, (req, res) => {
  if (req.path.includes('.')) {
     res.status(404).end();
     return;
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
