import React from 'react';
import {
    Bot,
    FileText,
    Video,
    Shield,
    AlertTriangle,
    Thermometer,
    Activity,
    Camera,
    Users,
    Search,
    ExternalLink,
    ShoppingCart,
    CheckCircle2
} from 'lucide-react';

const AIPlayground: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                        Safety Solutions & AI Tools
                    </h1>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                        現場の安全を守るための最先端AIツールと専門家サポート。<br />
                        必要な時に、必要な分だけ利用できる柔軟なソリューションを提供します。
                    </p>
                </div>

                {/* Free Tools Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-slate-800"></div>
                        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                            <span className="bg-cyan-500/10 p-2 rounded-lg">Free</span>
                            無料メニュー
                        </h2>
                        <div className="h-px flex-1 bg-slate-800"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Tool 1 */}
                        <ToolCard
                            icon={<Bot className="w-8 h-8 text-cyan-400" />}
                            title="労働安全衛生チャット"
                            description="労働安全衛生法や労災事例をAIが引用しながら回答。安全教育、活動など多くのシーンで活用できる専門チャットボットです。"
                            link="https://safety-chatbot.onrender.com/"
                            buttonText="アプリを開く"
                            badge="Popular"
                        />
                        {/* Tool 2 */}
                        <ToolCard
                            icon={<FileText className="w-8 h-8 text-cyan-400" />}
                            title="手順書ダウンロード"
                            description="すぐに使えるヒヤリハット報告書や安全作業手順書の雛形を無料でダウンロードできます。（現在は長崎労働局のテンプレート例）"
                            link="https://jsite.mhlw.go.jp/nagasaki-roudoukyoku/library/nagasaki-roudoukyoku/anzen-eisei/201112/tejun-11120804.xls"
                            buttonText="ダウンロード"
                        />
                        {/* Tool 3 */}
                        <ToolCard
                            icon={<Video className="w-8 h-8 text-cyan-400" />}
                            title="教育ビデオ"
                            description="朝礼やミーティングで活用できる短い教育ビデオ。従業員の安全意識向上に繋がります。（厚労省職場のあんぜんサイト）"
                            link="https://anzeninfo.mhlw.go.jp/information/kyozaishiryo/jpn.html"
                            buttonText="ビデオを見る"
                        />
                    </div>
                </section>

                {/* Premium Apps Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-slate-800"></div>
                        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                            <span className="bg-purple-500/10 p-2 rounded-lg">Premium</span>
                            有料アプリ・サービス
                        </h2>
                        <div className="h-px flex-1 bg-slate-800"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <PremiumCard
                            icon={<Shield className="w-8 h-8 text-purple-400" />}
                            title="リスクアセスメント支援 (RA Compass)"
                            provider="SOMPOリスクマネジメント"
                            description="リスクアセスメントの洗い出しから残留リスク管理まで効率化。法令連動機能付き。"
                            price="4,000円/月〜"
                            link="https://ra-compass.onrender.com/"
                            features={["法令連動リスク評価", "教育履歴管理", "導入サポート"]}
                        />
                        <PremiumCard
                            icon={<Thermometer className="w-8 h-8 text-purple-400" />}
                            title="熱中症管理「みまもりふくろう」"
                            provider="SOMPOリスクマネジメント"
                            description="WBGTなどの環境データと作業者の状況を見える化し、熱中症リスクを素早くキャッチ。"
                            price="要見積もり"
                            link="https://www.sompo-rc.co.jp/services/view/184"
                            features={["リアルタイム監視", "休憩・給水ガイド", "PDCA支援"]}
                        />
                        <PremiumCard
                            icon={<Activity className="w-8 h-8 text-purple-400" />}
                            title="安全衛生マネジメントアプリ"
                            provider="㈱コシダアート"
                            description="労働安全衛生活動の進捗や是正状況をクラウドで一元管理できるシステム。"
                            price="8,000円/月〜"
                            link="https://www.koshida-art.co.jp/zero/"
                            features={["是正処置ワークフロー", "KPIダッシュボード", "モバイル対応"]}
                        />
                        <PremiumCard
                            icon={<Camera className="w-8 h-8 text-purple-400" />}
                            title="安全パトロール支援"
                            provider="SOMPOリスクマネジメント"
                            description="現場写真からAIで危険源を自動抽出。パトロール日報作成まで一貫支援。"
                            price="5,000円/月〜"
                            link="https://rskrep-by-claude.onrender.com/"
                            features={["AI画像解析", "日報自動作成", "クラウド共有"]}
                            badge="Recommended"
                        />
                        <PremiumCard
                            icon={<AlertTriangle className="w-8 h-8 text-purple-400" />}
                            title="KYT支援ボット"
                            provider="SOMPOリスクマネジメント"
                            description="作業内容から危険要因をAIが抽出。KYTシートやイラストを自動生成。"
                            price="5,000円/月〜"
                            link="https://ky-support.onrender.com/"
                            features={["危険要因自動提示", "指差呼称生成", "シート自動作成"]}
                        />
                        <PremiumCard
                            icon={<Bot className="w-8 h-8 text-purple-400" />}
                            title="労働安全衛生チャット＋"
                            provider="SOMPOリスクマネジメント"
                            description="1,974条文と2,622件の労災事例を網羅した強力なAIチャットボット。"
                            price="5,000円/月〜"
                            link="https://manus-chatbot.onrender.com"
                            features={["法令完全網羅", "労災事例DB", "根拠引用回答"]}
                        />
                        <PremiumCard
                            icon={<Search className="w-8 h-8 text-purple-400" />}
                            title="労働災害リスクファインダー"
                            provider="SOMPOリスクマネジメント"
                            description="現場写真やキーワードからプロレベルのリスク分析報告書をAIが自動生成。"
                            price="9,000円/月"
                            link="https://risk-report-tool.onrender.com/"
                            features={["5段階リスク評価", "報告書自動生成", "PPTX出力"]}
                            badge="New"
                        />
                    </div>
                </section>

                {/* Expert Support Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-slate-800"></div>
                        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                            <span className="bg-emerald-500/10 p-2 rounded-lg">Expert</span>
                            専門家支援
                        </h2>
                        <div className="h-px flex-1 bg-slate-800"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <PremiumCard
                            icon={<Users className="w-8 h-8 text-emerald-400" />}
                            title="継続的な専門家アドバイス"
                            provider="提携専門家"
                            description="気軽に相談できるパートナーとして、オンラインで継続的にサポートします。"
                            price="10,000円/月〜"
                            link="#"
                            features={["専任コンサルタント", "チャット相談", "委員会運営サポート"]}
                            buttonText="専門家に相談"
                        />
                        <PremiumCard
                            icon={<Search className="w-8 h-8 text-emerald-400" />}
                            title="現場訪問による詳細診断"
                            provider="提携専門家"
                            description="専門家が直接現場を訪問し、潜在的なリスクを洗い出して改善策を提案します。"
                            price="30,000円/回〜"
                            link="#"
                            features={["現場巡回・ヒアリング", "写真付き診断レポート", "改善計画提示"]}
                            buttonText="専門家を探す"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

// Helper Components
const ToolCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
    buttonText: string;
    badge?: string;
}> = ({ icon, title, description, link, buttonText, badge }) => (
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
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-400 font-medium py-3 rounded-lg transition-all duration-300"
        >
            {buttonText} <ExternalLink className="w-4 h-4" />
        </a>
    </div>
);

const PremiumCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    provider: string;
    description: string;
    price: string;
    link: string;
    features: string[];
    badge?: string;
    buttonText?: string;
}> = ({ icon, title, provider, description, price, link, features, badge, buttonText = "詳細を見る" }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group relative flex flex-col h-full">
        {badge && (
            <span className="absolute -top-3 left-6 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {badge}
            </span>
        )}
        <div className="flex justify-between items-start mb-4">
            <div className="bg-slate-800/50 p-3 rounded-lg group-hover:bg-purple-500/10 transition-colors">
                {icon}
            </div>
            <div className="text-right">
                <p className="text-xs text-slate-500">{provider}</p>
                <p className="text-lg font-bold text-slate-200">{price}</p>
            </div>
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-6 flex-grow">{description}</p>

        <ul className="space-y-2 mb-6">
            {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    {feature}
                </li>
            ))}
        </ul>

        <div className="grid grid-cols-2 gap-3 mt-auto">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-purple-600 hover:text-white text-purple-400 font-medium py-2 rounded-lg transition-all duration-300 text-sm"
            >
                {buttonText} <ExternalLink className="w-3 h-3" />
            </a>
            <button
                className="flex items-center justify-center gap-2 border border-slate-700 hover:border-purple-500 text-slate-300 hover:text-purple-400 font-medium py-2 rounded-lg transition-all duration-300 text-sm"
            >
                <ShoppingCart className="w-3 h-3" /> カート
            </button>
        </div>
    </div>
);

export default AIPlayground;
