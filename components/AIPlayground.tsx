import React from 'react';
import {
    Bot,
    Shield,
    AlertTriangle,
    Camera,
    Search,
    ExternalLink,
    CheckCircle2,
    Scale
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
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>

                        <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-1 mb-6">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Portal</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Your Safety Partner <span className="text-red-400/80 text-2xl align-middle font-normal">（Mockup）</span>
                        </h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
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

                        {/* Decorative elements */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
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
                        />

                        {/* Premium Tools - Now using ToolCard style */}
                        <ToolCard
                            icon={<Shield className="w-8 h-8 text-cyan-400" />}
                            title="リスクアセスメント支援 (RA Compass)"
                            description="リスクアセスメントの洗い出しから残留リスク管理まで効率化。法令連動機能付き。"
                            link="https://ra-compass.onrender.com/"
                            buttonText="アプリを開く"
                            features={["法令連動リスク評価", "教育履歴管理", "導入サポート"]}
                        />
                        <ToolCard
                            icon={<Camera className="w-8 h-8 text-cyan-400" />}
                            title="安全パトロール支援"
                            description="現場写真からAIで危険源を自動抽出。パトロール日報作成まで一貫支援。"
                            link="https://rskrep-by-claude.onrender.com/"
                            buttonText="アプリを開く"
                            features={["AI画像解析", "日報自動作成", "クラウド共有"]}
                        />
                        <ToolCard
                            icon={<AlertTriangle className="w-8 h-8 text-cyan-400" />}
                            title="KYT支援ボット"
                            description="作業内容から危険要因をAIが抽出。KYTシートやイラストを自動生成。"
                            link="https://ky-support.onrender.com/"
                            buttonText="アプリを開く"
                            features={["危険要因自動提示", "指差呼称生成", "シート自動作成"]}
                        />
                        <ToolCard
                            icon={<Bot className="w-8 h-8 text-cyan-400" />}
                            title="労働安全衛生チャット＋"
                            description="1,974条文と2,622件の労災事例を網羅した強力なAIチャットボット。"
                            link="https://manus-chatbot.onrender.com"
                            buttonText="アプリを開く"
                            features={["法令完全網羅", "労災事例DB", "根拠引用回答"]}
                        />
                        <ToolCard
                            icon={<Search className="w-8 h-8 text-cyan-400" />}
                            title="労働災害リスクファインダー"
                            description="現場写真やキーワードからプロレベルのリスク分析報告書をAIが自動生成。"
                            link="https://risk-report-tool.onrender.com/"
                            buttonText="アプリを開く"
                            features={["5段階リスク評価", "報告書自動生成", "PPTX出力"]}
                            badge="Recommended"
                        />
                        <ToolCard
                            icon={<Scale className="w-8 h-8 text-cyan-400" />}
                            title="製品安全・PL／品質コンプライアンス相談チャット"
                            description="製造物責任、リコール対応、品質不正防止などに関連するリスクへのアドバイスを提供します。"
                            link="https://pl-chatbot.onrender.com/"
                            buttonText="アプリを開く"
                            features={["PL法・製品安全法対応", "リコール判断・決裁支援", "品質不正・改ざん予防"]}
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
}> = ({ icon, title, description, link, buttonText, badge, features }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group relative flex flex-col h-full">
        {badge && (
            <span className="absolute -top-3 left-6 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
                {badge}
            </span>
        )}
        <div className="bg-slate-800/50 p-3 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/10 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-6 flex-grow">{description}</p>

        {features && (
            <ul className="space-y-2 mb-6">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        {feature}
                    </li>
                ))}
            </ul>
        )}

        <div className="mt-auto">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-400 font-medium py-3 rounded-lg transition-all duration-300"
            >
                {buttonText} <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    </div>
);

export default AIPlayground;
