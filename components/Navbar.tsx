import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PERSONAL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // External link or different page route
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    // In-page anchor link
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Already on home page
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: '経歴', href: '#about' },
    { name: 'スキル', href: '#skills' },
    { name: '実績', href: '#projects' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
        ? 'bg-[#050505]/80 backdrop-blur-md border-b border-slate-800 py-3'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="bg-white/5 border border-white/10 p-2 rounded group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all duration-300">
            <Code className="text-white group-hover:text-black transition-colors" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-wider leading-none group-hover:text-cyan-400 transition-colors">
              {PERSONAL_INFO.jaName}
            </span>
            <span className="text-[10px] text-slate-500 tracking-[0.1em] uppercase leading-none mt-1 group-hover:text-cyan-500/70 transition-colors">
              {PERSONAL_INFO.name}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors relative group cursor-pointer ${location.pathname === link.href ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
            >
              <span className="relative z-10">{link.name}</span>
              <span className={`absolute bottom-[-4px] left-0 h-[2px] bg-cyan-500 transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-2 bg-white text-black text-sm font-bold hover:bg-cyan-400 transition-colors cursor-pointer rounded-sm"
          >
            ご相談・お問い合わせ
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl animate-fade-in-up">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-xl font-medium py-3 border-b border-slate-900 cursor-pointer ${location.pathname === link.href ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;