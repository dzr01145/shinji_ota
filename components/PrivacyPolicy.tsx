import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 rounded-full mb-4">
                        <Shield className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">プライバシーポリシー</h1>
                    <p className="text-slate-400">最終更新日: 2025年11月25日</p>
                </div>

                <div className="space-y-10">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                            1. 個人情報の利用目的
                        </h2>
                        <p className="leading-relaxed text-slate-400">
                            当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。<br />
                            取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                            2. 個人情報の第三者への開示
                        </h2>
                        <p className="leading-relaxed text-slate-400">
                            当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 ml-4 text-slate-400">
                            <li>本人のご了解がある場合</li>
                            <li>法令等への協力のため、開示が必要となる場合</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                            3. アクセス解析ツールについて
                        </h2>
                        <p className="leading-relaxed text-slate-400">
                            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用する可能性があります。<br />
                            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。<br />
                            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                            4. 免責事項
                        </h2>
                        <p className="leading-relaxed text-slate-400">
                            当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。<br />
                            当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。<br />
                            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                            5. 著作権について
                        </h2>
                        <p className="leading-relaxed text-slate-400">
                            当サイトに掲載されている文章・画像・動画等の著作物の情報を無断転載することを禁止します。<br />
                            引用に関しましては、著作権法上認められた範囲内で適切に行ってください。
                        </p>
                    </section>

                    <section className="pt-8 border-t border-slate-800">
                        <h2 className="text-xl font-bold text-white mb-4">お問い合わせ</h2>
                        <p className="leading-relaxed text-slate-400">
                            本ポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりお願いいたします。
                        </p>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
