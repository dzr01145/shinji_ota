/**
 * ニュース自動収集・ブログ執筆・投稿 統合スクリプト
 * Firecrawl -> Gemini -> Supabase のパイプラインを実行します。
 */

import 'dotenv/config';
import { scrapeNewsUrl, SAFETY_NEWS_SOURCES } from '../services/firecrawlService.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PERSONAL_INFO } from '../constants.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || '';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // 複雑なニュース分析には Pro を推奨

async function generateBlogFromNews(newsUrl) {
  console.log(`[1/3] Scraping news content from: ${newsUrl}...`);
  const scrapeResult = await scrapeNewsUrl(newsUrl, FIRECRAWL_API_KEY);
  const newsMarkdown = scrapeResult.data.markdown;

  console.log(`[2/3] Generating expert blog post style (Shinji Ota persona)...`);
  const prompt = `
あなたは以下の人物（太田 真治）として、提供された最新ニュースに基づく専門的なブログ記事を執筆してください。

【著者プロフィール: 太田 真治 / Shinji Ota】
${PERSONAL_INFO.about}
肩書き: ${PERSONAL_INFO.title}
専門性: 技術士（総合技術監理・資源工学）、リスクエンジニア。

【インプット: 最新ニュース (一次ソース)】
${newsMarkdown}

【執筆の要件】
1. タイトル: ニュースの事実だけでなく、読者（経営層や現場管理者）が「リスク」「対策」を想起させる、インパクトのある日本語タイトルにしてください。
2. 構成:
   - はじめに: ニュースの要点。
   - コンサルタントの眼: 今回の事例/改正が「現場」に与える影響や、見落とされがちなリスク分析。
   - 明日からできる安全投資: 具体的なリスク低減策や PDCA サイクルへの反映など、実行可能なアドバイス。
   - おわりに: 太田真治としての力強いメッセージ。
3. トーン: 「現場の痛み」を知りつつ、論理的なデータに基づいたプロフェッショナルな語り口。
4. 形式: JSON形式のみで出力してください。
{
  "title": "記事タイトル",
  "body": "Markdown本文",
  "category": "労働安全衛生",
  "tags": ["タグ1", "タグ2"]
}
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
  const postData = JSON.parse(cleanJson);

  console.log(`[3/3] Posting to Supabase...`);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      ...postData,
      date: new Date().toISOString(),
      published: true,
      image_url: 'https://cdn.jsdelivr.net/gh/dzr01145/shinji_ota@main/public/images/news-automation-v1.jpg' // Default
    })
  });

  const uploadResult = await res.json();
  if (res.ok && uploadResult.length > 0) {
    console.log(`🚀 SUCCESS! Blog posted with ID: ${uploadResult[0].id}`);
    console.log(`Title: ${uploadResult[0].title}`);
  } else {
    throw new Error(`Failed to post blog: ${JSON.stringify(uploadResult)}`);
  }
}

// 実行デモ (最新ニュースソースから 1 件)
const targetUrl = SAFETY_NEWS_SOURCES[0]; 
generateBlogFromNews(targetUrl).catch(console.error);
