import React from 'react';
import { Code2, Rocket, Brain } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Left Column: Title & Summary */}
          <div className="md:w-1/2">
            <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              情熱と技術で、<br/>最高のデジタル体験を。
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              {PERSONAL_INFO.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Code2 className="text-cyan-400 mb-3" size={28} />
                <h4 className="text-white font-bold mb-1">Clean Code</h4>
                <p className="text-sm text-slate-500">保守性と拡張性に優れたアーキテクチャ</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Brain className="text-purple-400 mb-3" size={28} />
                <h4 className="text-white font-bold mb-1">AI Integration</h4>
                <p className="text-sm text-slate-500">LLMを活用したインテリジェント機能</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Rocket className="text-green-400 mb-3" size={28} />
                <h4 className="text-white font-bold mb-1">Performance</h4>
                <p className="text-sm text-slate-500">Core Web Vitalsを意識した高速化</p>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              Experience <div className="h-px flex-grow bg-slate-800"></div>
            </h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-800 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-hover:border-cyan-500 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">{exp.role}</h4>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">{exp.period}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-300 mb-2">{exp.company}</div>
                    <p className="text-sm text-slate-400">{exp.description}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;