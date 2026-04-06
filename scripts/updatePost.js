import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('blog_posts').select('*').order('id', { ascending: false }).limit(1);
  if (error) return console.error(error);
  
  const post = data[0];
  const reference = "\n\n## 参考資料\n- [令和8年 労働災害発生状況速報 | 厚生労働省](https://duckduckgo.com/?q=%E4%BB%A4%E5%92%8C8%E5%B9%B4+%E5%8A%B4%E5%83%8D%E7%81%BD%E5%AE%B3%E7%99%BA%E7%94%9F%E7%8A%B6%E6%B3%81%E9%80%9F%E5%A0%B1+%E5%8E%9A%E7%94%9F%E5%8A%B4%E5%83%8D%E7%9C%81)\n  この記事では、建設業等において安全帯等の不適切使用が招いた事故事例とその発生件数統計を解説しています。";
  
  const newBody = post.body + reference;
  
  const { error: updateError } = await supabase.from('blog_posts').update({ body: newBody }).eq('id', post.id);
  if (updateError) {
    console.error("Update failed:", updateError);
  } else {
    console.log(`Successfully added references to post ID ${post.id}`);
  }
}
run();
