import React from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Tag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ProjectModal({ project, onClose }) {
  const { isDark } = useTheme();
  if (!project) return null;

  const th = {
    h:    isDark ? 'text-white'     : 'text-slate-900',
    p:    isDark ? 'text-slate-400' : 'text-slate-600',
    muted:isDark ? 'text-slate-500' : 'text-slate-500',
    bg:   isDark
      ? 'bg-slate-900/97 border border-white/10'
      : 'bg-white/97 border border-slate-200/80',
    label:isDark ? 'text-slate-500' : 'text-slate-400',
    overlay: isDark ? 'bg-slate-950/75' : 'bg-slate-900/50',
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl animate-fadeIn ${th.overlay}`}>
      <div
        className={`relative rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp ${th.bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full glass border transition-all cursor-pointer ${
            isDark ? 'border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40'
                   : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-indigo-300'
          }`}
        >
          <X className="w-5 h-5"/>
        </button>

        {/* Image header */}
        <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-3xl" style={{background:'var(--bg-surface)'}}>
          <img
            src={project.image} alt={project.title}
            className="w-full h-full object-cover object-top opacity-80"
            onError={(e)=>{e.target.src=project.image.replace(/^\//,'');}}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark?'from-slate-900 via-slate-900/50':'from-white via-white/40'} to-transparent`}></div>
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold glass border border-white/20 text-white uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className={`text-2xl sm:text-3xl font-bold font-outfit ${th.h}`}>{project.title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-7">
          <p className={`leading-relaxed ${th.p}`}>{project.description}</p>

          {/* Tags */}
          <div>
            <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 font-outfit ${th.label}`}>
              <Tag className="w-3.5 h-3.5 text-indigo-500"/> Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag,i)=><span key={i} className="th-tag">{tag}</span>)}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights?.length>0 && (
            <div>
              <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 font-outfit ${th.label}`}>
                <Layers className="w-3.5 h-3.5 text-violet-500"/> Key Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((h,i)=>(
                  <li key={i} className={`flex items-center gap-2.5 text-sm ${th.h}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/>{h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex items-center justify-between gap-4 border-t" style={{borderColor:'var(--border)'}}>
            <div className="flex items-center gap-3">
              {project.demoUrl && project.demoUrl!=='#' && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold flex items-center gap-2 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow">
                  Live Preview <ExternalLink className="w-4 h-4"/>
                </a>
              )}
            </div>
            <button onClick={onClose} className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${th.muted} hover:text-indigo-600`}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
