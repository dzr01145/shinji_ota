import React from 'react';
import {
    Bot,
    Shield,
    AlertTriangle,
    Camera,
    Search,
    ExternalLink,
    CheckCircle2,
    Scale,
    ClipboardCheck,
    MessageSquare,
    Calendar,
    FileSpreadsheet,
    Brain,
    Newspaper,
    Languages
} from 'lucide-react';

const AIPlayground: React.FC = () => {
    const sectionNav = [
        { href: '#ai-tools-top', label: 'Top', ja: 'トップ' },
        { href: '#portal', label: 'Portal', ja: 'ポータル' },
        { href: '#ai-chat', label: 'Chat', ja: '専門AI' },
        { href: '#risk-assessment', label: 'Risk', ja: '安全管理' },
        { href: '#management-system', label: 'PDCA', ja: 'MS・PDCA' },
        { href: '#knowledge-support', label: 'Knowledge', ja: 'ナレッジ' }
    ];

    return (
        <main className="min-h-screen bg-[#07080a] text-zinc-200 antialiased">
            <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 md:block" aria-label="AI tools section navigation">
                <div className="relative py-2">
                    <div className="absolute left-[5px] top-0 h-full w-px bg-white/22 transition-colors hover:bg-cyan-300/45" />
                    <div className="relative flex flex-col gap-5">
                        {sectionNav.map((item) => (
                            <a key={item.href} href={item.href} className="group flex items-center gap-3 focus-visible:outline-none">
                                <span className="h-[11px] w-[11px] rounded-full border border-white/45 bg-[#07080a] transition-all group-hover:border-cyan-300 group-hover:bg-cyan-300 group-hover:shadow-[0_0_0_4px_rgba(103,232,249,0.14)] group-focus-visible:border-cyan-300 group-focus-visible:bg-cyan-300" />
                                <span className="flex translate-x-0.5 flex-col whitespace-nowrap font-light text-zinc-300/85 opacity-85 transition-all group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:text-white group-focus-visible:opacity-100">
                                    <span className="text-[12px] tracking-[0.14em]">{item.ja}</span>
                                    <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-zinc-500/95 group-hover:text-cyan-300 group-focus-visible:text-cyan-300">{item.label}</span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:pl-40 lg:pl-44">
                <section id="ai-tools-top" className="scroll-mt-28 border-b border-white/10 pb-16">
                    <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                        <div>
                            <p className="text-[11px] font-light uppercase tracking-[0.48em] text-zinc-500">
                                Safety Solutions / AI Tools
                            </p>
                            <h1 className="mt-6 max-w-3xl text-4xl font-light leading-[1.18] tracking-tight text-white md:text-5xl">
                                現場の安全判断を、
                                <br />
                                使えるAIツールへ
                            </h1>
                            <p className="mt-5 max-w-2xl text-base font-light leading-8 text-zinc-400 md:text-lg">
                                労働安全衛生、リスクアセスメント、ナレッジ継承、翻訳支援を、実務で使いやすい形に整理したツール一覧です。
                            </p>
                        </div>
                        <div className="relative overflow-hidden border border-white/10 bg-black">
                            <img
                                src="/images/revise-control-room.png"
                                alt="AI tools control room"
                                className="aspect-[16/9] w-full object-cover opacity-88 brightness-[0.72] contrast-[0.92] saturate-[0.88]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/25 to-[#07080a]/72" />
                        </div>
                    </div>
                </section>

                {/* Featured Portal Section */}
                <section id="portal" className="scroll-mt-28 border-b border-white/10 py-20">
                    <div className="group relative overflow-hidden border border-white/10 bg-black transition-colors duration-500 hover:border-white/35">
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
                                alt="Office Collaboration"
                                className="h-full w-full object-cover opacity-55 brightness-[0.60] contrast-[0.94] saturate-[0.86] transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/94 via-[#07080a]/78 to-black/42" />
                        </div>

                        <div className="relative z-10 grid gap-10 p-6 md:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
                            <div>
                                <p className="text-[11px] font-light uppercase tracking-[0.42em] text-zinc-500">Featured Portal</p>
                                <h2 className="mt-5 text-3xl font-light tracking-tight text-white md:text-4xl">
                                    Your Safety Partner <span className="text-xl text-zinc-500">Mockup</span>
                                </h2>
                            </div>
                            <div>
                                <p className="max-w-2xl text-base font-light leading-8 text-zinc-300">
                                    安全衛生の総合プラットフォーム。AIツール、専門家ネットワーク、教育コンテンツへアクセスできます。
                                </p>

                                <div className="mt-8">
                                    <a
                                        href="https://safety-partner.onrender.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 border border-white/80 bg-white px-6 py-3 text-sm font-light text-zinc-950 transition-colors hover:bg-zinc-200"
                                    >
                                        ポータルサイトを開く <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1. Specialized AI Chat & Legal Consultation */}
                <section id="ai-chat" className="scroll-mt-28 border-b border-white/10 py-20">
                    <SectionHeading title="専門AIチャット・法令相談" subtitle="Specialized AI consultation" />
                    <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <ToolCard
                            icon={<Bot className="w-8 h-8 text-cyan-400" />}
                            title="労働安全衛生チャット"
                            description="労働安全衛生法や労災事例をAIが引用しながら回答。安全教育、活動など多くのシーンで活用できる専門チャットボットです。"
                            link="https://safety-chatbot.onrender.com/"
                            buttonText="アプリを開く"
                            imageUrl="/images/safety_chat_bg.png"
                        />
                        <ToolCard
                            icon={<Bot className="w-8 h-8 text-cyan-400" />}
                            title="労働安全衛生チャット＋"
                            description="1,974条文と2,622件の労災事例を網羅した強力なAIチャットボット。"
                            link="https://manus-chatbot.onrender.com"
                            buttonText="アプリを開く"
                            features={["法令完全網羅", "労災事例DB", "根拠引用回答"]}
                            imageUrl="/images/safety_chat_plus_bg.png"
                        />
                        <ToolCard
                            icon={<Scale className="w-8 h-8 text-cyan-400" />}
                            title="製品安全・PL／品質コンプライアンス相談チャット"
                            description="製造物責任、リコール対応、品質不正防止などに関連するリスクへのアドバイスを提供します。"
                            link="https://pl-chatbot.onrender.com/"
                            buttonText="アプリを開く"
                            features={["PL法・製品安全法対応", "リコール判断・決裁支援", "品質不正・改ざん予防"]}
                            imageUrl="/images/pl_compliance_bg.png"
                        />
                        <ToolCard
                            icon={<MessageSquare className="w-8 h-8 text-cyan-400" />}
                            title="サテライトAI チャット"
                            description="接続設定を行い、カスタマイズされたAIと会話ができるチャットツールです。"
                            link="https://sateraito-ai-chat.onrender.com/"
                            buttonText="チャットを始める"
                            features={["シンプルなチャットインターフェース", "接続設定によるカスタマイズ"]}
                            imageUrl="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&auto=format&fit=crop"
                        />
                    </div>
                </section>

                {/* 2. Safety Management & Risk Assessment */}
                <section id="risk-assessment" className="scroll-mt-28 border-b border-white/10 py-20">
                    <SectionHeading title="安全管理・リスクアセスメント" subtitle="Safety management and risk assessment" />
                    <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <ToolCard
                            icon={<Camera className="w-8 h-8 text-cyan-400" />}
                            title="安全パトロール支援"
                            description="現場写真からAIで危険源を自動抽出。パトロール日報作成まで一貫支援。"
                            link="https://rskrep-by-claude.onrender.com/"
                            buttonText="アプリを開く"
                            features={["AI画像解析", "日報自動作成", "クラウド共有"]}
                            imageUrl="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<Search className="w-8 h-8 text-cyan-400" />}
                            title="労働災害リスクファインダー"
                            description="現場写真やキーワードからプロレベルのリスク分析報告書をAIが自動生成。"
                            link="https://risk-report-tool.onrender.com/"
                            buttonText="アプリを開く"
                            features={["5段階リスク評価", "報告書自動生成", "PPTX出力"]}
                            badge="Recommended"
                            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<FileSpreadsheet className="w-8 h-8 text-cyan-400" />}
                            title="リスクアセスメント報告書作成システム"
                            description="現場の写真からリスクを洗い出し、3軸評価を行う報告書作成システムです。Excel形式での出力に対応。"
                            link="https://excel-risk-report.onrender.com/"
                            buttonText="システムを開く"
                            features={["現場写真からのリスク特定", "3軸評価（頻度・可能性・重大性）", "Excel形式での報告書生成"]}
                            imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<Shield className="w-8 h-8 text-cyan-400" />}
                            title="リスクアセスメント支援 (RA Compass)"
                            description="リスクアセスメントの洗い出しから残留リスク管理まで効率化。法令連動機能付き。"
                            link="https://ra-compass.onrender.com/"
                            buttonText="アプリを開く"
                            features={["法令連動リスク評価", "教育履歴管理", "導入サポート"]}
                            imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<FileSpreadsheet className="w-8 h-8 text-cyan-400" />}
                            title="リスクアセスメント ジェネレーター"
                            description="作業手順を入力すると、AIがハザード（危険源）を自動抽出。厚生労働省指針（3要素加算法）に基づいたリスクスコアを自動計算し、対策を提案します。"
                            link="https://ra-everything-claude-code.onrender.com/"
                            buttonText="アプリを開く"
                            features={["AIハザード自動抽出", "厚労省指針準拠(3要素加算法)", "PDF/Excel/JSON出力"]}
                            imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<AlertTriangle className="w-8 h-8 text-cyan-400" />}
                            title="KYT支援ボット"
                            description="作業内容から危険要因をAIが抽出。KYTシートやイラストを自動生成。"
                            link="https://ky-support.onrender.com/"
                            buttonText="アプリを開く"
                            features={["危険要因自動提示", "指差呼称生成", "シート自動作成"]}
                            imageUrl="/images/kyt_support_bg.png"
                        />
                    </div>
                </section>

                {/* 3. Management Systems & PDCA */}
                <section id="management-system" className="scroll-mt-28 border-b border-white/10 py-20">
                    <SectionHeading title="マネジメントシステム・PDCA" subtitle="Management system and PDCA" />
                    <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <ToolCard
                            icon={<ClipboardCheck className="w-8 h-8 text-cyan-400" />}
                            title="鉱山保安MS診断レポート"
                            description="「鉱山保安マネジメントシステム」手引書に基づく20の質問に答えて、現在の保安活動の導入・定着状況を確認。AIが改善レポートを作成します。"
                            link="https://web-survey-claude.onrender.com/"
                            buttonText="診断を開始する"
                            features={["導入段階の判定 (準備〜本格導入)", "5つのカテゴリ分析", "AI改善レポート作成"]}
                            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<Shield className="w-8 h-8 text-cyan-400" />}
                            title="AI鉱山保安マネジメントシステム"
                            description="災害・ヒヤリハット報告から、AIがリスクアセスメント案や改善対策を自動生成。年間計画の進捗管理から会議での決定事項の追跡までを統合管理。"
                            link="https://minig-ms.onrender.com/"
                            buttonText="アプリを開く"
                            features={["災害・ヒヤリハットAI分析", "年間計画連動PDCA", "会議指摘事項自動追跡"]}
                            imageUrl="/images/mining_manager_bg.png"
                        />
                        <ToolCard
                            icon={<Calendar className="w-8 h-8 text-cyan-400" />}
                            title="鉱山保安PDCA進行管理カレンダー"
                            description="鉱山保安活動の年間計画や月次進行をカレンダー形式で可視化・管理するツールです。"
                            link="https://mine-safety-pdca.onrender.com/"
                            buttonText="カレンダーを開く"
                            features={["年間計画の策定と進捗管理", "PDCAサイクルの可視化", "保安活動の抜け漏れ防止"]}
                            imageUrl="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2000&auto=format&fit=crop"
                        />
                    </div>
                </section>

                {/* 4. Knowledge Transfer & Operational Support */}
                <section id="knowledge-support" className="scroll-mt-28 py-20">
                    <SectionHeading title="ナレッジ継承・業務支援" subtitle="Knowledge transfer and operational support" />
                    <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <ToolCard
                            icon={<Newspaper className="w-8 h-8 text-cyan-400" />}
                            title="OSHニュースクリッピング・エージェント"
                            description="最新の労働安全衛生ニュースを自動収集し、AIが要約・構造化。さらに図解イラストとスライド資料までを一気通貫で生成するインテリジェンス・ツールです。"
                            link="https://osh-news-agent.onrender.com/"
                            buttonText="エージェントを起動"
                            features={["全自動ニュース収集＆要約", "構造化イラストAI生成", "PPTXスライド自動作成"]}
                            imageUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<Brain className="w-8 h-8 text-cyan-400" />}
                            title="暗黙知マネージャー"
                            description="組織の暗黙知を形式知化し、ナレッジベースとして活用。質問に対して最適な回答をAIが導き出します。"
                            link="https://knowledge-frontend-pqmv.onrender.com/"
                            buttonText="マネージャーを開く"
                            features={["暗黙知の形式知化・共有", "自然言語による質問応答", "プロンプト管理機能"]}
                            imageUrl="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<Bot className="w-8 h-8 text-cyan-400" />}
                            title="AIスライド・インフォグラフィック生成ツール"
                            description="テキストを入力するだけで、プレゼンテーションのストーリー構成から、プロフェッショナルな品質のスライド画像までをAIが一貫して生成。資料作成の時間を劇的に短縮します。"
                            link="https://nanobanana-pro-gen.onrender.com/"
                            buttonText="アプリを開く"
                            features={["ストーリー構成案の自動提案", "Gemini 3.0 Pro Image生成", "PowerPoint (pptx) 出力"]}
                            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                        />
                        <ToolCard
                            icon={<Languages className="w-8 h-8 text-cyan-400" />}
                            title="リアルタイム音声翻訳"
                            description="スマホのマイクやPC Chromeのタブ音声を使い、日本語と英語を自動判定して翻訳。海外動画、会議、現場での説明確認を支援します。"
                            link="https://api-translator3-mobile.onrender.com/"
                            buttonText="翻訳アプリを開く"
                            features={["日本語・英語の自動判定", "スマホPWA対応", "PC Chromeタブ音声翻訳"]}
                            imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
};

const SectionHeading: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="mb-10">
        <p className="text-[11px] font-light uppercase tracking-[0.42em] text-zinc-500">{subtitle}</p>
        <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">{title}</h2>
    </div>
);

// Unified ToolCard Component
const ToolCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
    buttonText: string;
    badge?: string;
    features?: string[];
    imageUrl?: string;
}> = ({ icon, title, description, link, buttonText, badge, features, imageUrl }) => (
    <article
        className="group relative flex flex-col overflow-hidden border border-white/10 bg-[#0b0c0f] transition-colors duration-500 hover:border-white/35"
        style={{ height: 420, minHeight: 420, maxHeight: 420 }}
    >
        {imageUrl && (
            <div className="relative h-24 overflow-hidden border-b border-white/10 bg-black">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover opacity-82 brightness-[0.70] contrast-[0.92] saturate-[0.88] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f]/82 via-transparent to-black/18" />
            </div>
        )}

        <div className="relative flex h-full flex-col p-4">
            {badge && (
                <span className="absolute right-4 top-4 border border-cyan-300/45 px-2.5 py-1 text-[10px] font-light uppercase tracking-[0.22em] text-cyan-200">
                    {badge}
                </span>
            )}

            <div className="mb-3 flex h-9 w-9 items-center justify-center border border-white/10 bg-black/20 text-cyan-300 transition-colors group-hover:border-cyan-300/45">
                {icon}
            </div>

            <h3 className="mb-2 line-clamp-2 text-lg font-light leading-6 text-white">{title}</h3>
            <p className="mb-3 line-clamp-3 text-sm font-light leading-6 text-zinc-400">{description}</p>

            {features && (
                <ul className="mb-3 space-y-1.5 border-t border-white/10 pt-3">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm font-light leading-5 text-zinc-300">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-auto">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 border border-white/20 bg-black/20 px-4 py-2 text-sm font-light text-zinc-200 transition-colors hover:border-white/70 hover:text-white"
                >
                    {buttonText} <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    </article>
);

export default AIPlayground;
