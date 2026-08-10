'use client';

import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Tag, Laptop, Tablet, Smartphone, RefreshCw, Info, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ProjectModal({ project, onClose }) {
  const { isDark } = useTheme();
  const [mode, setMode] = useState('info'); // 'info' | 'preview'
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [refreshKey, setRefreshKey] = useState(0);

  if (!project) return null;

  const handleRefresh = () => setRefreshKey(prev => prev + 1);

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
        className={`relative rounded-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp transition-all duration-500 ${
          mode === 'preview' ? 'max-w-5xl' : 'max-w-3xl'
        } ${th.bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full glass border transition-all cursor-pointer ${
            isDark ? 'border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40'
                   : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-indigo-300'
          }`}
        >
          <X className="w-5 h-5"/>
        </button>

        {mode === 'info' ? (
          <>
            {/* Image Header */}
            <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-3xl" style={{background:'var(--bg-surface)'}}>
              <img
                src={project.image} alt={project.title}
                className="w-full h-full object-cover object-top opacity-80 animate-fadeIn"
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
                    <>
                      <button
                        onClick={() => setMode('preview')}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold flex items-center gap-2 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-102 cursor-pointer"
                      >
                        Interactive Preview <Eye className="w-4 h-4"/>
                      </button>
                      <a href={project.demoUrl} target="_blank" rel="noreferrer"
                        className={`px-5 py-2.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                          isDark ? 'border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                                 : 'border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                        }`}>
                        Open in New Tab <ExternalLink className="w-4 h-4"/>
                      </a>
                    </>
                  )}
                </div>
                <button onClick={onClose} className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${th.muted} hover:text-indigo-600`}>
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col rounded-3xl overflow-hidden">
            {/* Toolbar Header */}
            <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4 bg-slate-950/20" style={{ borderColor: 'var(--border)' }}>
              {/* Left: Back to Info */}
              <button
                onClick={() => setMode('info')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                  isDark ? 'border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                         : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <Info className="w-3.5 h-3.5" /> Project Overview
              </button>

              {/* Center: Device Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800/10 border border-slate-800/15 backdrop-blur-md">
                {[
                  { id: 'desktop', icon: Laptop, label: 'Desktop View' },
                  { id: 'tablet', icon: Tablet, label: 'Tablet View' },
                  { id: 'mobile', icon: Smartphone, label: 'Mobile View' }
                ].map((dev) => {
                  const Icon = dev.icon;
                  const isActive = device === dev.id;
                  return (
                    <button
                      key={dev.id}
                      onClick={() => setDevice(dev.id)}
                      title={dev.label}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md'
                          : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                   : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              {/* Right: Refresh, Open link */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  title="Refresh Preview"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isDark ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                           : 'border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Website in New Tab"
                  className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                    isDark ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                           : 'border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Address Bar */}
            <div className="px-4 py-2 border-b flex items-center justify-center bg-slate-900/10" style={{ borderColor: 'var(--border)' }}>
              <div className="w-full max-w-xl px-4 py-1.5 rounded-lg border text-xs font-mono truncate text-center flex items-center justify-center gap-2 select-all"
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)',
                  color: isDark ? '#94a3b8' : '#64748b'
                }}
              >
                <span className="text-emerald-500 font-bold">https://</span>
                {project.demoUrl.replace(/^https?:\/\//, '')}
              </div>
            </div>

            {/* Frame Viewport */}
            <div className="relative p-6 sm:p-8 flex flex-col items-center justify-center bg-slate-950/20 overflow-hidden"
              style={{
                minHeight: '62vh',
                backgroundImage: isDark
                  ? 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 0)'
                  : 'radial-gradient(rgba(99,102,241,0.04) 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            >
              {/* Fallback info bar */}
              <div className="w-full max-w-2xl mb-4 p-3 rounded-xl border text-center text-[11px] flex items-center justify-center gap-2 backdrop-blur-md"
                style={{
                  borderColor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.2)',
                  backgroundColor: isDark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
                  color: isDark ? '#a5b4fc' : '#4f46e5'
                }}
              >
                <span>💡 If the preview is blank or doesn't load, please click the <strong>Open Website in New Tab</strong> button to view it directly.</span>
              </div>

              {/* Viewport Frame */}
              <div
                className="relative shadow-2xl transition-all duration-500 ease-in-out border overflow-hidden"
                style={{
                  width: device === 'desktop' ? '100%' : device === 'tablet' ? '768px' : '375px',
                  maxWidth: '100%',
                  height: '56vh',
                  borderRadius: device === 'desktop' ? '8px' : device === 'tablet' ? '16px' : '24px',
                  borderWidth: device === 'desktop' ? '1px' : device === 'tablet' ? '8px' : '12px',
                  borderColor: device === 'desktop' ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)') : (isDark ? '#1e293b' : '#334155'),
                  backgroundColor: '#ffffff'
                }}
              >
                <iframe
                  key={refreshKey}
                  src={project.demoUrl}
                  title={project.title}
                  className="w-full h-full border-none bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
