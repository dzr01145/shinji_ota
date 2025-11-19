import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2">Portfolio</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">開発実績</h3>
          </div>
          <a href="#" className="hidden md:block text-slate-400 hover:text-white text-sm border-b border-slate-700 pb-1 hover:border-white transition-all">
            GitHubですべて見る
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 animate-pulse" /> {/* Loading placeholder */}
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                  <div className="flex gap-3">
                    {project.repoUrl && <a href={project.repoUrl} className="text-slate-400 hover:text-white"><Github size={18} /></a>}
                    {project.demoUrl && <a href={project.demoUrl} className="text-slate-400 hover:text-white"><ExternalLink size={18} /></a>}
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-slate-900 text-slate-300 rounded-full border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a href="#" className="text-slate-400 hover:text-white text-sm border-b border-slate-700 pb-1">GitHubを見る</a>
        </div>
      </div>
    </section>
  );
};

export default Projects;