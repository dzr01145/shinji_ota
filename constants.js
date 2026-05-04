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

export const PERSONAL_PROFILE_DEEP = {
  headline: "現場のリアルを、経営の意思決定へ接続する",
  subhead: "労働安全衛生 / 鉱山保安 / PL・リコールを横断するリスクエンジニア",
  lead: "鉱業・採石業の現場経験を基盤に、国内外の製造業・運送業・鉱業、団体、官公庁へ労働災害防止のコンサルティングを提供。安全を「理念」ではなく、組織で回る仕組みとして実装します。",
  leadEn: "Built on field experience in mining and quarrying, he provides occupational accident prevention consulting for manufacturers, logistics operators, mining companies, public bodies, and government agencies in Japan and overseas. He implements safety not as an abstract ideal, but as a system that organizations can operate.",
  education: "工学系大学院 資源開発工学専攻 修了",
  educationEn: "Completed a graduate program in resource development engineering.",
  currentRole: {
    organization: "SOMPOリスクマネジメント株式会社",
    organizationEn: "SOMPO Risk Management Inc.",
    department: "カジュアルティコンサルティング部",
    departmentEn: "Casualty Consulting Department",
    position: "担当部長 兼 賠償・労災グループリーダー",
    positionEn: "Senior Manager and Leader of the Liability and Workers' Compensation Group",
    since: "2009年入社"
  },
  previousRole: {
    organization: "鉱業・採石業の現場経験",
    organizationEn: "Field experience in mining and quarrying",
    description: "鉱業・採石業における実務を経験し、鉱山保安と現場安全の専門性の基盤を形成。"
  },
  credentials: [
    "技術士（総合技術監理・資源工学）",
    "労働安全コンサルタント（土木）",
    "危険物取扱者 甲種"
  ],
  specialties: [
    "労働安全衛生",
    "リスクマネジメント",
    "ISO 45001 / OSHMS",
    "鉱山保安",
    "PL・リコール対応",
    "安全文化醸成",
    "安全DX / AI活用"
  ],
  metrics: [
    { value: "2009", label: "SOMPO入社" },
    { value: "3", label: "主要資格" },
    { value: "官公庁", label: "調査・制度設計" },
    { value: "国内外", label: "企業支援" }
  ],
  positioning: [
    {
      title: "現場起点",
      titleEn: "Field-based perspective",
      body: "鉱業・採石業の実務経験をもとに、作業者の判断、設備、手順、教育が噛み合う安全対策へ落とし込む。",
      bodyEn: "Translates practical mining and quarrying experience into safety measures where decisions, equipment, procedures, and training work together."
    },
    {
      title: "制度設計",
      titleEn: "Governance design",
      body: "ISO 45001、マネジメントシステム、法令改正調査、災害防止計画などを、運用可能な仕組みに整える。",
      bodyEn: "Shapes ISO 45001, management systems, regulatory studies, and disaster prevention plans into workable operating structures."
    },
    {
      title: "経営翻訳",
      titleEn: "Executive translation",
      body: "現場のリスクを経営層の意思決定、投資判断、組織運営に接続できる言葉と構造に変換する。",
      bodyEn: "Converts operational risk into language and structure that support executive decisions, investment judgment, and organizational management."
    }
  ],
  timeline: [
    {
      year: "Academic",
      title: "資源開発工学",
      titleEn: "Resource development engineering",
      body: "資源工学を軸に、鉱山・採石・エネルギー産業の技術的基盤を形成。",
      bodyEn: "Built a technical foundation in mining, quarrying, and energy industries through resource engineering."
    },
    {
      year: "Field",
      title: "鉱業・採石業の現場",
      titleEn: "Mining and quarrying field operations",
      body: "鉱業・採石業の現場で実務を経験。鉱山保安、設備、作業リスクへの感度を磨く。",
      bodyEn: "Gained hands-on field experience and developed sensitivity to mine safety, equipment, and operational risk."
    },
    {
      year: "2009",
      title: "SOMPOリスクマネジメント株式会社 入社",
      titleEn: "Joined SOMPO Risk Management Inc.",
      body: "製造業、運送業、鉱業など、国内外の企業・団体・官公庁に対して労働災害防止コンサルティングを提供。",
      bodyEn: "Provides occupational accident prevention consulting for manufacturers, logistics companies, mining operators, public bodies, and government agencies."
    },
    {
      year: "Current",
      title: "カジュアルティ領域を統括",
      titleEn: "Leads the casualty consulting domain",
      body: "労働安全衛生に加え、PL・リコールを含むコンサルティング領域を統括。",
      bodyEn: "Oversees consulting domains including occupational safety and health, product liability, and recall risk."
    }
  ],
  domains: [
    {
      title: "労働安全衛生",
      titleEn: "Occupational safety and health",
      body: "現場の安全管理から経営層向けマネジメントまで、労働災害防止の実効性を高める支援。",
      bodyEn: "Supports effective accident prevention from site-level safety control to management-level governance."
    },
    {
      title: "マネジメントシステム",
      titleEn: "Management systems",
      body: "ISO 45001 / OSHMS の構築、有効化、認証取得、運用改善に関する支援。",
      bodyEn: "Supports ISO 45001 and OSHMS development, activation, certification, and continuous operational improvement."
    },
    {
      title: "鉱山保安",
      titleEn: "Mine safety",
      body: "鉱業特有の危険性を踏まえた安全対策、リスク評価、災害防止計画の検討。",
      bodyEn: "Examines safety measures, risk assessment, and disaster prevention planning based on mining-specific hazards."
    },
    {
      title: "PL・リコール対応",
      titleEn: "Product liability and recall response",
      body: "製品事故やリコールの未然防止、発生時対応、企業リスク軽減に向けた体制づくり。",
      bodyEn: "Builds systems to prevent product incidents and recalls, respond appropriately, and reduce corporate risk."
    }
  ],
  achievements: [
    {
      title: "経済産業省関連の保安対策調査",
      titleEn: "Safety policy research for METI-related projects",
      body: "石油・ガス供給等に係る保安対策調査等事業において、マネジメントシステムの構築・有効化、制度設計、関係法令の改正・執行に関連する調査、災害防止計画策定支援などに従事。",
      bodyEn: "Worked on management-system design, system activation, regulatory research, enforcement studies, and disaster prevention planning for oil and gas safety projects."
    },
    {
      title: "経済産業省 鉱山等安全対策検討委員会",
      titleEn: "METI committee on mine safety measures",
      body: "委員として鉱山業界全体の安全水準向上と、国の安全対策策定に貢献。",
      bodyEn: "Contributes to improving industry-wide mine safety standards and shaping national safety measures as a committee member."
    },
    {
      title: "PCB処理事業のトラブル検証支援",
      titleEn: "Trouble verification support for PCB treatment operations",
      body: "環境安全事業会社に対し、トラブル等のリスク評価、安全管理体制の検証、現地調査などを支援。",
      bodyEn: "Supported risk assessment, safety management review, and on-site verification for incidents and operational trouble."
    },
    {
      title: "中間貯蔵事業に関する安全管理支援",
      titleEn: "Safety management support for interim storage operations",
      body: "福島県内の除染で発生した除去土壌等を安全かつ集中的に管理・保管する中間貯蔵事業の事業特性を踏まえ、安全管理・リスク評価に対応。",
      bodyEn: "Addressed safety management and risk assessment for interim storage operations that safely and centrally manage removed soil and related materials from decontamination work in Fukushima."
    },
    {
      title: "シルバー人材センター安全就業実態調査",
      titleEn: "Safe work survey for Silver Human Resources Centers",
      body: "安全就業に関する調査事業として、事故分析、現地調査、ガイドブック作成などを実施。",
      bodyEn: "Conducted accident analysis, field surveys, and guidebook development for safe work practices."
    }
  ],
  publications: [
    {
      title: "安全文化の再構築と行動災害リスク低減のDX戦略",
      titleEn: "DX strategy for rebuilding safety culture and reducing behavior-based accident risk",
      meta: "生成AIによる暗黙知の継承とデータ駆動型組織への転換",
      metaEn: "Transferring tacit knowledge through generative AI and shifting toward data-driven organizations",
      url: "https://image.sompo-rc.co.jp/reports/r282.pdf"
    },
    {
      title: "第14次労働災害防止計画の推進について",
      titleEn: "Promoting Japan's 14th Industrial Accident Prevention Plan",
      meta: "計画が目指す社会と事業者が取り組むべき視点",
      metaEn: "The society envisioned by the plan and the perspectives businesses should adopt",
      url: "https://image.sompo-rc.co.jp/reports/r242.pdf"
    },
    {
      title: "ISO 45001の構築と認証取得までの留意点",
      titleEn: "Key points for building ISO 45001 and obtaining certification",
      meta: "労働安全衛生レベルの維持および継続的な向上",
      metaEn: "Maintaining and continuously improving occupational safety and health performance",
      url: "https://www.sompo-rc.co.jp/columns/view/11"
    }
  ],
  sourceLinks: [
    {
      label: "SOMPO公式プロフィール",
      url: "https://www.sompo-rc.co.jp/authors/view/196"
    },
    {
      label: "コンサルタント一覧",
      url: "https://www.sompo-rc.co.jp/authors"
    }
  ]
};
