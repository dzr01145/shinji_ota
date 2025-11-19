import { Project, Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: "太田 真治",
  title: "Creative Full-Stack Developer",
  tagline: "デジタルとアートの融合。革新的なWeb体験を創造する。",
  about: "東京を拠点とするフルスタックエンジニア。React、TypeScript、そしてAI統合技術を専門としています。直感的で美しいUI/UXデザインと高パフォーマンスなWebアプリケーションの実装に情熱を注ぎ、常に最新技術を探求しています。",
  email: "shinji.ota@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com"
};

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, icon: "⚛️", category: "Frontend" },
  { name: "TypeScript", level: 90, icon: "📘", category: "Frontend" },
  { name: "Tailwind CSS", level: 95, icon: "🎨", category: "Frontend" },
  { name: "Node.js", level: 85, icon: "🟢", category: "Backend" },
  { name: "Python / FastAPI", level: 75, icon: "🐍", category: "Backend" },
  { name: "Gemini API", level: 90, icon: "✨", category: "AI" },
  { name: "Docker", level: 70, icon: "🐳", category: "Tools" },
  { name: "Git", level: 90, icon: "📦", category: "Tools" },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Travel Planner",
    description: "Gemini 2.5 Flashを活用した旅行プラン生成アプリ。予算と好みに基づいて最適な旅程を即座に提案します。",
    technologies: ["React", "Gemini API", "Google Maps", "Tailwind"],
    imageUrl: "https://picsum.photos/800/600?random=1",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "Crypto Dashboard",
    description: "リアルタイムの暗号資産追跡ダッシュボード。D3.jsによるインタラクティブなチャートとWebSocket通信を実装。",
    technologies: ["Next.js", "TypeScript", "D3.js", "WebSocket"],
    imageUrl: "https://picsum.photos/800/600?random=2",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    description: "Three.jsを使用した3D要素とスクロールアニメーションを特徴とする、高コンバージョンなSaaS製品ランディングページ。",
    technologies: ["React", "Three.js", "Framer Motion"],
    imageUrl: "https://picsum.photos/800/600?random=3",
    demoUrl: "#",
    repoUrl: "#"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Tech Innovators Inc.",
    role: "シニアフロントエンドエンジニア",
    period: "2021 - 現在",
    description: "フロントエンドチームのリードとして、レガシーコードのReact 18への移行とデザインシステムの構築を主導。"
  },
  {
    company: "Digital Solutions Ltd.",
    role: "Webデベロッパー",
    period: "2018 - 2021",
    description: "モダンなJavaScriptフレームワークを使用し、レスポンシブなWebサイトとEコマースプラットフォームを開発。"
  }
];