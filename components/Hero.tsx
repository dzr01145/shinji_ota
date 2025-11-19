import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0 perspective-1000">
         <div 
           className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px',
             transform: `perspective(500px) rotateX(60deg) translateY(${mousePosition.y * 20}px) translateZ(-100px)`,
             transformOrigin: 'center top'
           }}
         ></div>
      </div>

      {/* Ambient Light Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded border border-cyan-900/50 bg-cyan-950/10 backdrop-blur-md">
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <span className="text-xs font-mono text-cyan-400 tracking-widest">AVAILABLE FOR WORK</span>
          </div>
          
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-mono text-slate-500 mb-2 tracking-tighter">
              &lt;Hello World /&gt;
            </h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              SHINJI
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 relative">
                OTA
                <svg className="absolute w-full h-[10px] bottom-2 left-0 text-cyan-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-2xl font-light text-slate-300 mt-6 tracking-wide flex items-center gap-3">
              {PERSONAL_INFO.jaName} 
              <span className="h-px w-12 bg-slate-700 inline-block"></span>
              <span className="font-mono text-cyan-400 text-lg">{PERSONAL_INFO.title}</span>
            </p>
          </div>
          
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-cyan-500/30 pl-6 my-8">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-4">
            <a 
              href="#projects" 
              className="group relative px-8 py-4 bg-white text-black font-bold transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-cyan-500 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
              <span className="flex items-center gap-2">
                View Work <ArrowRight size={18} />
              </span>
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500 transition-colors font-mono text-sm"
            >
              Contact_Me
            </a>
          </div>

          <div className="flex items-center gap-8 pt-12 opacity-60 hover:opacity-100 transition-opacity">
            <a href={PERSONAL_INFO.github} className="hover:text-cyan-400 transition-colors"><Github size={24} /></a>
            <a href={PERSONAL_INFO.linkedin} className="hover:text-cyan-400 transition-colors"><Linkedin size={24} /></a>
            <a href={PERSONAL_INFO.twitter} className="hover:text-cyan-400 transition-colors"><Twitter size={24} /></a>
          </div>
        </div>

        {/* Visual/Image Area */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative z-10 w-full aspect-[3/4] bg-slate-900 relative group">
             {/* Glitch Effect Layers */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 mix-blend-overlay z-20"></div>
            <div className="absolute -inset-4 border border-slate-800 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute -inset-4 border border-cyan-500/20 z-0 rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
              alt="Shinji Ota" 
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            
            {/* Tech Badge */}
            <div className="absolute -right-8 top-12 bg-slate-950 border border-slate-800 p-4 shadow-2xl flex flex-col items-center gap-2 z-30 animate-bounce">
              <Cpu className="text-cyan-400" size={24} />
              <div className="writing-vertical-lr font-mono text-xs text-slate-500 tracking-widest uppercase py-2">
                System Logic
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 flex items-center gap-4 text-slate-600 font-mono text-xs">
        <span className="animate-pulse">SCROLL TO EXPLORE</span>
        <div className="h-px w-12 bg-slate-800"></div>
      </div>
    </section>
  );
};

export default Hero;