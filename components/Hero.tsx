import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, Terminal, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import profileImg from '../src/assets/profile_image.jpg';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = [
    "Risk Engineer...",
    "Safety Architect...",
    "Professional P.E.Jp...",
    "Translator of Safety..."
  ];

  // Typing Effect Loop
  useEffect(() => {
    let currentText = '';
    let isDeleting = false;
    let loopNum = 0;
    let typingSpeed = 100;

    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typingSpeed = 50;
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typingSpeed = 100;
      }

      setText(currentText);

      if (!isDeleting && currentText === fullText) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        loopNum++;
        typingSpeed = 500; // Pause before starting new word
      }

      setTimeout(handleType, typingSpeed);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, []);

  // Canvas Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)'; // cyan-500
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-30"
      />

      {/* Ambient Light Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded border border-cyan-900/50 bg-cyan-950/10 backdrop-blur-md animate-fade-in-up">
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <span className="text-xs font-mono text-cyan-400 tracking-widest">CONSULTING AVAILABLE</span>
          </div>

          <div className="relative">
            <h2 className="text-xl md:text-2xl font-mono text-slate-500 mb-2 tracking-tighter flex items-center gap-2">
              <Activity size={20} />
              <span>System Status: Stable</span>
            </h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-4">
              SHINJI
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 relative">
                OTA
              </span>
            </h1>
            <p className="text-2xl font-light text-slate-300 tracking-wide flex items-center gap-3 h-8">
              <span className="font-mono text-cyan-400 text-lg">
                &gt; {text}
                <span className="inline-block w-2 h-5 ml-1 bg-cyan-400 animate-pulse"></span>
              </span>
            </p>
          </div>

          <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-cyan-500/30 pl-6 my-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-white text-black font-bold transition-transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10"></div>
              <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
                実績を見る <ArrowRight size={18} />
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500 hover:bg-cyan-950/30 transition-all font-mono text-sm"
            >
              Contact_Me
            </a>
          </div>

          <div className="flex items-center gap-8 pt-12 opacity-60 hover:opacity-100 transition-opacity animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <a href="#" className="hover:text-cyan-400 transition-colors transform hover:scale-110"><Github size={24} /></a>
            <a href="#" className="hover:text-cyan-400 transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
            <a href="#" className="hover:text-cyan-400 transition-colors transform hover:scale-110"><Twitter size={24} /></a>
          </div>
        </div>

        {/* Visual/Image Area */}
        <div className="lg:col-span-5 relative hidden lg:block animate-blob">
          <div className="relative z-10 w-full aspect-[3/4] bg-slate-900 relative group perspective-1000">
            {/* Glitch Effect Layers */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 mix-blend-overlay z-20 pointer-events-none"></div>
            <div className="absolute -inset-4 border border-slate-800 z-0 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute -inset-4 border border-cyan-500/20 z-0 rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>

            <img
              src={profileImg}
              alt="Shinji Ota"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.02]"
            />

            {/* Floating Tech Elements */}
            <div className="absolute -right-8 top-12 bg-slate-950/90 backdrop-blur border border-cyan-500/30 p-4 shadow-2xl flex flex-col items-center gap-2 z-30 animate-float-y">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              <div className="writing-vertical-lr font-mono text-xs text-cyan-400 tracking-widest uppercase py-2">
                Safety First
              </div>
            </div>

            <div className="absolute -left-6 bottom-24 bg-slate-950/90 backdrop-blur border border-purple-500/30 p-4 shadow-2xl z-30 animate-float-y" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <Activity size={16} className="text-purple-400" />
                <span className="font-mono text-xs text-purple-300">ISO 45001 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 flex items-center gap-4 text-slate-600 font-mono text-xs animate-bounce">
        <span className="">SCROLL TO EXPLORE</span>
        <div className="h-8 w-px bg-gradient-to-b from-slate-600 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
