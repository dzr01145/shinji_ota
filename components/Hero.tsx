
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, Terminal, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

import profileImg from '../profile_image.jpg';

const Hero: React.FC = () => {
  // ... (existing code)

  <img
    src={profileImg}
    alt="Shinji Ota"
    className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.02]"
  />

  {/* Floating Tech Elements */ }
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
          </div >
        </div >
      </div >

  {/* Scroll indicator */ }
  < div className = "absolute bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 flex items-center gap-4 text-slate-600 font-mono text-xs animate-bounce" >
        <span className="">SCROLL TO EXPLORE</span>
        <div className="h-8 w-px bg-gradient-to-b from-slate-600 to-transparent"></div>
      </div >
    </section >
  );
};

export default Hero;
