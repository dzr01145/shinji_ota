

import { Project, Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: "SHINJI OTA",
  jaName: "太田 真治",
  title: "Principal Consultant / Risk Engineer",
  tagline: "現場と経営をつなぐ、「安全文化の翻訳者」。",
  about: "SOMPOリスクマネジメントにてグループリーダーを務める労働安全のスペシャリスト。鉱山保安のバックグラウンドを持ち、技術士（総合技術監理・衛生工学）として国内外の現場を支援。「事例→リスク抽出→PDCA」の論理的アプローチにより、確実なリスク低減と組織の安全文化醸成をデザインする。",
  email: "shinji.ota@example.com",
  github: "#",
  linkedin: "#",
  twitter: "#"
};

export const SKILLS: Skill[] = [
  { name: "Safety Consulting", level: 98, icon: "🛡️", category: "Engineering", description: "労働安全コンサルタント（土木）として、現場の潜在リスクを特定し改善へ導く" },
  { name: "Risk Management", level: 95, icon: "⚖️", category: "Management", description: "ISO 45001に基づいたマネジメントシステム構築と運用支援" },
  { name: "Technical P.E.Jp", level: 100, icon: "🇯🇵", category: "Engineering", description: "技術士（総合技術監理・衛生工学）。複合的な課題に対する技術的最適解の提示" },
  { name: "Mining Safety", level: 90, icon: "⛏️", category: "Engineering", description: "鉱山保安の専門知見を活かした、特殊環境下での安全対策立案" },
  { name: "Safety DX / AI", level: 85, icon: "🤖", category: "DX / AI", description: "第14次労働災害防止計画でも提言した、AI・VR・データ活用による安全管理の高度化" },
  { name: "Crisis Response", level: 92, icon: "🚨", category: "Crisis Mgmt", description: "PL／リコール対応や事故調査など、有事の際の迅速かつ論理的なトラブルシューティング" },
  { name: "Technical Writing", level: 88, icon: "✍️", category: "Management", description: "専門用語を現場と経営層それぞれの言語に翻訳する「利害調整型」ドキュメンテーション" },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Safety DX Strategy",
    description: "「第14次労働災害防止計画」に向けたDX推進プロジェクト。AIによる不安全行動の検知やVR訓練の導入を提言し、行政計画と現場運用の橋渡し役を担う。",
    technologies: ["Safety DX", "AI Analysis", "VR Training", "Policy Making"],
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
    demoUrl: "#",
    category: "Safety DX"
  },
  {
    id: 2,
    title: "Global Mining Consulting",
    description: "海外鉱山および国内製造業に対する労働安全コンサルティング。現場特有の「不安全バイアス」を分析し、鉱山保安の知見を応用した堅牢な安全規定を策定。",
    technologies: ["Mining Safety", "Risk Assessment", "Global Std", "Audit"],
    imageUrl: "https://images.unsplash.com/photo-1616328835543-b221602384c2?q=80&w=2070&auto=format&fit=crop",
    category: "Consulting"
  },
  {
    id: 3,
    title: "Social Safety Net Research",
    description: "シルバー人材センター向け安全就業実態調査。高齢就業者の身体機能低下と作業リスクの相関をデータ分析し、持続可能な就業環境のためのガイドラインを作成。",
    technologies: ["Data Analysis", "Social Research", "Guideline", "Elderly Care"],
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop",
    category: "Research"
  },
  {
    id: 4,
    title: "Critical Incident Verification",
    description: "PCB処理施設におけるトラブル検証および再発防止策の策定。化学的・工学的知見に基づき事故原因を特定し、ステークホルダー間の合意形成を主導。",
    technologies: ["Root Cause Analysis", "Crisis Mgmt", "Chemical Eng", "Negotiation"],
    imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop",
    category: "Crisis Mgmt"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "SOMPO Risk Management",
    role: "Group Leader / Senior Consultant",
    period: "Current",
    description: "リスクエンジニアリング部・賠償／労災グループ。国内外の製造・運送・鉱業に対し、技術士・労働安全コンサルタントの立場から安全文化醸成を支援。"
  },
  {
    company: "Strategic Safety Initiatives",
    role: "Technical Advisor",
    period: "Project Based",
    description: "関係官庁や企業経営層への講演活動、産業保健領域の論考執筆、ガイドライン策定など、政策と現場をつなぐアドバイザリー業務に従事。"
  },
  {
    company: "Mining & Industrial Sector",
    role: "Field Engineer",
    period: "Previous",
    description: "鉱山保安およびプラントエンジニアリングの現場にて、危険物取扱や設備保全の実務を経験。現在の「現場重視」のコンサルティングスタイルの原点。"
  }
];
