/**
 * Firecrawl API を活用したニュース収集サービス (Vanilla JS 版)
 */

const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1/scrape';

/**
 * 指定された URL を Firecrawl でスクレイピングし、Markdown を取得します。
 */
export const scrapeNewsUrl = async (url, apiKey) => {
  if (!apiKey) {
    throw new Error('FIRECRAWL_API_KEY is missing. Please set it in your .env file.');
  }

  try {
    const response = await fetch(FIRECRAWL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Firecrawl API error (${response.status}): ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error scraping with Firecrawl:', error);
    throw error;
  }
};

/**
 * 労働安全衛生に関連する主要なニュースソース URL
 */
export const SAFETY_NEWS_SOURCES = [
  'https://www.mhlw.go.jp/stf/houdou/index.html', // 厚労省 報道発表資料
  'https://www.jisha.or.jp/news/index.html',     // 中央労働災害防止協会 ニュース
  'https://www.kentsu.co.jp/webnews/',           // 建通新聞（建設ニュース）
];
