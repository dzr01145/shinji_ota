import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-3xl rounded-full -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2">My Arsenal</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Technical Skills</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category} className="space-y-6">
              <h4 className="text-xl font-bold text-slate-200 border-b border-slate-800 pb-2">{category}</h4>
              <div className="space-y-4">
                {SKILLS.filter(s => s.category === category).map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300 text-sm font-medium flex items-center gap-2">
                        <span>{skill.icon}</span> {skill.name}
                      </span>
                      <span className="text-slate-500 text-xs">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
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