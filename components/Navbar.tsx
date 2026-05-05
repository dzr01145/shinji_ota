import React, { useState, useEffect } from 'react';
import { Menu, X, Code, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PERSONAL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topMenuOpen, setTopMenuOpen] = useState(false);
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
    setTopMenuOpen(false);

    // External link or different page route
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    const reviseAnchorMap: Record<string, string> = {
      '#about': '#profile-detail',
      '#experience': '#career',
      '#skills': '#domains',
      '#projects': '#projects',
      '#contact': '#contact'
    };

    if ((location.pathname === '/' || location.pathname === '/revise') && href.startsWith('#')) {
      const targetHref = reviseAnchorMap[href] || href;
      const targetId = targetHref.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      return;
    }

    // In-page anchor link
    if (location.pathname !== '/old') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const targetHref = reviseAnchorMap[href] || href;
        const targetId = targetHref.replace('#', '');
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

    // Already on old home page
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
    { name: 'TOP', href: '/' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Blog', href: '/blog' },
  ];

  const topSections = [
    { name: 'トップ', label: 'Top', href: '#top' },
    { name: 'プロフィール', label: 'Profile', href: '#profile-detail' },
    { name: '視点', label: 'Positioning', href: '#positioning' },
    { name: '経歴', label: 'Career', href: '#career' },
    { name: '専門領域', label: 'Domains', href: '#domains' },
    { name: '実績', label: 'Work', href: '#projects' },
    { name: '発信', label: 'Reports', href: '#publications' },
    { name: 'お問い合わせ', label: 'Contact', href: '#contact' }
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.pathname === '/' || location.pathname === '/revise';
    }
    return location.pathname === href;
  };

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
            link.href === '/' ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setTopMenuOpen(true)}
                onMouseLeave={() => setTopMenuOpen(false)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors relative group cursor-pointer inline-flex items-center gap-1.5 ${isActiveLink(link.href) ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <ChevronDown size={13} className={`transition-transform ${topMenuOpen ? 'rotate-180' : ''}`} />
                  <span className={`absolute bottom-[-4px] left-0 h-[2px] bg-cyan-500 transition-all duration-300 ${isActiveLink(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </a>
                {topMenuOpen && (
                  <div className="absolute left-1/2 top-full mt-4 w-48 -translate-x-1/2 border border-white/10 bg-[#050505]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-md">
                    {topSections.map((section) => (
                      <a
                        key={section.href}
                        href={section.href}
                        onClick={(e) => handleNavClick(e, section.href)}
                        className="group flex items-center justify-between rounded px-3 py-2 text-left transition-colors hover:bg-cyan-950/40"
                      >
                        <span className="text-[12px] font-light text-slate-300 group-hover:text-white">{section.name}</span>
                        <span className="text-[9px] uppercase tracking-[0.18em] text-slate-600 group-hover:text-cyan-300">{section.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative group cursor-pointer ${isActiveLink(link.href) ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={`absolute bottom-[-4px] left-0 h-[2px] bg-cyan-500 transition-all duration-300 ${isActiveLink(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
              </a>
            )
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-2 bg-white text-black text-sm font-bold hover:bg-cyan-400 transition-colors cursor-pointer rounded-sm"
          >
            ご相談・お問い合わせ
          </a>
          <a
            href="/old"
            onClick={(e) => handleNavClick(e, '/old')}
            className="text-[10px] uppercase tracking-[0.12em] text-slate-700 transition-colors hover:text-slate-400"
          >
            old
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
            link.href === '/' ? (
              <div key={link.name} className="border-b border-slate-900 pb-3">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between text-xl font-medium py-3 cursor-pointer ${isActiveLink(link.href) ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                    }`}
                >
                  {link.name}
                  <ChevronDown size={16} className="text-slate-500" />
                </a>
                <div className="grid grid-cols-2 gap-2">
                  {topSections.map((section) => (
                    <a
                      key={section.href}
                      href={section.href}
                      onClick={(e) => handleNavClick(e, section.href)}
                      className="rounded border border-slate-900 bg-slate-950/70 px-3 py-2"
                    >
                      <span className="block text-[13px] text-slate-200">{section.name}</span>
                      <span className="block text-[9px] uppercase tracking-[0.16em] text-slate-600">{section.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xl font-medium py-3 border-b border-slate-900 cursor-pointer ${isActiveLink(link.href) ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                  }`}
              >
                {link.name}
              </a>
            )
          ))}
          <div className="flex items-center gap-4 pt-1">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-sm font-bold text-cyan-300"
            >
              ご相談・お問い合わせ
            </a>
            <a
              href="/old"
              onClick={(e) => handleNavClick(e, '/old')}
              className="text-[10px] uppercase tracking-[0.12em] text-slate-700"
            >
              old
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
