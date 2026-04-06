/**
 * サイト全体で使用する定数定義 (バニラ JS 版)
 */

export const PERSONAL_INFO = {
  name: "SHINJI OTA",
  jaName: "太田 真治",
  title: "Principal Consultant / Risk Engineer",
  tagline: "現場の『リアル』と経営戦略のシンクロナイザー",
  about: "労働安全のスペシャリスト。鉱山保安のバックグラウンドを持ち、技術士（総合技術監理・資源工学）として国内外の現場を支援。「事例→リスク抽出→PDCA」の論理的アプローチにより、確実なリスク低減と組織の安全文化醸成をデザインする。",
  email: "dzr01145@gmail.com",
  github: "#",
  linkedin: "#",
  twitter: "#"
};

export const SKILLS = [
  { name: "ISO 45001 / OSHMS", nameJa: "労働安全マネジメント", level: 98, icon: "🛡️", category: "Safety Mgmt", description: "ISO 45001に基づいた労働安全衛生マネジメントシステムの構築と運用支援" },
  { name: "Risk Assessment", nameJa: "リスクアセスメント", level: 95, icon: "⚖️", category: "Safety Mgmt", description: "現場の潜在リスクを特定し、本質的安全化へ導くリスクアセスメントとKYT" },
  { name: "Safety Culture", nameJa: "安全文化醸成", level: 90, icon: "🤝", category: "Safety Mgmt", description: "経営層と現場をつなぎ、組織全体で安全意識を高める文化醸成" },
  { name: "Technical P.E.Jp", nameJa: "技術士 (総合技術監理)", level: 100, icon: "🇯🇵", category: "Engineering", description: "技術士（総合技術監理・資源工学）。複合的な課題に対する技術的最適解の提示" },
  { name: "Mining Safety", nameJa: "鉱山保安", level: 92, icon: "⛏️", category: "Engineering", description: "鉱山保安の専門知見を活かした、特殊環境下での安全対策立案" },
  { name: "Plant Engineering", nameJa: "プラントエンジニアリング", level: 85, icon: "🏭", category: "Engineering", description: "重機オペレーションやプラント設備管理の実務経験に基づく現場指導" },
  { name: "Data Analysis", nameJa: "データ分析", level: 88, icon: "📊", category: "DX & Analysis", description: "事故データやヒヤリハットの統計分析による傾向把握と対策立案" },
  { name: "Generative AI", nameJa: "生成AI活用", level: 85, icon: "🤖", category: "DX & Analysis", description: "ChatGPT等を活用した安全教育コンテンツ作成や業務効率化" },
  { name: "Technical Writing", nameJa: "技術文書作成", level: 95, icon: "✍️", category: "Consulting", description: "専門用語を現場と経営層それぞれの言語に翻訳する「利害調整型」ドキュメンテーション" },
  { name: "Facilitation", nameJa: "ファシリテーション", level: 90, icon: "🗣️", category: "Consulting", description: "多様なステークホルダー間の合意形成を主導するファシリテーション" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Safety DX Strategy",
    titleJa: "安全DX戦略策定",
    description: "「第14次労働災害防止計画」を見据えたDX推進支援。AIカメラによる不安全行動検知や、VRを活用した危険体感教育の導入を支援し、現場の安全行動定着を促進。",
    technologies: ["Safety DX", "AI Analysis", "VR Training", "Policy Making"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    demoUrl: "#",
    category: "Safety DX"
  },
  {
    id: 2,
    title: "Mining Safety Consulting",
    titleJa: "鉱山保安コンサルティング",
    description: "国内鉱山および製造業に対する労働安全コンサルティング。現場特有の「不安全バイアス」を分析し、鉱山保安法やISO45001に基づいた堅牢な安全規定を策定。",
    technologies: ["Mining Safety", "Risk Assessment", "ISO 45001", "Audit"],
    imageUrl: "/images/mining-safety-final.jpg",
    category: "Consulting"
  },
  {
    id: 3,
    title: "Aging Workforce Safety Research",
    titleJa: "高齢者就業安全リサーチ",
    description: "シルバー人材センター向け安全就業実態調査。高齢就業者の身体機能低下と作業リスクの相関をデータ分析し、持続可能な就業環境のためのガイドラインを作成。",
    technologies: ["Data Analysis", "Social Research", "Guideline", "Elderly Care"],
    imageUrl: "/images/aging_workforce_bg.png",
    category: "Research"
  },
  {
    id: 4,
    title: "Critical Incident Verification",
    titleJa: "重大事故検証・再発防止",
    description: "PCB処理施設におけるトラブル検証および再発防止策の策定。化学的・工学的知見に基づき事故原因を特定し、ステークホルダー間の合意形成を主導。",
    technologies: ["Root Cause Analysis", "Crisis Mgmt", "Chemical Eng", "Negotiation"],
    imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop",
    category: "Crisis Mgmt"
  }
];

export const EXPERIENCE = [
  {
    company: "Risk Management Firm",
    role: "シニアコンサルタント",
    roleEn: "Senior Consultant",
    period: "Current",
    description: "国内外の製造・運送・鉱業に対し、技術士・労働安全コンサルタントの立場から安全文化醸成を支援。"
  },
  {
    company: "Strategic Safety Initiatives",
    role: "技術顧問",
    roleEn: "Technical Advisor",
    period: "Project Based",
    description: "関係官庁や企業経営層への講演活動、産業保健領域の論考執筆、ガイドライン策定など、政策と現場をつなぐアドバイザリー業務に従事。"
  },
  {
    company: "Mining & Industrial Sector",
    role: "フィールドエンジニア",
    roleEn: "Field Engineer",
    period: "Previous",
    description: "鉱山保安およびプラントエンジニアリングの現場にて、危険物取扱や設備保全の実務を経験。現在の「現場重視」のコンサルティングスタイルの原点。"
  }
];
