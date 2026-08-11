'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Terminal, Globe, Code, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import ProjectModal from '../components/ProjectModal.jsx';

export default function Projects() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const th = {
    h: isDark ? 'text-white' : 'text-slate-900',
    p: isDark ? 'text-slate-400' : 'text-slate-600',
    muted: isDark ? 'text-slate-500' : 'text-slate-500',
    badge: isDark ? 'glass border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm',
    sectionOverlay: isDark
      ? 'bg-gradient-to-br from-indigo-950/70 via-slate-950/80 to-violet-950/70'
      : 'bg-gradient-to-br from-indigo-50/90 via-white/80 to-violet-50/90',
  };

  const projects = [
    { id: 1, title: "Raj Corporation", category: "E-Commerce & Commercial", emoji: "🏢",
      description: "A premium corporate web platform designed for Raj Corporation, highlighting industrial infrastructure, company milestones, services, and corporate governance.",
      image: "/photo/my-work/rajcorp.png", tags: ["React.js", "Tailwind CSS", "Corporate Web"],
      highlights: ["Dynamic infrastructure gallery", "Modern corporate branding", "Fluid responsive layout", "Performance-optimized assets"], demoUrl: "https://rajcorp.in/", featured: true },
    { id: 2, title: "The Wave Store", category: "E-Commerce & Commercial", emoji: "🛒",
      description: "An elegant, highly interactive e-commerce platform for surfing, active apparel, and beach lifestyle products with smooth shopping workflows.",
      image: "/photo/my-work/thewavestore.png", tags: ["React.js", "Tailwind CSS", "E-Commerce"],
      highlights: ["Dynamic shopping bag", "Advanced product filtering", "Tailwind CSS styling", "Smooth layout transitions"], demoUrl: "https://www.thewavestore.in/", featured: true },
    { id: 3, title: "Elegance Fashion", category: "E-Commerce & Commercial", emoji: "👗",
      description: "A minimalist editorial style luxury fashion showcase featuring seasonal catalogs, brand lookbooks, and smooth page transitions.",
      image: "/photo/my-work/elegance.png", tags: ["Next.js", "Tailwind CSS", "UX Design"],
      highlights: ["Premium aesthetic layout", "Fluid custom image sliders", "Responsive collection grid", "Optimized media delivery"], demoUrl: "https://elegance-khaki-nu.vercel.app/" },
    { id: 4, title: "Organic Food Store", category: "E-Commerce & Commercial", emoji: "🥗",
      description: "A vibrant grocery storefront designed for health-conscious food shopping, featuring clean grids, organic product filters, and cart interactions.",
      image: "/photo/my-work/organicfood.png", tags: ["React.js", "Tailwind CSS", "Responsive Web"],
      highlights: ["Vibrant natural aesthetics", "Interactive product search", "Fully responsive design", "Fast performance scoring"], demoUrl: "https://organic-food-brown.vercel.app/" },
    { id: 5, title: "Beautyness Luxury Spa", category: "Creative & Wellness", emoji: "💆‍♀️",
      description: "A serene spa and beauty therapy landing page with integrated treatment pricing guides, service descriptions, and booking inquiries.",
      image: "/photo/my-work/beautyness.png", tags: ["HTML5", "Tailwind CSS", "JavaScript"],
      highlights: ["Tranquil user interface", "Interactive price guides", "Mobile-optimized booking flow", "Elegant typography styles"], demoUrl: "https://beautyness-luxury-spa.vercel.app/" },
    { id: 9, title: "React.js Portfolio App", category: "Web Apps & Dev", emoji: "⚛️",
      description: "Production-ready React app with modular Tailwind components and smooth animations.",
      image: "/photo/my-work/work4.png", tags: ["React.js", "Tailwind CSS", "Vite"],
      highlights: ["Modular components", "Design token variables", "Clean interfaces", "Fine animations"], demoUrl: "#" },
  ];

  const getTagStyle = (tag) => {
    const t = tag.toLowerCase();
    if (t.includes('react') || t.includes('next')) {
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
    if (t.includes('tailwind') || t.includes('css')) {
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
    if (t.includes('js') || t.includes('javascript')) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
    return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  };

  return (
    <div className="space-y-20 pb-20 pt-4">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 fade-in-up">
        <span className={`px-4 py-2 rounded-full text-xs font-bold glass border border-indigo-500/30 inline-block ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
          Showcase & Projects
        </span>
        <h1 className={`text-5xl sm:text-6xl font-extrabold font-outfit leading-tight ${th.h}`}>
          Featured <span className="gradient-text">Portfolio</span>
        </h1>
        <p className={`text-base leading-relaxed ${th.p}`}>
          Explore my collection of real-world client websites, responsive templates, and front-end experiments.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-3 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        {['All', 'E-Commerce & Commercial', 'Creative & Wellness', 'Web Apps & Dev'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-outfit transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-md shadow-indigo-500/35 scale-105'
                : isDark
                  ? 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white hover:bg-slate-800/80'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-indigo-600 hover:border-indigo-200 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
          .map((project, idx) => {
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`relative group th-card cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 ${
                  isDark ? 'bg-slate-900/40 border-white/5' : 'bg-white/80 border-slate-200 shadow-sm'
                }`}
              >
                {/* Neon Top Hover Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                {/* Background Watermark Number */}
                <span className="absolute -bottom-5 -right-3 text-7xl font-black font-outfit pointer-events-none select-none transition-colors duration-500 text-indigo-500/[0.03] group-hover:text-indigo-500/[0.08] z-0">
                  0{idx + 1}
                </span>

                <div className="space-y-4 relative z-10">
                  {/* Nested Image Frame (Polaroid / Devices style) */}
                  <div className="p-3 pb-0">
                    <div className="relative aspect-[16/10.5] overflow-hidden rounded-xl bg-slate-950/20 shadow-md" style={{ background: 'var(--bg-surface)' }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top opacity-90 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700 ease-out"
                        onError={(e) => { e.target.src = project.image.replace(/^\//, ''); }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>

                      {/* Featured label */}
                      {project.featured && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[8px] font-black uppercase bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg z-10 border border-white/10">
                          ⚡ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="px-4 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                        isDark ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {project.emoji}
                      </div>
                      <h3 className={`text-base font-extrabold font-outfit truncate ${th.h}`}>{project.title}</h3>
                    </div>
                    <p className={`text-xs leading-relaxed line-clamp-2 ${th.p}`}>
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer tags & details */}
                <div className="px-4 pb-4 pt-4 mt-4 border-t flex items-center justify-between relative z-10" style={{ borderColor: 'var(--border)' }}>
                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1 max-w-[65%]">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 text-[9px] font-bold border rounded uppercase tracking-wider ${getTagStyle(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className={`px-2 py-0.5 text-[9px] font-bold border rounded ${isDark ? 'bg-slate-900/60 text-slate-400 border-white/5' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Explore details text */}
                  <span className="text-[10px] font-bold text-indigo-500 group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
                    Explore Project
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {/* CTA SECTION */}
      <section className={`relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center space-y-6 ${th.sectionOverlay}`}>
        <div className="absolute inset-0 dot-grid opacity-30"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-outfit leading-tight ${th.h}`}>
            Interested in working together?
          </h2>
          <p className={`text-sm leading-relaxed ${th.p}`}>
            I am currently open to web design freelancing opportunities and collaborative projects. Let's create something exceptional.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => router.push('/contact')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs hover:shadow-lg transition-shadow shadow-md cursor-pointer flex items-center gap-2"
            >
              Get In Touch <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
