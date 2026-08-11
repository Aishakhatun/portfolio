'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, Sparkles, Code, Layout, Smartphone,
  Briefcase, GraduationCap, Zap, Globe, Star,
  Terminal, Eye
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

/* ── Typing text ────────────────────────────────────────── */
function TypingText({ phrases }) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState('');
  useEffect(() => {
    const full = phrases[idx], speed = deleting ? 38 : 75;
    const t = setTimeout(() => {
      if (!deleting && char < full.length) { setDisplay(full.slice(0, char+1)); setChar(c=>c+1); }
      else if (!deleting && char === full.length) { setTimeout(()=>setDeleting(true), 2200); }
      else if (deleting && char > 0) { setDisplay(full.slice(0, char-1)); setChar(c=>c-1); }
      else { setDeleting(false); setIdx(i=>(i+1)%phrases.length); }
    }, speed);
    return ()=>clearTimeout(t);
  }, [char, deleting, idx, phrases]);
  return <span className="gradient-text typing-cursor">{display}</span>;
}

/* ── Particles ──────────────────────────────────────────── */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({length:22}).map((_,i)=>(
        <div key={i} className="particle" style={{
          left:`${Math.random()*100}%`, bottom:'-10px',
          width:`${2+Math.random()*3}px`, height:`${2+Math.random()*3}px`,
          borderRadius:'50%',
          background:['#6366f1','#8b5cf6','#06b6d4','#ec4899','#10b981'][Math.floor(Math.random()*5)],
          animationDuration:`${5+Math.random()*9}s`, animationDelay:`${Math.random()*9}s`, opacity:0,
        }}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME
   ══════════════════════════════════════════════════════════ */
export default function Home() {
  const { isDark } = useTheme();
  const router = useRouter();

  /* Theme shorthands */
  const th = {
    h: isDark ? 'text-white' : 'text-slate-900',
    p: isDark ? 'text-slate-400' : 'text-slate-600',
    muted: isDark ? 'text-slate-500' : 'text-slate-500',
    badge: isDark ? 'glass border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm',
    pill: isDark ? 'glass border-white/10 text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300' : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 shadow-sm',
    sectionOverlay: isDark
      ? 'bg-gradient-to-br from-indigo-950/70 via-slate-950/80 to-violet-950/70'
      : 'bg-gradient-to-br from-indigo-50/90 via-white/80 to-violet-50/90',
    ctaInner: isDark
      ? { background: 'linear-gradient(135deg,rgba(15,10,30,0.97),rgba(10,10,26,0.97))' }
      : { background: 'linear-gradient(135deg,rgba(240,244,255,0.98),rgba(245,240,255,0.98))' },
  };

  const stats = [
    { label:"Current Role",  value:"Web Designer", desc:"@ Xipra Technology",    icon:Briefcase,    color:"from-indigo-500 to-violet-600" },
    { label:"Education",     value:"Comp. Eng.",   desc:"8th Sem • SPU Visnagar", icon:GraduationCap,color:"from-cyan-500 to-blue-600" },
    { label:"Core Stack",    value:"React + CSS",  desc:"HTML5 • Tailwind • JS",  icon:Code,         color:"from-violet-500 to-pink-600" },
    { label:"Satisfaction",  value:"100%",         desc:"Responsive & Modern",    icon:Star,         color:"from-amber-500 to-orange-500" },
  ];

  const orbitalIcons = [
    { icon:Code,       delay:'0s',    color:'text-indigo-500', bg: isDark?'bg-indigo-900/60':'bg-indigo-100' },
    { icon:Layout,     delay:'-2.5s', color:'text-cyan-500',   bg: isDark?'bg-cyan-900/60'  :'bg-cyan-100'   },
    { icon:Smartphone, delay:'-5s',   color:'text-violet-500', bg: isDark?'bg-violet-900/60':'bg-violet-100' },
    { icon:Globe,      delay:'-7.5s', color:'text-emerald-500',bg: isDark?'bg-emerald-900/60':'bg-emerald-100'},
  ];

  const techStack = ["HTML5","CSS3","JavaScript","React.js","Tailwind CSS","Bootstrap","Figma","C / C++"];

  const onTilt = (e) => {
    const el=e.currentTarget, r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    el.style.transform=`perspective(900px) rotateX(${-y*12}deg) rotateY(${x*12}deg) translateZ(8px)`;
  };
  const offTilt = (e) => { e.currentTarget.style.transform=''; };

  return (
    <div className="space-y-28 pb-24">

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center">
        <Particles />

        {/* Glow halos */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: isDark ? 'rgba(99,102,241,0.10)' : 'rgba(99,102,241,0.07)' }}></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: isDark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.06)' }}></div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Text */}
          <div className="space-y-8 text-center lg:text-left fade-in-up">
            {/* Available badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-emerald-500/30 text-emerald-600 text-xs font-bold tracking-widest uppercase pulse-badge">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              <Sparkles className="w-3.5 h-3.5" />
              Available for Projects
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold font-outfit leading-[1.08] tracking-tight ${th.h}`}>
                Hi, I'm
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-outfit leading-[1.08] tracking-tight text-glow">
                <span className="gradient-text">Aisha Sabugar</span>
              </h1>
            </div>

            {/* Typing */}
            <div className={`text-xl sm:text-2xl font-bold font-outfit ${th.p}`}>
              I build{' '}<TypingText phrases={["Responsive Websites","React.js Apps","Beautiful UI/UX","Admin Dashboards","Figma Prototypes","Creative Interfaces"]}/>
            </div>

            {/* Description */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${th.p}`}>
              Web Designer at{' '}
              <span className="text-indigo-600 font-semibold">Xipra Technology</span> &amp; Computer Engineering student at{' '}
              <span className="text-cyan-600 font-semibold">SPU Visnagar</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => router.push('/projects')}
                className="group relative px-8 py-4 rounded-full text-white font-bold text-sm overflow-hidden cursor-pointer transition-all hover:scale-105 shadow-lg shadow-indigo-500/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500"></span>
                <span className="relative flex items-center gap-2">
                  Explore My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => router.push('/contact')}
                className={`px-8 py-4 rounded-full glass border font-semibold text-sm transition-all hover:scale-105 cursor-pointer btn-glow ${
                  isDark ? 'border-white/15 text-slate-300 hover:text-white hover:border-indigo-500/60'
                         : 'border-indigo-200 text-indigo-700 hover:text-indigo-900 hover:border-indigo-400'
                }`}
              >
                Contact Me
              </button>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className={`text-xs font-bold uppercase tracking-widest mr-2 ${th.muted}`}>Stack:</span>
              {["React.js","Tailwind CSS","JS","HTML5","CSS3","Figma"].map((t,i)=>(
                <span key={i} className={`px-3 py-1 text-xs font-medium border rounded-full transition-all cursor-default ${th.pill}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right: 3D Visual */}
          <div className="flex items-center justify-center fade-in-up-delay relative w-full max-w-full overflow-hidden">
            <div className="relative w-[360px] h-[360px] scale-75 sm:scale-95 md:scale-100 origin-center transition-all duration-300 flex-shrink-0">
              <div className="scan-line" style={{zIndex:5}}></div>
              <div className="ring absolute inset-0"></div>

              {/* Sphere center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="icon-sphere w-52 h-52">
                  <div className="text-center space-y-2">
                    <Terminal className={`w-16 h-16 mx-auto animate-float ${isDark?'text-indigo-200':'text-indigo-500'}`} />
                    <span className={`text-xs font-bold tracking-widest uppercase font-outfit block ${isDark?'text-indigo-200':'text-indigo-600'}`}>Web Dev</span>
                  </div>
                </div>
              </div>

              {/* Orbiting icons */}
              {orbitalIcons.map((item,i)=>{
                const Icon=item.icon;
                return (
                  <div key={i} className="orbit-item" style={{'--start':`${i*90}deg`,'--delay':item.delay,animationDelay:item.delay}}>
                    <div className={`w-10 h-10 rounded-xl ${item.bg} border border-white/10 flex items-center justify-center ${item.color} backdrop-blur-md shadow-md`}>
                      <Icon className="w-5 h-5"/>
                    </div>
                  </div>
                );
              })}

              {/* Floating labels */}
              <div className="absolute -bottom-8 left-0 animate-float-delay">
                <div className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-lg border ${
                  isDark ? 'glass border-indigo-500/20 text-indigo-300' : 'bg-white border-indigo-100 text-indigo-600 shadow-indigo-100'
                }`}>✦ Xipra Technology</div>
              </div>
              <div className="absolute -top-8 right-0 animate-float-delay2">
                <div className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-lg border ${
                  isDark ? 'glass border-cyan-500/20 text-cyan-300' : 'bg-white border-cyan-100 text-cyan-600 shadow-cyan-100'
                }`}>⚛️ React Developer</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ STATS ════════════════════════════════════════════ */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-5 fade-in-up-delay2">
        {stats.map((stat,idx)=>{
          const Icon=stat.icon;
          return (
            <div key={idx} className="shimmer-card th-card p-6 space-y-3 cursor-default card-lift" onMouseMove={onTilt} onMouseLeave={offTilt}>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md`}>
                <Icon className="w-5 h-5"/>
              </div>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest font-outfit block ${th.muted}`}>{stat.label}</span>
                <span className={`text-xl font-extrabold font-outfit block count-up ${th.h}`}>{stat.value}</span>
                <span className={`text-xs ${th.muted}`}>{stat.desc}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══ TECH STACK + 3D CUBE ══════════════════════════════ */}
      <section className={`relative overflow-hidden rounded-3xl ${th.sectionOverlay}`}>
        <div className="absolute inset-0 dot-grid opacity-30 rounded-3xl"></div>

        {/* glow blobs */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-500/08 rounded-full blur-3xl -translate-y-1/2"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-14 p-10 sm:p-16">
          {/* Cube */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 rounded-full spin-slow" style={{border:'1px solid rgba(99,102,241,0.2)'}}></div>
                <div className="absolute w-48 h-48 rounded-full spin-rev" style={{border:'1px solid rgba(6,182,212,0.15)'}}></div>
              </div>
              <div className="cube-wrapper relative z-10"><div className="cube">
                <div className="cube-face cube-face--front">💻</div>
                <div className="cube-face cube-face--back">⚛️</div>
                <div className="cube-face cube-face--left">🎨</div>
                <div className="cube-face cube-face--right">📱</div>
                <div className="cube-face cube-face--top">✦</div>
                <div className="cube-face cube-face--bottom">🚀</div>
              </div></div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left space-y-6">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest font-outfit">Technical Expertise</span>
            <h2 className={`text-4xl sm:text-5xl font-extrabold font-outfit leading-tight ${th.h}`}>
              Technologies I <span className="gradient-text-warm">Master</span>
            </h2>
            <p className={`text-sm leading-relaxed max-w-lg ${th.p}`}>
              From semantic HTML foundations to reactive, component-driven React applications — built for performance and visual impact.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {techStack.map((s,i)=>(
                <span key={i} className={`shimmer-card px-5 py-2.5 text-xs font-bold border rounded-xl hover:scale-105 transition-all cursor-default ${th.pill}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════════════════════════ */}
      <section className="animated-border">
        <div className="rounded-3xl p-12 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-10" style={th.ctaInner}>
          <div className="text-center md:text-left space-y-3">
            <h3 className={`text-3xl sm:text-4xl font-extrabold font-outfit leading-tight ${th.h}`}>
              Got a project idea?{' '}
              <span className="gradient-text">Let's build it.</span>
            </h3>
            <p className={`text-sm max-w-lg ${th.muted}`}>
              Open to freelance, design collaboration, and full-time opportunities.
            </p>
          </div>
          <button
            onClick={()=>router.push('/contact')}
            className="shrink-0 group relative px-10 py-5 rounded-full text-white font-extrabold text-base overflow-hidden cursor-pointer transition-all hover:scale-105 shadow-xl shadow-indigo-500/30"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500"></span>
            <span className="relative flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-300"/>
              Start a Conversation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </span>
          </button>
        </div>
      </section>



    </div>
  );
}
