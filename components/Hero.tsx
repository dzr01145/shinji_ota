import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, Terminal, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState('');

  // Typing effect state
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
    let timer: NodeJS.Timeout;

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

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
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

      {/* Ambient Light Orbs - Keep these for atmosphere, but they are subtle */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center h-full">

        {/* Text Content - Positioned to overlap with image */}
        <div className="lg:col-span-8 z-20 pt-10 lg:pt-0 pointer-events-none">
          <div className="space-y-6 pointer-events-auto">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded border border-cyan-900/50 bg-cyan-950/30 backdrop-blur-md">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
              <span className="text-xs font-mono text-cyan-400 tracking-widest">CONSULTING AVAILABLE</span>
            </div>

            <div className="relative">
              <h2 className="text-xl md:text-2xl font-mono text-slate-500 mb-2 tracking-tighter flex items-center gap-2">
                <Activity size={20} />
                <span>System Status: Stable</span>
              </h2>
              <h1 className="font-black tracking-tighter text-white leading-[0.9] mb-4 drop-shadow-2xl">
                <span className="block text-lg md:text-2xl font-mono text-cyan-400 tracking-[0.3em] mb-2 pl-1">
                  SHINJI OTA
                </span>
                <span className="block text-5xl md:text-7xl">
                  太田
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 ml-2 md:ml-4 relative">
                    真治
                  </span>
                </span>
              </h1>
              <p className="text-2xl font-light text-slate-300 tracking-wide flex items-center gap-3 h-8">
                <span className="font-mono text-cyan-400 text-lg">
                  &gt; {text}
                  <span className="inline-block w-2 h-5 ml-1 bg-cyan-400 animate-pulse"></span>
                </span>
              </p>
            </div>

            <p className="text-lg text-slate-300 max-w-lg leading-relaxed border-l-2 border-cyan-500/50 pl-6 my-8 bg-slate-950/50 backdrop-blur-sm p-4 rounded-r-lg">
              {PERSONAL_INFO.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <a
                href="#about"
                className="group relative px-8 py-4 bg-white text-black font-bold transition-transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10"></div>
                <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
                  経歴を見る <ArrowRight size={18} />
                </span>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500 hover:bg-cyan-950/30 transition-all font-mono text-sm bg-slate-950/50 backdrop-blur-sm"
              >
                Contact_Me
              </a>
            </div>

            <div className="flex items-center gap-8 pt-12 opacity-60 hover:opacity-100 transition-opacity">
              <a href="#" className="hover:text-cyan-400 transition-colors transform hover:scale-110"><Github size={24} /></a>
              <a href="#" className="hover:text-cyan-400 transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-cyan-400 transition-colors transform hover:scale-110"><Twitter size={24} /></a>
            </div>
          </div>
        </div>

        {/* Visual/Image Area - Absolute positioned for overlap */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[80%] z-10 pointer-events-auto group flex items-center justify-center">
          {/* Invisible Hover Trigger Area - Extends to the left */}
          <div className="absolute inset-y-0 -left-20 w-20 z-20"></div>

          <div className="relative w-full h-full">
            <div className="relative w-[90%] h-[90%]">
              {/* Image with heavy filters */}
              <div className="relative w-full h-full">
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
              </div>

              {/* Gradient Overlays to blend with background and text */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/60 to-[#050505] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none"></div>

              {/* Tech Decoration Lines (Static) */}
              <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-cyan-500/20 pointer-events-none"></div>
              <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-purple-500/20 pointer-events-none"></div>
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
