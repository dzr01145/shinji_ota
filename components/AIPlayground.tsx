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
    MessageSquare
} from 'lucide-react';

const AIPlayground: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                        Safety Solutions & AI Tools
                    </h1>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                        現場の安全を守るための最先端AIツールと専門家サポート。<br />
                        必要な時に、必要な分だけ利用できる柔軟なソリューションを提供します。
                    </p>
                </div>

                {/* Featured Portal Section */}
                <section className="mb-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-3xl -z-10"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-slate-700 group hover:border-cyan-400/50 transition-all duration-500">

                        {/* Background Image for Portal */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
                                alt="Office Collaboration"
                                className="h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/70 transition-colors duration-500"></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-12 text-center backdrop-blur-sm">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>

                            <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-4 py-1 mb-6 shadow-lg">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Portal</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                                Your Safety Partner <span className="text-red-400 text-2xl align-middle font-normal">（Mockup）</span>
                            </h2>
                            <p className="text-slate-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md font-medium">
                                安全衛生の総合プラットフォーム。<br />
                                AIツール、専門家ネットワーク、教育コンテンツへアクセス
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="https://safety-partner.onrender.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 min-w-[200px]"
                                >
                                    ポータルサイトを開く <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI TOOLS Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-slate-800"></div>
                        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                            <span className="bg-cyan-500/10 p-2 rounded-lg">AI TOOLS</span>
                        </h2>
                        <div className="h-px flex-1 bg-slate-800"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Free Tools */}
                        <ToolCard
                            icon={<Bot className="w-8 h-8 text-cyan-400" />}
                            title="労働安全衛生チャット"
                            description="労働安全衛生法や労災事例をAIが引用しながら回答。安全教育、活動など多くのシーンで活用できる専門チャットボットです。"
                            link="https://safety-chatbot.onrender.com/"
                            buttonText="アプリを開く"
                            imageUrl="/images/safety_chat_bg.png"
                        />

                        {/* Premium Tools - Now using ToolCard style */}
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
                            icon={<Camera className="w-8 h-8 text-cyan-400" />}
                            title="安全パトロール支援"
                            description="現場写真からAIで危険源を自動抽出。パトロール日報作成まで一貫支援。"
                            link="https://rskrep-by-claude.onrender.com/"
                            buttonText="アプリを開く"
                            features={["AI画像解析", "日報自動作成", "クラウド共有"]}
                            imageUrl="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
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
                            icon={<Shield className="w-8 h-8 text-cyan-400" />}
                            title="AI鉱山保安マネジメントシステム"
                            description="災害・ヒヤリハット報告から、AIがリスクアセスメント案や改善対策を自動生成。年間計画の進捗管理から会議での決定事項の追跡までを統合管理。"
                            link="https://minig-ms.onrender.com/"
                            buttonText="アプリを開く"
                            features={["災害・ヒヤリハットAI分析", "年間計画連動PDCA", "会議指摘事項自動追跡"]}
                            imageUrl="/images/mining_manager_bg.png"
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
                            icon={<Bot className="w-8 h-8 text-cyan-400" />}
                            title="AIスライド・インフォグラフィック生成ツール"
                            description="テキストを入力するだけで、プレゼンテーションのストーリー構成から、プロフェッショナルな品質のスライド画像までをAIが一貫して生成。資料作成の時間を劇的に短縮します。"
                            link="https://nanobanana-pro-gen.onrender.com/"
                            buttonText="アプリを開く"
                            features={["ストーリー構成案の自動提案", "Gemini 3.0 Pro Image生成", "PowerPoint (pptx) 出力"]}
                            imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                        />
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
            </div>
        </div>
    );
};

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
    <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">

        {/* Background Image with Overlay */}
        {imageUrl && (
            <div className="absolute inset-0 z-0">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40 transition-opacity duration-500 group-hover:via-slate-950/70"></div>
            </div>
        )}

        <div className="relative z-10 flex flex-col h-full p-6">
            {badge && (
                <span className="absolute top-4 left-6 z-20 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-cyan-500/20">
                    {badge}
                </span>
            )}

            <div className="bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/20 transition-colors border border-slate-700/50 group-hover:border-cyan-500/30">
                {icon}
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{description}</p>

            {features && (
                <ul className="space-y-2 mb-6">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span className="opacity-90">{feature}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-auto">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-slate-800/80 hover:bg-cyan-600 hover:text-white text-cyan-400 font-medium py-3 rounded-lg transition-all duration-300 backdrop-blur-sm border border-slate-700 group-hover:border-cyan-500/30"
                >
                    {buttonText} <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    </div>
);

export default AIPlayground;
