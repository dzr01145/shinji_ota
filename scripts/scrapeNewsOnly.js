import { scrapeNewsUrl, SAFETY_NEWS_SOURCES } from '../services/firecrawlService.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  try {
    console.log(`Scraping ${SAFETY_NEWS_SOURCES[0]} ...`);
    const res = await scrapeNewsUrl(SAFETY_NEWS_SOURCES[0], process.env.FIRECRAWL_API_KEY);
    fs.writeFileSync('C:\\Users\\user\\.gemini\\antigravity\\brain\\1bad796f-3079-44ae-84eb-b0e10281703d\\scraped_news.md', res.data.markdown);
    console.log('Successfully saved to active workspace.');
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
