---
name: shinji-blog-generator
description: >
  shinji-ota.com のブログ記事を自動生成・Supabaseに投稿するスキル。
  「ブログ記事を生成して」「記事を書いて」「ブログを更新して」「新しい投稿を作って」
  「労働安全の記事を書いて」「AIソリューションの記事を作って」などのキーワードで必ず発動する。
  NotebookLM Deep Researchで最新の一次ソースを収集し、URL実在確認後に
  太田真治のコンサルタント視点で日本語記事を生成。
  プレビュー確認・添削後、Supabaseに直接投稿する。
---

# shinji-blog-generator スキル

shinji-ota.com のブログに記事を生成・投稿するスキル。

## Supabase 接続情報

- **Project ID**: `oztfdwbvlarpegozqepn`
- **Supabase URL**: `https://oztfdwbvlarpegozqepn.supabase.co`
- **Supabase Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dGZkd2J2bGFycGVnb3pxZXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNjM5MzIsImV4cCI6MjA4NzgzOTkzMn0.nPdKRwaviMZpzHCzbeWaqV4TQVwdUy31m916MvgWgpY`
- **テーブル**: `public.blog_posts`
- **カラム**: `title` (text), `body` (text), `category` (text), `image_url` (text, nullable), `tags` (text[]), `published` (boolean, default: true)
- **投稿方法**: `POST http://localhost:3001/api/blog` に `{ password: "admin123", post: { title, body, category, imageUrl, tags } }` を送信。またはSupabase JS clientで直接INSERT。
- **画像URL形式**: `https://cdn.jsdelivr.net/gh/dzr01145/shinji_ota@main/public/images/（ファイル名）`

## NotebookLM 接続情報

- **ブログ保存先ノートブックID**: `c5f67b8a-625d-473c-ad8d-36141d665fbf`
- **ツール**: `mcp_notebooklm-mcp_source_add` (source_type: text)

## カテゴリ一覧

- `労働安全衛生` — 法改正、現場安全、リスクアセスメント、災害事例など
- `AIソリューション` — AI活用事例、最新技術、DX推進など
- `コンサルタント視点` — 実務Tips、考察、業界動向など
- `その他`

---

## 実行フロー

### Step 1: トピックの決定

ユーザーが特定トピックを指定していれば使う。指定がなければ：
- `search_web` で以下を検索する（2〜3件）
  - `"労働安全衛生 最新 2026"` または `"労働災害 対策 最新"`
  - `"AI 安全管理 ソリューション 2026"` または `"職場安全 DX 事例"`
- 検索結果から最も旬なトピックを1つ選び、ユーザーに一言確認する

例：「**『化学物質の自律的管理』に関する記事**を生成しようと思います。よろしいですか？」

### Step 2: Deep Research による一次ソース収集 ★重要★

**目的**: 記事の信頼性を担保するため、実在する一次ソース（URL付き）を確保する。

#### 方法A: NotebookLM Deep Research（推奨）

1. `mcp_notebooklm-mcp_research_start` でリサーチを開始する
   - `mode`: `fast` または `deep`
   - `source`: `web`
   - `query`: トピックに関連するキーワード
2. `mcp_notebooklm-mcp_research_status` で完了を待つ
3. `mcp_notebooklm-mcp_research_import` でソースをインポート
4. `mcp_notebooklm-mcp_notebook_query` でインポートされたソースに対して質問し、統計データ・事故事例・法令情報・出典URLを取得

**注意**: MCP APIの `research_start` が `"Failed to start research"` エラーを返す場合がある。
その場合は**方法B**に切り替える。

#### 方法B: ブラウザ経由 Deep Research（方法A失敗時のフォールバック）

1. `browser_subagent` でNotebookLMを開き、新規ノートブックを作成
2. 「ソースを追加」→「ウェブで新しいソースを検索」で Fast Research / Deep Research を選択
3. 検索クエリを入力してリサーチを実行
4. 完了後「インポート」ボタンですべてのソースを取り込む
5. MCP API (`notebook_query`) でインポート済みソースに対して質問し、データを取得

#### 方法C: 直接URL収集（方法A・B両方が失敗した場合の最終手段）

1. `search_web` でトピックに関連する検索を行う
2. 検索結果のURLに `read_url_content` でアクセスし、実在と内容を確認
3. 確認済みURLのみを参考資料として使用する

### Step 2.5: URL実在確認 ★必須★

**Step 2で取得した全URLに対して `read_url_content` でアクセスし、実在を確認する。**

- ✅ アクセス成功（200応答） → 参考資料に記載OK
- ❌ 404・接続エラー → 参考資料から除外
- ⚠️ `vertexaisearch.cloud.google.com` ドメインのURL → AI内部リダイレクトURL。**絶対に記事に記載しない**
- ⚠️ `search_web` が返すSource URLは一時的リダイレクトURLの可能性がある。必ず `read_url_content` で最終URLを確認する

### Step 3: 記事生成

以下の形式で記事を生成する。

**執筆スタンス（重要）**：
- 筆者は **太田 真治（Shinji Ota）**。SOMPOリスクマネジメント、技術士（総合技術監理・資源工学）、労働安全コンサルタント
- 鉱山現場13年の経験を持ち、「現場重視」「事例→リスク抽出→PDCA」の視点で書く
- 「事後対応」ではなく「予防」を重視するトーン
- 専門的だが読みやすく、現場の実務者に届く言葉で書く
- **文体は「だ/である体（常体）」を基本とし、まとめや呼びかけ部分では「です/ます体」も混在可**

**記事フォーマット**：
```
タイトル：（30〜50字、具体的・キャッチーに）
カテゴリ：（上記4つから1つ）
タグ：（3〜5個、カンマ区切り）

本文（マークダウン形式）：
## 見出し1
...（本文）...

## 見出し2
...（本文）...

## まとめ
...

## 参考資料
- [ページタイトル | サイト名](実在確認済みURL)
  この記事では〜を解説しています。
```

**本文の品質基準**：
- 1500〜3000文字程度（読み応えのある長さ）
- マークダウン使用：`##` 見出し、`**太字**`、`- リスト`
- 冒頭で読者の課題感に触れる
- 具体的な数字・事例・法令名を含める
- 末尾に「まとめ」または行動を促す一文
- **本文末尾に必ず `## 参考資料` セクションを設け、Step 2.5で実在確認済みのURLのみを記載する**
- `*italic*` 記法はブログレンダラー未対応のため使用しない（代わりに `**太字**` を使う）
- 参考資料は以下の**3行セット形式**で記述する：
  1. `[ページタイトル | サイト名・出どころ](URL)` のハイパーリンク
  2. 改行して `  この記事では、〜（記事の内容を1〜2文で解説）。` を追記

### Step 4: プレビュー表示

生成した記事を以下の形式でコンソールに表示し、ユーザーの確認を待つ：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 記事プレビュー
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【タイトル】〇〇〇〇

【カテゴリ】労働安全衛生
【タグ】#タグ1, #タグ2, #タグ3

【本文】
---
（本文全文）
---
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

表示後、以下を伝える：
> 「内容を確認・添削してください。OKであれば **「投稿して」** と言っていただければSupabaseに保存します。修正点があればお伝えください。」

### Step 5: ユーザー確認・添削対応

- ユーザーが修正を求めた場合 → 指摘に従って本文・タイトル・カテゴリ等を修正し、再度プレビューを表示
- ユーザーが「投稿して」「OK」「これでいい」「アップして」等と言った場合 → Step 6へ

### Step 6: Supabaseに投稿

投稿用JSONを `/tmp/blog_post.json` に保存し、以下のNodeスクリプトで送信する：

```bash
node -e "const fs=require('fs');const body=fs.readFileSync('/tmp/blog_post.json','utf8');fetch('http://localhost:3001/api/blog',{method:'POST',headers:{'Content-Type':'application/json'},body}).then(r=>r.json()).then(d=>console.log('RESULT:',JSON.stringify(d))).catch(e=>console.error('ERR:',e.message))"
```

サーバーが起動していない場合は先に `$env:PORT=3001; node server.js` で起動する。

### Step 7: NotebookLMに保存

Supabase成功後、`mcp_notebooklm-mcp_source_add` で保存する：

- **notebook_id**: `c5f67b8a-625d-473c-ad8d-36141d665fbf`
- **source_type**: `text`
- **title**: `（記事タイトル） [YYYY-MM-DD]`
- **text**: タイトル、カテゴリ、タグ、投稿日、著者（太田 真治）、URL、本文を含めたマークダウン
- **wait**: `true`

### Step 7.5: 記事アイキャッチ画像の生成と最適化（NotebookLM）

記事の内容に合わせて、NotebookLMで専用のアイキャッチ画像を自動生成し、ブログ用に最適化して保存する。

1. **生成の実行**: `mcp_notebooklm-mcp_studio_create` を呼び出す。
   - `artifact_type`: `"infographic"`
   - `notebook_id`: `c5f67b8a-625d-473c-ad8d-36141d665fbf`
   - `orientation`: `"landscape"`
   - `focus_prompt`: 記事の要約＋「かわいくて親しみやすい、すっきりとした手描き風のベクターイラスト。人間と未来的なロボットが共に助け合っている。テキストラベル：『（記事タイトルの一言）』」などを含める。
2. **完了待ち**: `mcp_notebooklm-mcp_studio_status` でステータスを監視する（数分かかる場合がある）。
3. **画像のダウンロードと最適化**: 
   - `mcp_notebooklm-mcp_download_artifact` で指定パス（例: `public/images/xxxx.png`）にダウンロード。
   - PowerShellまたはNode.jsを用いて画像を **16:9比率にクロップし、500KB以下のJPG** に変換する。
   - 変換後、画像をGitHubにpushし（`git add ... && git commit ... && git push`）、CDNのURLを取得する。
4. **記事への画像紐付け**: Supabaseの対象記事（`id`指定）に対し、生成した画像のCDN URLを `PATCH` 送信して `image_url` を更新する。

### Step 8: 結果の確認と完了通知

**成功時:**
> 「✅ 記事とアイキャッチ画像を投稿しました！
> - **ブログ**: https://www.shinji-ota.com/blog に反映済み（記事ID: XXX）
> - **NotebookLM**: 保存済み 📓」

**失敗時:** エラー内容を表示し再試行を提案。

---

## エラーハンドリング

- **サーバー未起動**: `$env:PORT=3001; node server.js` で起動してから再試行
- **Supabase失敗**: エラーを表示し、再試行するか確認
- **NotebookLMのみ失敗（ノート保存や画像生成）**: ブログ投稿のテキスト自体は完了として扱い、画像失敗時はデフォルトを適用してワーニングのみ表示
- **ユーザーが「やめる」「キャンセル」**: 投稿を実行せずに終了

## 注意事項

- **投稿前に必ずユーザーの明示的な承認を得ること**（Step 5でOKをもらう前に投稿しない）
- 著作権に注意：Web検索結果を直接コピーせず、必ず自分の言葉で再構成する
- NotebookLMの画像生成には数分かかるため、ユーザーに「画像生成中で数分かかります」と伝えてから待機すること
- **URLを捏造・推測して参考資料に記載することは厳禁**。必ず `read_url_content` で実在確認する
- `search_web` が返すURLは一時的リダイレクト（`vertexaisearch.cloud.google.com`）の可能性が高い。記事には使用しない
