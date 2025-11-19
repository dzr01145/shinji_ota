import React from 'react';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for work
          </div>
          
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white tracking-tight mb-2">
              Hello, I'm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                {PERSONAL_INFO.name}
              </span>
            </h1>
            <p className="text-2xl font-light text-slate-500 tracking-[0.2em] uppercase">
              Shinji Ota
            </p>
          </div>
          
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full border border-slate-700 text-white hover:bg-slate-800 transition-colors font-medium"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-800/50">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter size={24} /></a>
          </div>
        </div>

        <div className="hidden md:block relative">
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 z-10"></div>
            <img 
              src="https://picsum.photos/800/800?grayscale" 
              alt="Profile Abstract" 
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
            />
            {/* Floating Code Snippet Card */}
            <div className="absolute bottom-8 left-8 right-8 p-4 bg-slate-950/90 backdrop-blur rounded-xl border border-slate-800 z-20 shadow-xl">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
                <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;