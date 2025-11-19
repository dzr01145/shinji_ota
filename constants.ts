import { Project, Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: "SHINJI OTA",
  jaName: "太田 真治",
  title: "Creative Technologist",
  tagline: "コードとAIで、未来を実装する。",
  about: "東京を拠点に活動するフルスタックエンジニア。Next.js、WebGL、そして生成AI技術を駆使し、クリエイティブなデザインと堅牢なシステム実装を融合させたデジタル体験を創造します。直感的なUI/UXとスケーラブルなアーキテクチャの両立を追求しています。",
  email: "shinji.ota@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com"
};

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 98, icon: "⚛️", category: "Frontend", description: "App Router, SSR/RSCを活用した最新のアーキテクチャ設計" },
  { name: "TypeScript", level: 95, icon: "📘", category: "Frontend", description: "型安全性を重視した大規模アプリケーション開発" },
  { name: "Three.js / WebGL", level: 85, icon: "🧊", category: "Frontend", description: "シェーダー(GLSL)を用いた没入型3D表現" },
  { name: "Node.js / Hono", level: 90, icon: "🟢", category: "Backend", description: "エッジコンピューティングを意識した高速API構築" },
  { name: "Python / AI Agents", level: 88, icon: "🧠", category: "Backend", description: "LangChain等を用いた自律型AIエージェント開発" },
  { name: "Gemini API", level: 95, icon: "✨", category: "AI", description: "マルチモーダルモデルを活用した次世代UXの実装" },
  { name: "Cloud Architecture", level: 80, icon: "☁️", category: "Tools", description: "AWS/GCPを用いたスケーラブルなインフラ構築" },
  { name: "UI/UX Design", level: 85, icon: "🎨", category: "Tools", description: "Figmaを用いたプロトタイピングとデザインシステム運用" },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aether Architect",
    description: "Gemini 2.5 Flashを活用したAIアーキテクチャ設計ツール。自然言語からクラウドインフラ図とTerraformコードを即座に生成・視覚化します。",
    technologies: ["Next.js", "Gemini API", "React Flow", "AWS CDK"],
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    demoUrl: "#",
    repoUrl: "#",
    category: "AI/ML"
  },
  {
    id: 2,
    title: "Neon Pulse",
    description: "Web Audio APIとWebGLを融合させた没入型音楽ビジュアライザー。楽曲の周波数に合わせてパーティクルシステムがリアルタイムに反応します。",
    technologies: ["Three.js", "GLSL", "React", "Web Audio API"],
    imageUrl: "https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "#",
    repoUrl: "#",
    category: "Creative"
  },
  {
    id: 3,
    title: "DeFi Sentinel",
    description: "AI駆動型のブロックチェーン分析プラットフォーム。スマートコントラクトの脆弱性をリアルタイムで検知し、リスクスコアを算出。",
    technologies: ["TypeScript", "Solidity", "Python", "OpenAI"],
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop",
    demoUrl: "#",
    repoUrl: "#",
    category: "Blockchain"
  },
  {
    id: 4,
    title: "Smart City Dashboard",
    description: "都市のIoTセンサーデータをリアルタイムで可視化するダッシュボード。MapboxとWebSocketを使用し、交通流やエネルギー消費をモニタリング。",
    technologies: ["Vue.js", "Mapbox", "WebSocket", "Go"],
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    demoUrl: "#",
    repoUrl: "#",
    category: "Web/App"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Future Tech Labs",
    role: "リードエンジニア",
    period: "2022 - 現在",
    description: "AI活用型SaaSプロダクトの技術選定とアーキテクチャ設計を主導。開発効率を最大化するためのDevOpsパイプライン構築や、若手エンジニアのメンタリングも担当。"
  },
  {
    company: "Global Design Inc.",
    role: "フロントエンドスペシャリスト",
    period: "2020 - 2022",
    description: "大手クライアントのブランドサイト構築を担当。WebGLを用いたリッチな表現と、Core Web Vitalsを意識したパフォーマンスチューニングを両立し、CVR向上に貢献。"
  }
];