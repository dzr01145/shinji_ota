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
  const validUser = process.env.VITE_AUTH_USER;
  const validPassword = process.env.VITE_AUTH_PASSWORD;

  // 環境変数が未設定の場合はローカル開発モードとしてスキップ
  if (!validUser || !validPassword) return next();

  const user = basicAuth(req);
  if (!user || user.name !== validUser || user.pass !== validPassword) {
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

// --- Blog API (Supabase JSクライアント版) ---
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const { Pool } = pg;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const pgPoolOptions = DATABASE_URL ? { connectionString: DATABASE_URL } : null;
if (pgPoolOptions && !/localhost|127\.0\.0\.1/.test(DATABASE_URL)) {
  pgPoolOptions.ssl = { rejectUnauthorized: false };
}
const pgPool = pgPoolOptions ? new Pool(pgPoolOptions) : null;

const requireBlogStore = (res) => {
  if (supabase || pgPool) return false;
  res.status(503).json({ error: 'Blog service is not configured' });
  return true;
};

const requireSupabase = (res) => {
  if (supabase) return false;
  res.status(503).json({ error: 'Supabase storage is not configured' });
  return true;
};

const getAdminPassword = () => process.env.ADMIN_PASSWORD;

// ヘルパー: DB行 → フロントエンド用オブジェクト変換
const rowToPost = (row) => ({
  id: row.id.toString(),
  title: row.title,
  body: row.body,
  category: row.category,
  imageUrl: row.image_url || null,
  tags: row.tags || [],
  published: row.published,
  date: row.created_at,
  updatedAt: row.updated_at
});

const fetchBlogPosts = async ({ category, year, month }) => {
  if (supabase) {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (category && category !== 'すべて') query = query.eq('category', category);
    if (year) query = query.gte('created_at', `${year}-01-01`).lte('created_at', `${year}-12-31T23:59:59`);
    if (month && year) {
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);
      const nextMonth = m === 12 ? 1 : m + 1;
      const nextYear = m === 12 ? y + 1 : y;

      const startDate = `${y}-${String(m).padStart(2, '0')}-01T00:00:00`;
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01T00:00:00`;

      query = query.gte('created_at', startDate).lt('created_at', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  const where = ['published = true'];
  const params = [];

  if (category && category !== 'すべて') {
    params.push(category);
    where.push(`category = $${params.length}`);
  }
  if (year) {
    params.push(`${year}-01-01`);
    where.push(`created_at >= $${params.length}`);
    params.push(`${year}-12-31T23:59:59`);
    where.push(`created_at <= $${params.length}`);
  }
  if (month && year) {
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    const nextMonth = m === 12 ? 1 : m + 1;
    const nextYear = m === 12 ? y + 1 : y;

    params.push(`${y}-${String(m).padStart(2, '0')}-01T00:00:00`);
    where.push(`created_at >= $${params.length}`);
    params.push(`${nextYear}-${String(nextMonth).padStart(2, '0')}-01T00:00:00`);
    where.push(`created_at < $${params.length}`);
  }

  const { rows } = await pgPool.query(
    `select * from blog_posts where ${where.join(' and ')} order by created_at desc`,
    params
  );
  return rows;
};

const fetchBlogArchives = async () => {
  if (supabase) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('created_at')
      .eq('published', true);
    if (error) throw error;
    return data || [];
  }

  const { rows } = await pgPool.query(
    'select created_at from blog_posts where published = true'
  );
  return rows;
};

const fetchBlogPostById = async (id) => {
  if (supabase) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();
    if (error) return null;
    return data;
  }

  const { rows } = await pgPool.query(
    'select * from blog_posts where id = $1 and published = true limit 1',
    [id]
  );
  return rows[0] || null;
};

// GET /api/blog - 記事一覧（カテゴリ・年月フィルタ対応）
app.get('/api/blog', async (req, res) => {
  const { category, year, month } = req.query;
  try {
    if (requireBlogStore(res)) return;
    const data = await fetchBlogPosts({ category, year, month });
    res.json((data || []).map(rowToPost));
  } catch (error) {
    console.error('Error reading blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET /api/blog/archives - 年月アーカイブ一覧
app.get('/api/blog/archives', async (req, res) => {
  try {
    if (requireBlogStore(res)) return;
    const data = await fetchBlogArchives();

    const archives = {};
    (data || []).forEach(p => {
      const d = new Date(p.created_at);
      // JST (UTC+9) に強制変換して年・月を取得
      const jstDate = new Date(d.getTime() + 9 * 60 * 60 * 1000);
      const year = jstDate.getUTCFullYear().toString();
      const month = String(jstDate.getUTCMonth() + 1).padStart(2, '0');
      const key = `${year}-${month}`;
      archives[key] = (archives[key] || 0) + 1;
    });
    res.json(Object.entries(archives)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([k, count]) => {
        const [year, month] = k.split('-');
        return { year, month, count };
      }));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch archives' });
  }
});

// GET /api/blog/:id - 記事詳細
app.get('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (requireBlogStore(res)) return;
    const data = await fetchBlogPostById(id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(rowToPost(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST /api/blog - 新規投稿（管理者のみ）
app.post('/api/blog', async (req, res) => {
  const { password, post } = req.body;
  const adminPassword = getAdminPassword();
  if (!adminPassword) return res.status(503).json({ error: 'Admin password is not configured' });
  if (password !== adminPassword) return res.status(401).json({ error: 'Unauthorized' });
  if (!post || !post.title || !post.body) return res.status(400).json({ error: 'title and body are required' });

  try {
    if (requireSupabase(res)) return;
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: post.title,
        body: post.body,
        category: post.category || 'その他',
        image_url: post.imageUrl || null,
        tags: post.tags || [],
        published: true
      })
      .select()
      .single();
    if (error) throw error;
    res.json({ success: true, post: rowToPost(data) });
  } catch (error) {
    console.error('Error saving blog post:', error);
    res.status(500).json({ error: 'Failed to save blog post' });
  }
});

// DELETE /api/blog/:id - 記事削除（管理者のみ）
app.delete('/api/blog/:id', async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const adminPassword = getAdminPassword();
  if (!adminPassword) return res.status(503).json({ error: 'Admin password is not configured' });
  if (password !== adminPassword) return res.status(401).json({ error: 'Unauthorized' });

  try {
    if (requireSupabase(res)) return;
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// POST /api/generate-image - Gemini Imagen を使った AI 画像生成
app.post('/api/generate-image', async (req, res) => {
  const { title, category } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  // 日本語タイトルから英語プロンプトを生成
  const promptModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const promptResult = await promptModel.generateContent(
    `You are an art director. Create a concise English image generation prompt (max 60 words) for a professional blog post hero image.
Topic: "${title}"
Category: "${category || 'Safety & Consulting'}"
Style requirements: photorealistic or high-quality digital illustration, professional, modern, no text or typography in the image, no people's faces shown clearly.
Output ONLY the prompt text, nothing else.`
  );
  const imagePrompt = promptResult.response.text().trim();
  console.log('Generated image prompt:', imagePrompt);

  // Imagen 3 REST API を呼び出して画像を生成
  const imagenResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: imagePrompt }],
        parameters: { sampleCount: 1, aspectRatio: '16:9' }
      })
    }
  );

  if (!imagenResponse.ok) {
    const errText = await imagenResponse.text();
    console.error('Imagen API error:', errText);
    return res.status(500).json({ error: 'Image generation failed', details: errText });
  }

  const imagenData = await imagenResponse.json();
  const prediction = imagenData.predictions?.[0];
  if (!prediction?.bytesBase64Encoded) {
    return res.status(500).json({ error: 'No image returned from Imagen API' });
  }

  // Base64 → Buffer に変換して Supabase Storage にアップロード
  const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
  const mimeType = prediction.mimeType || 'image/png';
  const ext = mimeType.split('/')[1] || 'png';
  const fileName = `blog-${Date.now()}.${ext}`;

  if (requireSupabase(res)) return;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(fileName, imageBuffer, {
      contentType: mimeType,
      upsert: false
    });

  if (uploadError) {
    console.error('Supabase upload error:', uploadError);
    return res.status(500).json({ error: 'Failed to upload image', details: uploadError.message });
  }

  // 公開 URL を取得
  const { data: publicUrlData } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName);

  res.json({
    imageUrl: publicUrlData.publicUrl,
    prompt: imagePrompt
  });
});

// POST /api/unsplash-image - Unsplash から関連画像を検索して返す
app.post('/api/unsplash-image', async (req, res) => {
  const { title, category } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return res.status(503).json({ error: 'UNSPLASH_ACCESS_KEY が設定されていません' });
  }

  try {
    // Gemini で日本語タイトルから英語検索キーワードを生成
    const kwModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const kwResult = await kwModel.generateContent(
      `Convert this Japanese blog post title to 3-5 concise English search keywords for finding a professional stock photo on Unsplash.
Title: "${title}"
Category: "${category || '労働安全'}"
Output ONLY the keywords separated by spaces, nothing else. Example: workplace safety industrial machinery`
    );
    const keywords = kwResult.response.text().trim();
    console.log('Unsplash keywords:', keywords);

    // Unsplash 検索 API を呼び出す
    const unsplashRes = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keywords)}&per_page=5&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    );

    if (!unsplashRes.ok) {
      const errText = await unsplashRes.text();
      return res.status(500).json({ error: 'Unsplash API error', details: errText });
    }

    const unsplashData = await unsplashRes.json();
    const results = unsplashData.results || [];

    if (results.length === 0) {
      return res.status(404).json({ error: '該当する画像が見つかりませんでした' });
    }

    // 上位5件を候補として返す
    const candidates = results.map(photo => ({
      id: photo.id,
      imageUrl: photo.urls.regular,          // 表示用 URL (1080px)
      thumbUrl: photo.urls.small,            // サムネイル (400px)
      downloadUrl: photo.links.download_location, // Unsplash ダウンロードトリガー用
      authorName: photo.user.name,
      authorUrl: photo.user.links.html,
      unsplashUrl: photo.links.html,
      altDescription: photo.alt_description || title,
    }));

    res.json({ candidates, keywords });
  } catch (err) {
    console.error('Unsplash image error:', err);
    res.status(500).json({ error: 'Failed to fetch Unsplash image', details: err.message });
  }
});

// Admin Login Check
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = getAdminPassword();
  if (!adminPassword) return res.status(503).json({ error: 'Admin password is not configured' });

  if (password === adminPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// --- Email API (SendGrid) ---
// Using direct fetch to avoid adding new dependencies if possible, or use nodemailer with SendGrid transport
// But given the timeouts, direct HTTP API is often more reliable on restricted networks.

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check for SendGrid API Key
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API Key missing');
    return res.status(503).json({ error: 'Email service not configured' });
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: process.env.CONTACT_EMAIL || 'dzr01145@gmail.com' }]
        }],
        from: { email: 'noreply@shinji-ota.com', name: 'Portfolio Contact Form' }, // Must be a verified sender in SendGrid
        reply_to: { email: email, name: name },
        subject: `[Portfolio Contact] Message from ${name}`,
        content: [
          {
            type: 'text/plain',
            value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
          },
          {
            type: 'text/html',
            value: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`
          }
        ]
      })
    });

    if (response.ok) {
      res.json({ success: true, message: 'Email sent successfully' });
    } else {
      const errorData = await response.json();
      console.error('SendGrid Error:', errorData);
      res.status(500).json({ error: 'Failed to send email via SendGrid' });
    }
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
