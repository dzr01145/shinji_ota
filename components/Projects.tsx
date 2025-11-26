

import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-900 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest mb-2">
              PROJECTS
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">実績・事例の一部をご紹介</h3>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === category
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/5 flex flex-col h-full animate-fade-in-up"
            >
              <div className="relative h-48 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-slate-900" />
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out opacity-40 group-hover:opacity-100 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Static opacity to prevent flickering */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>

                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700 text-xs font-mono text-cyan-400">
                  {project.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-500">
                      {project.titleJa || project.title}
                    </h4>
                    {project.titleJa && (
                      <p className="text-xs text-slate-500 font-mono mt-1 group-hover:text-cyan-500/70 transition-colors">
                        {project.title}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-4 group-hover:translate-x-0">
                    {project.repoUrl && <a href={project.repoUrl} className="text-slate-400 hover:text-white transition-colors"><Github size={18} /></a>}
                    {project.demoUrl && <a href={project.demoUrl} className="text-slate-400 hover:text-white transition-colors"><ExternalLink size={18} /></a>}
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-slate-900 text-slate-300 rounded border border-slate-800 group-hover:border-cyan-500/30 transition-colors duration-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Projects;
