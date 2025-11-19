import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-xl text-white group">
          <div className="bg-cyan-500/10 p-2 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
            <Terminal className="text-cyan-400" size={24} />
          </div>
          <span className="tracking-wider">{PERSONAL_INFO.name}</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Hire Me
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
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-800/50"
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