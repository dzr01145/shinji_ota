import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const postData = {
  title: "その「単なる書類上の安全」が命を奪う。2026年最新 厚労省・労働災害速報に学ぶ現場の『形骸化リスク』",
  body: `
## はじめに
本日公開された厚生労働省の2026年度「労働災害発生状況速報」において、特定の業種において依然として基本動作の欠如に起因する重大事故が後を絶たない実態が浮き彫りになりました。特に、最新の設備を導入していながらも、ソフト面（安全文化やルール遵守の徹底）が伴っていないことによる事故は、経営者・現場管理者の双方が重く受け止めるべき課題です。

## コンサルタントの眼：見えざる「形骸化リスク」
私が幾多のプラント・鉱山現場を見てきた中で、最も恐ろしいのは「ルールや設備は揃っているが、誰も本当に機能しているか確認していない」という**形骸化の状態**です。

今回の厚労省レポートでも指摘されている通り、安全装置（フルハーネス型墜落制止用器具など）の不適切使用や、作業手順書の未更新が事故のトリガーとなっています。これは現場の作業員の「不安全行動」として片付けられがちですが、本質的な原因は**「現場の痛みを理解せず、書類上だけで安全管理を完結させているマネジメントの怠慢」**に他なりません。

## 明日からできる安全投資（PDCAの再構築）
現場と経営を繋ぐシンクロナイザーとして、明日から現場で実践すべき具体的なアクションを提言します。

1. **「形だけ」のKYT（危険予知）の廃止と対話型アセスメントへの移行**
   - 毎日同じ内容を繰り返すKYTは思考停止を招きます。「今日、いつもと違う状況は何か？」という問いを必ず一つ入れる対話型のミーティングに切り替えてください。
2. **監査ではなく「伴走」によるパトロール**
   - 安全パトロールを「アラ探し」にするのではなく、作業員と一緒に「なぜこのルールが守りにくいのか？」を考える場にしてください。守られないルールには、無理な工期や不適切な動線など、必ず構造的な理由があります。
3. **データに基づく「ニアミス（ヒヤリハット）」の再分析**
   - 過去半年間のヒヤリハットデータを棚卸しし、同じ場所・同じ作業で発生している事象に対して工学的な対策（ハード面の改善）を優先投資してください。

## おわりに
「安全は経営の基盤である」という言葉は、実際に現場で汗を流す人々のリスクが軽減されて初めて真実となります。数字上の無災害記録を守るためではなく、今日出勤してきた仲間を明日も無事に家族の元へ帰すため。私たちが行うべきは、事例を教訓に変え、確実なPDCAを回し続ける泥臭い努力の積み重ねです。

*太田 真治*
*Principal Consultant / Risk Engineer*
`,
  category: "労働安全衛生",
  tags: ["労働災害速報", "厚労省", "形骸化", "リスクマネジメント", "PDCA"],
  published: true,
  image_url: "https://images.unsplash.com/photo-1541888086425-d81bb192a009?q=80&w=2070&auto=format&fit=crop"
};

async function run() {
  console.log("Posting to Supabase...");
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(postData)
    .select();

  if (error) {
    console.error("Error inserting post:", error);
  } else {
    console.log("SUCCESS! Post inserted with ID:", data[0].id);
    console.log("Title:", data[0].title);
  }
}

run();
