import React from 'react';
import { ShieldCheck, Users, Cpu } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">

          {/* Left Column: Title & Summary */}
          <div className="md:w-2/3">
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest mb-2">ABOUT ME</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              プロフィール
            </h3>
            <p className="text-xl text-cyan-100 mb-6 font-medium border-l-4 border-cyan-500 pl-4">
              現場の痛みを知る、<br />安全文化の翻訳者。
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              {PERSONAL_INFO.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <ShieldCheck className="text-cyan-400 mb-3" size={28} />
                <h4 className="text-white font-bold mb-1">リスク工学</h4>
                <p className="text-xs text-cyan-400 font-mono mb-2">Risk Engineering</p>
                <p className="text-sm text-slate-500">現場視点×工学的アプローチによる本質的安全化</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Users className="text-purple-400 mb-3" size={28} />
                <h4 className="text-white font-bold mb-1">安全文化</h4>
                <p className="text-xs text-purple-400 font-mono mb-2">Safety Culture</p>
                <p className="text-sm text-slate-500">経営層と現場をつなぐ「安全文化」の通訳・醸成</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Cpu className="text-green-400 mb-3" size={28} />
                <h4 className="text-white font-bold mb-1">DX・イノベーション</h4>
                <p className="text-xs text-green-400 font-mono mb-2">DX & Innovation</p>
                <p className="text-sm text-slate-500">AI・データ活用による次世代型安全管理の構築</p>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="md:w-1/3 h-[300px] relative">
            <div className="w-full h-full relative group">
              {/* Invisible Hover Trigger Area - Extends significantly to the left */}
              <div className="absolute inset-y-0 -left-[500px] w-[500px] z-20"></div>

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src="/profile_image.jpg"
                  alt="Shinji Ota"
                  className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[40%] sepia-[20%] hue-rotate-[190deg] brightness-[40%] contrast-[120%] opacity-80 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                />
                <img
                  src="/profile_image2.jpg"
                  alt="Shinji Ota Alternate"
                  className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[40%] sepia-[20%] hue-rotate-[190deg] brightness-[40%] contrast-[120%] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-80"
                />

                {/* Gradient Overlays to blend with background */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-950/60 to-slate-950 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none"></div>

                {/* Tech Decoration Lines (Finder Effect) */}
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none"></div>
                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-purple-500/40 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section - Moved below */}
        <div className="mt-20">
          <div className="flex items-end gap-3 mb-12 justify-center">
            <h3 className="text-2xl font-bold text-white">経歴</h3>
            <span className="text-sm font-mono text-cyan-400 mb-1">EXPERIENCE</span>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-800 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">

            {EXPERIENCE.map((exp, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-hover:border-cyan-500 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-white text-lg">{exp.role}</h4>
                      {exp.roleEn && <p className="text-xs text-cyan-500/70 font-mono">{exp.roleEn}</p>}
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded shrink-0 ml-4">{exp.period}</span>
                  </div>
                  <div className="text-sm font-medium text-slate-300 mb-2">{exp.company}</div>
                  <p className="text-sm text-slate-400">{exp.description}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;