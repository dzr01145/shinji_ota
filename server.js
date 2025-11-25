import express from 'express';
import basicAuth from 'basic-auth';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Basic認証ミドルウェア
const auth = (req, res, next) => {
    const user = basicAuth(req);
    const envUser = process.env.VITE_AUTH_USER || 'admin';
    const envPass = process.env.VITE_AUTH_PASSWORD || '123';

    if (!user || user.name !== envUser || user.pass !== envPass) {
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
        return res.status(401).send('Authentication required.');
    }
    next();
};

// 全リクエストに認証を適用
app.use(auth);

// 外部サービスへのリダイレクト設定
// shinji-ota.com/chat -> safety-chatbot.onrender.com
app.get('/chat', (req, res) => {
    res.redirect('https://safety-chatbot.onrender.com');
});

// 静的ファイル（ビルド成果物）の配信
app.use(express.static(path.join(__dirname, 'dist')));

// SPA対応：すべてのルートでindex.htmlを返す
// 正規表現を使うことで path-to-regexp のバージョン依存問題を回避
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
