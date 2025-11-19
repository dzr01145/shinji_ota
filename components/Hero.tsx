import React from 'react';
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      {/* Animated Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/30 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-cyan-300 tracking-wider">SYSTEM ONLINE</span>
          </div>
          
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-medium text-slate-400 mb-2 tracking-widest">
              HELLO, WORLD. I AM
            </h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
              SHINJI
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                OTA
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-slate-300 mt-6">
              {PERSONAL_INFO.name}
            </p>
          </div>
          
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-cyan-500/50 pl-6">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-4">
            <a 
              href="#projects" 
              className="group px-8 py-4 rounded-none bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all skew-x-[-10deg] hover:skew-x-[-5deg] relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 skew-x-[10deg] group-hover:skew-x-[5deg]">
                View Projects <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-none border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">Contact Me</span>
            </a>
          </div>

          <div className="flex items-center gap-6 pt-8">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors transform hover:scale-110 duration-300"><Github size={28} /></a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors transform hover:scale-110 duration-300"><Linkedin size={28} /></a>
            <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors transform hover:scale-110 duration-300"><Twitter size={28} /></a>
          </div>
        </div>

        <div className="hidden lg:block relative">
          {/* Geometric Decorations */}
          <div className="absolute -top-12 -right-12 w-24 h-24 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-24 h-24 border-b-2 border-l-2 border-purple-500/30 rounded-bl-3xl"></div>

          <div className="relative w-full aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-sm shadow-2xl shadow-cyan-900/20 group">
             {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-cyan-900/20 z-10 mix-blend-multiply opacity-80"></div>
            <div className="absolute inset-0 border-2 border-slate-800 z-20 group-hover:border-cyan-500/50 transition-colors duration-500"></div>
            
            <img 
              src="https://picsum.photos/800/1000?grayscale" 
              alt="Shinji Ota" 
              className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
            />
            
            {/* Tech Stack Floating Badge */}
            <div className="absolute bottom-6 right-6 z-30 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 shadow-xl">
              <div className="text-xs font-mono text-cyan-400 mb-1">CURRENT STATUS</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Building the Future
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 opacity-50 animate-bounce">
        <span className="text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
};

export default Hero;