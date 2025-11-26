import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  const categoryMap: { [key: string]: string } = {
    "Safety Mgmt": "安全管理",
    "Engineering": "エンジニアリング",
    "DX & Analysis": "DX・分析",
    "Consulting": "コンサルティング"
  };

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden scroll-mt-28">
      {/* Decorative bg */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-[100px] rounded-full -z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest mb-2">SKILLS</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">スキル・技術</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, catIndex) => (
            <div key={category} className="space-y-6 animate-fade-in-up" style={{ animationDelay: `${catIndex * 0.1}s` }}>
              <div className="border-b border-slate-800 pb-2 flex items-end justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-200 leading-none mb-1">
                    {categoryMap[category] || category}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">{category}</span>
                </div>
                <span className="text-xs font-normal text-slate-500 mb-1">0{catIndex + 1}</span>
              </div>
              <div className="space-y-4">
                {SKILLS.filter(s => s.category === category).map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative bg-slate-900/50 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:bg-slate-800"
                  >
                    <div className="flex justify-between mb-2 relative z-10">
                      <span className="text-slate-300 text-sm font-bold flex items-center gap-3">
                        <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-cyan-500 font-mono text-xs">{skill.level}%</span>
                    </div>

                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mb-3">
                      <div
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out w-0 group-hover:w-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>

                    <p className="text-xs text-slate-300 font-medium leading-relaxed opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;