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

// Increase payload limit for Base64 images
app.use(express.json({ limit: '50mb' }));

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
When asked to introduce Shinji Ota or yourself, you MUST use the following format and keep it UNDER 150 Japanese characters (excluding markdown symbols).

### **太田 真治 (Shinji Ota)**
**労働安全のスペシャリスト / 技術士（総合技術監理・資源工学）**

*   **専門**: 労働安全衛生、リスクマネジメント、鉱山保安、PL・リコール
*   **経歴**: 鉱山現場13年を経て、現在は製造・鉱業等へ「現場重視」のコンサルを展開。
*   **実績**: 経産省委員会委員、14次防への提言等。

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
      systemInstruction: SYSTEM_INSTRUCTION + `
      
      **CRITICAL RESPONSE RULES:**
      1. **BREVITY**: Keep ALL responses concise. Aim for under 150 Japanese characters unless specifically asked for a detailed explanation. If the response is long, summarize it first.
      2. **NO REFUSALS**: NEVER say "Sorry, I couldn't generate a response" or "I don't know". If the exact info is missing, YOU MUST INFER it from context or provide a general, polite response based on common sense for a safety consultant.
      3. **SPECULATION**: If asked about personality or something not in the knowledge base, infer from his background (e.g., "Based on his experience in mining and safety, he is likely disciplined, logical, and deeply cares about human life."). ALWAYS preface such answers with "知識ベースには明記されていませんが、経歴から推測すると..." or "想像ですが...".
      4. **FORMAT**: Use Markdown (bolding, lists) to make text easy to read.
      `
    });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 800,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Gemini API Error Details:', error);
    if (error.response) {
      try {
        console.error('Error Response Body:', JSON.stringify(error.response));
      } catch (e) {
        console.error('Could not parse error response');
      }
    }
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
});

// --- Blog API ---
import fs from 'fs';
import pg from 'pg';
const { Pool } = pg;

const BLOG_FILE = path.join(__dirname, 'blog_posts.json');
let pool;

// Initialize DB or File
if (process.env.DATABASE_URL) {
  console.log('Connecting to PostgreSQL...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      image_url TEXT NOT NULL,
      caption TEXT,
      location TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `).then(() => console.log('Blog table initialized'))
    .catch(err => console.error('DB Init Error:', err));
} else {
  console.log('Using JSON file for storage');
  if (!fs.existsSync(BLOG_FILE)) {
    fs.writeFileSync(BLOG_FILE, JSON.stringify([]));
  }
}

// Get all blog posts
app.get('/api/blog', async (req, res) => {
  try {
    if (pool) {
      const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
      const posts = result.rows.map(row => ({
        id: row.id.toString(),
        imageUrl: row.image_url,
        caption: row.caption,
        date: row.created_at,
        location: row.location
      }));
      res.json(posts);
    } else {
      const data = fs.readFileSync(BLOG_FILE, 'utf8');
      const posts = JSON.parse(data);
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      res.json(posts);
    }
  } catch (error) {
    console.error('Error reading blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Create new blog post (Admin only)
app.post('/api/blog', async (req, res) => {
  const { password, post } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized: Incorrect password' });
  }

  if (!post || !post.imageUrl) {
    return res.status(400).json({ error: 'Invalid post data' });
  }

  try {
    if (pool) {
      const result = await pool.query(
        'INSERT INTO blog_posts (image_url, caption, location) VALUES ($1, $2, $3) RETURNING *',
        [post.imageUrl, post.caption || '', post.location || '']
      );
      const newPost = result.rows[0];
      res.json({
        success: true, post: {
          id: newPost.id.toString(),
          imageUrl: newPost.image_url,
          caption: newPost.caption,
          date: newPost.created_at,
          location: newPost.location
        }
      });
    } else {
      const data = fs.readFileSync(BLOG_FILE, 'utf8');
      const posts = JSON.parse(data);

      const newPost = {
        id: Date.now().toString(),
        imageUrl: post.imageUrl,
        caption: post.caption || '',
        date: new Date().toISOString(),
        location: post.location || ''
      };

      posts.push(newPost);
      fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));

      res.json({ success: true, post: newPost });
    }
  } catch (error) {
    console.error('Error saving blog post:', error);
    res.status(500).json({ error: 'Failed to save blog post' });
  }
});

// Delete blog post (Admin only)
app.delete('/api/blog/:id', async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized: Incorrect password' });
  }

  try {
    if (pool) {
      await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
      res.json({ success: true });
    } else {
      const data = fs.readFileSync(BLOG_FILE, 'utf8');
      let posts = JSON.parse(data);
      posts = posts.filter(post => post.id !== id);
      fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Admin Login Check
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// --- Email API ---
import nodemailer from 'nodemailer';

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if SMTP config is present
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP configuration missing');
    return res.status(503).json({ error: 'Email service not configured' });
  }

  try {
    const transporterConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465, // Switch to port 465 (SSL)
      secure: true, // Must be true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/ /g, ''),
      },
      // Force IPv4 to avoid potential IPv6 connection timeouts on some platforms
      family: 4,
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      logger: true,
      debug: true
    };

    // Remove automatic service selection to ensure our specific settings (like family: 4) are used
    // if (process.env.SMTP_HOST === 'smtp.gmail.com') { ... }

    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address
      replyTo: email, // Reply to the user's email
      to: process.env.CONTACT_EMAIL || 'dzr01145@gmail.com', // Target email updated to user's preference
      subject: `[Portfolio Contact] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
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
