import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <AIChat />
    </div>
  );
};

export default App;