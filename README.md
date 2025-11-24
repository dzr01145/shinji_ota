# Shinji Ota Portfolio

クリエイティブ開発者 Shinji Ota のポートフォリオサイトです。Gemini AI を活用したインタラクティブなポートフォリオ体験を提供します。

## 特徴

- 🎨 モダンでレスポンシブなデザイン
- 🤖 Gemini AI 搭載のチャット機能
- ⚡ React + TypeScript + Vite による高速な開発体験
- 🎭 スムーズなスクロールアニメーション
- 📱 モバイルフレンドリーな UI

## 技術スタック

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (アイコン)
- Google Gemini AI

## セットアップ

### 前提条件

- Node.js (v18 以上推奨)
- Gemini API キー ([Google AI Studio](https://makersuite.google.com/app/apikey) で取得)

### インストール

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/yourusername/shinji_ota.git
   cd shinji_ota
   ```

2. 依存関係をインストール:
   ```bash
   npm install
   ```

3. 環境変数を設定:
   ```bash
   cp .env.local.example .env.local
   ```

   `.env.local` を開いて、Gemini API キーを設定:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

5. ブラウザで http://localhost:5173 を開く

## ビルド

本番環境用にビルド:
```bash
npm run build
```

ビルドしたアプリをプレビュー:
```bash
npm run preview
```

## デプロイ

### GitHub Pages

このリポジトリは GitHub Actions を使用して自動的に GitHub Pages にデプロイされます。

カスタムドメイン: https://shinji-ota.com

#### デプロイ方法

main ブランチにプッシュすると、自動的にビルド＆デプロイされます:

```bash
git push origin main
```

GitHub Actions が自動的に：
1. 依存関係をインストール
2. プロジェクトをビルド
3. gh-pages ブランチにデプロイ

を実行します。

カスタムドメインは `public/CNAME` ファイルで設定されています。

### Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

#### Renderでのデプロイ手順

1. https://render.com にアクセスしてGitHubで連携
2. **New Static Site** をクリック
3. このリポジトリ（`dzr01145/shinji_ota`）を選択
4. 設定を入力：
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. **Environment Variables** で `GEMINI_API_KEY` を追加
6. **Create Static Site** をクリック

#### パスワード保護の設定（Renderの場合）

Renderでパスワード保護を有効にする：
1. デプロイ後、サイトの Settings > Headers & Redirects に移動
2. Basic Auth を有効化（有料プランの機能）

または、`render.yaml` を使用して自動設定（リポジトリに含まれています）。

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dzr01145/shinji_ota)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dzr01145/shinji_ota)

環境変数 `GEMINI_API_KEY` を設定することを忘れずに。

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## お問い合わせ

ポートフォリオサイト内のコンタクトフォーム、または AI チャットでお気軽にお問い合わせください。
