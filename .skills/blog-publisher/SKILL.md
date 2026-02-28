---
name: blog-publisher
description: >
  【サブエージェント専用】ブログ記事データを受け取り、SupabaseとNotebookLMに
  並行保存するサブスキル。shinji-blog-generatorの親エージェントからTaskツール
  経由で呼び出される専用ワーカー。ユーザーから直接呼び出されることはない。
---

# blog-publisher — 投稿サブエージェント

**役割**: 記事データを受け取り、以下の2つを確実に実行して結果を返す純粋なワーカー。
ユーザーとのやり取りは一切行わない。

## 受け取るデータ形式

呼び出し元（親エージェント）から以下の形式でデータが渡される：

```
=== 記事データ ===
タイトル: ...
カテゴリ: ...
タグ: ...
画像URL: ...（なし の場合はNULL）
投稿日: YYYY-MM-DD
本文:
---
（マークダウン本文）
---
```

## タスク1: Supabaseに投稿

`mcp__6a6eedd0-18de-443f-b580-dc98421230ab__execute_sql` を使って投稿する。

**Project ID**: `oztfdwbvlarpegozqepn`

```sql
INSERT INTO public.blog_posts (title, body, category, image_url, tags, published)
VALUES (
  '（タイトル）',
  '（本文全文）',
  '（カテゴリ）',
  （image_urlがあれば '...' 、なければ NULL）,
  ARRAY['タグ1', 'タグ2', 'タグ3'],
  true
)
RETURNING id, title, created_at;
```

**重要**: 本文・タイトル中のシングルクォート `'` は必ず `''` にエスケープする。

## タスク2: NotebookLMに保存

Supabase成功後、`mcp__notebooklm-mcp__source_add` を使って保存する。

- **notebook_id**: `c5f67b8a-625d-473c-ad8d-36141d665fbf`
- **source_type**: `text`
- **title**: `（記事タイトル） [YYYY-MM-DD]`
- **text**: 以下のフォーマットで渡す

```markdown
# （記事タイトル）

**カテゴリ**: （カテゴリ）
**タグ**: （タグ一覧）
**投稿日**: YYYY-MM-DD
**著者**: 太田 真治 / Shinji Ota
**URL**: https://www.shinji-ota.com/blog

---

（本文全文をマークダウンそのまま）
```

## エラーハンドリング

- **Supabase失敗**: エラー内容を記録し、SQLエスケープを確認して1回再試行。
  再試行も失敗なら `SUPABASE_FAILED` として結果に含める。
- **NotebookLM失敗**: Supabase投稿は完了しているのでエラーはワーニング扱い。
  `NOTEBOOKLM_FAILED` として結果に含め、処理を終了する。

## 完了報告形式

全タスク完了後、必ず以下の形式で結果を返す（親エージェントが解析するため形式を守ること）：

```
PUBLISH_RESULT:
  supabase_id: （記事ID、失敗時は FAILED）
  supabase_created_at: （作成日時、失敗時は FAILED）
  notebooklm_status: SUCCESS または FAILED
  notebooklm_note: （失敗時のエラー概要、成功時は空）
```
