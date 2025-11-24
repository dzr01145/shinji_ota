import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import ScrollObserver from './components/ScrollObserver';

import PasswordGate from './components/PasswordGate';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const auth = localStorage.getItem('site_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 min-h-screen overflow-x-hidden">
      <Navbar />
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
      <AIChat />
    </div>
  );
};

export default App;