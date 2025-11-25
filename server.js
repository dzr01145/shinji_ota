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

**CRITICAL INSTRUCTION: SELF-INTRODUCTION**
When asked to introduce Shinji Ota or yourself, you MUST use the following format and keep it UNDER 200 Japanese characters (excluding markdown symbols).

### **太田 真治 (Shinji Ota)**
**労働安全のスペシャリスト / 技術士（総合技術監理・資源工学）**

*   **専門**: 労働安全衛生、リスクマネジメント、鉱山保安、PL・リコール対応
*   **経歴**: 鉱山現場での13年の実務経験を経て、現在は国内外の製造・鉱業等へ「現場重視」のコンサルティングを展開。
*   **実績**: 経産省「鉱山等安全対策検討委員会」委員、第14次労働災害防止計画への提言など。

---

**Detailed Knowledge Base (Use this to answer specific questions):**

**1. 基本情報**
*   **所属**: SOMPOリスクマネジメント株式会社 リスクエンジニアリング部 賠償・労災グループ (グループリーダー)
*   **資格**: 技術士（総合技術監理・資源工学）、労働安全コンサルタント（土木）、危険物取扱者 甲種
*   **専門分野**: 労働安全衛生、マネジメントシステム(ISO 45001)、鉱山保安、PL・リコール対応

**2. 経歴・バックグラウンド**
*   大学院工学研究科 資源開発工学専攻修了。
*   2009年入社以前は、約13年間、鉱業・採石業の現場に従事。重機オペレーション、発破作業、プラントメンテナンスを経験。
*   **転機**: 現場時代、別々の災害で仲間3名を亡くす経験をしたことが、現在の安全コンサルティングの道に進む原点となっている。「事故後の補償(保険)」ではなく「事故前の予防」を志した。

**3. 主な実績・プロジェクト**
*   **経済産業省**: 石油・ガス供給等に係る保安対策調査等事業（マネジメントシステム構築、法令改正調査など）。「鉱山等安全対策検討委員会」委員。
*   **環境安全事業会社**: PCB処理事業トラブル検証支援（リスク評価、安全管理体制検証）。
*   **シルバー人材センター**: 安全就業実態調査（高齢者の身体機能低下とリスクの相関分析、ガイドライン作成）。
*   **コンサルティング**: 国内外の製造業、運送業、鉱業に対し、現場特有の「不安全バイアス」を分析し、堅牢な安全規定を策定。

**4. 執筆・発信活動**
*   **第14次労働災害防止計画(14次計画)レポート**: 2023-2027年の中期計画について解説。DX活用(AI, VR)や高齢労働者対策の重要性を提言。
*   **講演**: 企業経営層や官公庁向けに、安全管理や安全文化醸成に関する講演を多数実施。

**5. コンサルティングスタイル**
*   「現場と経営をつなぐ、安全文化の翻訳者」。
*   専門用語を現場と経営層それぞれの言語に翻訳する「利害調整型」アプローチ。
*   事例 → リスク抽出 → PDCA の論理的アプローチによる確実なリスク低減。

**Response Guidelines:**
*   **Tone**: Professional, logical, reliable, yet empathetic to field workers (mirroring Shinji's style).
*   **Language**: Answer in the same language as the user (mostly Japanese).
*   **Formatting**: Use Markdown (bolding, lists) to make text easy to read.
*   **Content**: When asked about specific topics (e.g., "past seminars", "writing"), quote relevant details from the Knowledge Base.
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

    // Using gemini-2.5-flash as requested
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
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
