import { Project, Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: "太田 真治",
  enName: "SHINJI OTA",
  title: "Next-Gen Full Stack Developer",
  tagline: "コードで描き、AIで命を吹き込む。",
  about: "東京を拠点に活動するフルスタックエンジニア、太田真治。最新のWeb技術と生成AIを融合させ、単なる「機能」ではなく「体験」を創造します。複雑な課題をシンプルかつ美しいコードで解決することに情熱を注いでいます。",
  email: "shinji.ota@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com"
};

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 98, icon: "⚛️", category: "Frontend" },
  { name: "TypeScript", level: 95, icon: "📘", category: "Frontend" },
  { name: "Three.js / WebGL", level: 80, icon: "🧊", category: "Frontend" },
  { name: "Node.js", level: 85, icon: "🟢", category: "Backend" },
  { name: "Python / AI Integration", level: 88, icon: "🧠", category: "Backend" },
  { name: "Gemini API", level: 92, icon: "✨", category: "AI" },
  { name: "Docker / K8s", level: 75, icon: "⚓", category: "Tools" },
  { name: "CI/CD Automation", level: 85, icon: "⚙️", category: "Tools" },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Architect",
    description: "Gemini 2.5 Flashを活用した次世代アーキテクチャ設計支援ツール。自然言語で要件を伝えると、最適なシステム構成図とIaCコードを即座に生成します。",
    technologies: ["Next.js", "Gemini API", "Mermaid.js", "Terraform"],
    imageUrl: "https://picsum.photos/800/600?random=10",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "Neural Beats",
    description: "Web Audio APIとAIを組み合わせたジェネレーティブ音楽プラットフォーム。ユーザーの感情に合わせてリアルタイムにビジュアルとサウンドトラックを生成。",
    technologies: ["React", "Tone.js", "WebGL", "Canvas API"],
    imageUrl: "https://picsum.photos/800/600?random=11",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "Crypto Sentinel",
    description: "分散型金融(DeFi)のための高度な分析ダッシュボード。オンチェーンデータをリアルタイムで解析し、異常検知アルゴリズムによりリスクを可視化。",
    technologies: ["TypeScript", "Ethers.js", "D3.js", "GraphQL"],
    imageUrl: "https://picsum.photos/800/600?random=12",
    demoUrl: "#",
    repoUrl: "#"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Future Tech Labs",
    role: "Lead Product Engineer",
    period: "2022 - Present",
    description: "AI駆動型SaaSプロダクトの開発をリード。マイクロサービスアーキテクチャへの移行を指揮し、デプロイ頻度を300%向上させることに成功。"
  },
  {
    company: "Creative Studios Tokyo",
    role: "Frontend Developer",
    period: "2019 - 2022",
    description: "アワード受賞歴のあるキャンペーンサイトや、没入感のあるWebGL体験の実装を担当。デザイナーと密接に連携し、UI/UXの限界に挑戦。"
  }
];