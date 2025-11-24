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

#### 初回セットアップ

1. GitHubリポジトリの Settings > Pages に移動
2. **Source** を「GitHub Actions」に変更
3. Settings > Secrets and variables > Actions に移動
4. **New repository secret** をクリック
5. 名前: `GEMINI_API_KEY`、値: あなたのGemini APIキー を入力して保存

#### デプロイ

main/master ブランチにプッシュすると、自動的にビルド＆デプロイされます:

```bash
git push origin main
```

手動でデプロイする場合は、GitHubの Actions タブから「Deploy to GitHub Pages」ワークフローを手動実行できます。

カスタムドメインを使用する場合は、`public/CNAME` ファイルにドメイン名を記載してください（すでに `shinji-ota.com` が設定済み）。

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/shinji_ota)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/shinji_ota)

環境変数 `GEMINI_API_KEY` を設定することを忘れずに。

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## お問い合わせ

ポートフォリオサイト内のコンタクトフォーム、または AI チャットでお気軽にお問い合わせください。
