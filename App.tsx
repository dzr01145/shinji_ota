import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import ScrollObserver from './components/ScrollObserver';
import AIPlayground from './components/AIPlayground';
import Blog from './components/Blog';
import PrivacyPolicy from './components/PrivacyPolicy';

const Home: React.FC = () => (
  <ScrollObserver>
    <main>
      <Hero />
      <div className="scroll-animate">
        <About />
      </div>
      <div className="scroll-animate">
        <Skills />
      </div>
      <div className="scroll-animate">
        <Projects />
      </div>
      <div className="scroll-animate">
        <Contact />
      </div>
    </main>
  </ScrollObserver>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 min-h-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-tools" element={<AIPlayground />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <AIChat />
      </div>
    </Router>
  );
};

export default App;