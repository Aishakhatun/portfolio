'use client';

import React, { useState } from 'react';
import { Lightbulb, Sliders, Settings, BarChart3, CheckCircle2, ArrowRight, Zap, Code, Layout, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Services({ setActivePage }) {
  const { isDark } = useTheme();
  const [projectType, setProjectType] = useState('landing');
  const [responsiveNeeded, setResponsiveNeeded] = useState(true);
  const [reactNeeded, setReactNeeded] = useState(true);

  const th = {
    h:     isDark ? 'text-white'     : 'text-slate-900',
    p:     isDark ? 'text-slate-400' : 'text-slate-600',
    muted: isDark ? 'text-slate-500' : 'text-slate-500',
    num:   isDark ? 'text-indigo-900' : 'text-indigo-200',
    sect:  isDark
      ? 'bg-gradient-to-br from-slate-950 via-indigo-950/40 to-violet-950/40'
      : 'bg-gradient-to-br from-indigo-50 via-white to-violet-50',
    estimatorBg: isDark
      ? 'bg-gradient-to-br from-indigo-950 via-slate-950 to-violet-950'
      : 'bg-gradient-to-br from-indigo-50 via-white to-violet-50/80',
    selectCls: isDark
      ? 'bg-slate-900 text-slate-200 border-slate-700 focus:border-indigo-500'
      : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-400',
    resultBg: isDark
      ? 'bg-indigo-600/20 border border-indigo-500/30'
      : 'bg-indigo-600/10 border border-indigo-300/50',
    estimatorPanel: isDark
      ? 'glass border border-white/10'
      : 'bg-white/80 border border-indigo-100 shadow-sm',
  };

  const onTilt=(e)=>{
    const el=e.currentTarget, r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    el.style.transform=`perspective(900px) rotateX(${-y*10}deg) rotateY(${x*10}deg) translateZ(6px)`;
  };
  const offTilt=(e)=>{e.currentTarget.style.transform='';};

  const services = [
    { id:"web-design", icon:Lightbulb, title:"Web Designing & UI/UX", subtitle:"Clean & Responsive",
      gradient:"from-amber-500 to-orange-500",
      description:"Clean, responsive, and user-friendly websites that look amazing, load fast, and guide users intuitively.",
      features:["Semantic HTML5 & Modern CSS3","Mobile-first responsive","Performance optimised","Cross-browser compatible"],
      backDesc:"Translating design concepts into clean, standards-compliant HTML/CSS implementations that work on every device.",
      backTags:["HTML5","CSS3","Flexbox","Grid"] },
    { id:"creative-ideas", icon:Sliders, title:"Creative Concepts & Prototyping", subtitle:"Visual Storytelling",
      gradient:"from-violet-500 to-indigo-600",
      description:"Every color has a mood, every layout has a reason, every interaction should feel effortless.",
      features:["Figma design to code","Harmonious color palettes","Glassmorphism & micro-animations","Interactive UI prototypes"],
      backDesc:"From wireframes or Figma exports, I translate high-fidelity designs into fully interactive, animated web pages.",
      backTags:["Figma","Animations","Prototyping","UX"] },
    { id:"react-arch", icon:Settings, title:"React Component Architecture", subtitle:"Modular & Scalable",
      gradient:"from-cyan-500 to-blue-600",
      description:"Modular, well-structured React codebases using Tailwind design tokens and scalable state management.",
      features:["Reusable React JSX components","Tailwind CSS design tokens","Scalable project structure","State management patterns"],
      backDesc:"Building component libraries and React apps that are easy to maintain, extend, and deploy using Vite & Tailwind.",
      backTags:["React.js","Tailwind","Vite","JavaScript"] },
    { id:"admin", icon:BarChart3, title:"Admin Dashboards & Web Apps", subtitle:"Data Management UI",
      gradient:"from-emerald-500 to-teal-600",
      description:"Custom admin portals and dashboards to manage users, content, and analytics from one central interface.",
      features:["Interactive tables & filters","Form validation & modals","Status badges & metric cards","Dashboard grid layouts"],
      backDesc:"From content management to complex data dashboards — I design admin interfaces that are powerful yet easy to use.",
      backTags:["Dashboards","Forms","Tables","Analytics UI"] },
  ];

  const processSteps = [
    { step:"01", title:"Discovery",       desc:"Understanding goals, audience, and scope before writing any code.", icon:Globe   },
    { step:"02", title:"UI/UX Design",    desc:"Visual concepts, layout grids, color palettes, and glassmorphic elements.", icon:Layout  },
    { step:"03", title:"Development",     desc:"Modular components, Tailwind tokens, smooth interactions, and accessibility.", icon:Code    },
    { step:"04", title:"Launch & Test",   desc:"Cross-device testing, performance optimisation, and final deployment.", icon:Zap     },
  ];

  const getEstimate = () => {
    let days = 3;
    if (projectType==='webapp') days+=5;
    if (projectType==='dashboard') days+=7;
    if (responsiveNeeded) days+=1;
    if (reactNeeded) days+=2;
    return days;
  };

  const Toggle = ({ value, onChange }) => (
    <div
      className={`w-10 h-5 rounded-full relative flex items-center cursor-pointer transition-colors !duration-300`}
      style={{ background: value ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : (isDark ? '#334155' : '#e2e8f0') }}
      onClick={() => onChange(!value)}
    >
      <div className={`w-4 h-4 rounded-full bg-white absolute mx-0.5 shadow transition-transform !duration-300 ${value ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <div className="space-y-20 pb-20 pt-4">

      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 fade-in-up">
        <span className={`px-4 py-2 rounded-full text-xs font-bold glass border border-indigo-500/30 inline-block ${isDark?'text-indigo-300':'text-indigo-600'}`}>
          What I'm Good At
        </span>
        <h1 className={`text-5xl sm:text-6xl font-extrabold font-outfit leading-tight ${th.h}`}>
          Services & <span className="gradient-text">Capabilities</span>
        </h1>
        <p className={`text-base leading-relaxed ${th.p}`}>
          End-to-end web design and front-end development — from pixel-perfect UI to production-grade React applications.
        </p>
      </div>

      {/* 3D FLIP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc)=>{
          const Icon=svc.icon;
          return (
            <div key={svc.id} className="flip-card h-72">
              <div className="flip-card-inner">
                {/* FRONT */}
                <div className={`flip-card-front th-card`}>
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${svc.gradient} flex items-center justify-center text-white shadow-lg`}>
                          <Icon className="w-7 h-7"/>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${th.muted}`}>{svc.subtitle}</span>
                      </div>
                      <h3 className={`text-xl font-bold font-outfit ${th.h}`}>{svc.title}</h3>
                      <p className={`text-sm leading-relaxed ${th.p}`}>{svc.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-500 text-xs font-bold uppercase tracking-wider">
                      <span>Hover to see details</span>
                      <ArrowRight className="w-3.5 h-3.5"/>
                    </div>
                  </div>
                </div>
                {/* BACK */}
                <div className={`flip-card-back bg-gradient-to-br ${svc.gradient} shadow-xl`}>
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold font-outfit text-white">{svc.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{svc.backDesc}</p>
                      <ul className="space-y-2">
                        {svc.features.map((f,i)=>(
                          <li key={i} className="flex items-center gap-2 text-white/90 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0"/>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {svc.backTags.map((t,i)=>(
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-xs font-bold">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className={`text-center text-xs ${th.muted}`}>☝️ Hover over each card to flip it and see details</p>

      {/* PROCESS WORKFLOW */}
      <div className={`relative p-8 sm:p-12 rounded-3xl overflow-hidden ${th.sect}`}>
        <div className="absolute inset-0 dot-grid opacity-20 rounded-3xl"></div>
        <div className="relative z-10 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-violet-500 uppercase tracking-widest font-outfit">Methodology</span>
            <h2 className={`text-3xl font-bold font-outfit ${th.h}`}>
              How I Bring Projects to <span className="gradient-text">Life</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step,idx)=>{
              const Icon=step.icon;
              return (
                <div key={idx} className="th-card p-6 space-y-4 cursor-default" onMouseMove={onTilt} onMouseLeave={offTilt}>
                  <div className="flex items-center justify-between">
                    <span className={`text-4xl font-black font-outfit ${th.num}`}>{step.step}</span>
                    <Icon className="w-6 h-6 text-indigo-500"/>
                  </div>
                  <h3 className={`text-lg font-bold font-outfit ${th.h}`}>{step.title}</h3>
                  <p className={`text-xs leading-relaxed ${th.p}`}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SCOPE ESTIMATOR */}
      <div className={`relative rounded-3xl overflow-hidden ${th.estimatorBg}`}>
        <div className="absolute inset-0 grid-overlay opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-3">
            <span className={`px-4 py-2 rounded-full text-xs font-bold glass border border-yellow-500/30 text-yellow-600 uppercase tracking-wider inline-flex items-center gap-2`}>
              <Zap className="w-3.5 h-3.5"/> Interactive Tool
            </span>
            <h2 className={`text-3xl font-bold font-outfit ${th.h}`}>Estimate Your Project Scope</h2>
            <p className={`text-sm ${th.muted}`}>Configure requirements and get an instant timeline estimate.</p>
          </div>

          <div className={`max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl ${th.estimatorPanel}`}>
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-indigo-600 uppercase tracking-wider block font-outfit">Project Type</label>
                <select value={projectType} onChange={(e)=>setProjectType(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none cursor-pointer transition-all ${th.selectCls}`}
                >
                  <option value="landing">Landing Page / Portfolio</option>
                  <option value="webapp">Multi-Page Web App</option>
                  <option value="dashboard">Admin Dashboard</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <Toggle value={responsiveNeeded} onChange={setResponsiveNeeded}/>
                <span className={`text-sm font-medium ${th.h}`}>Full Responsive Design</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Toggle value={reactNeeded} onChange={setReactNeeded}/>
                <span className={`text-sm font-medium ${th.h}`}>React.js + Tailwind CSS</span>
              </label>
            </div>

            {/* Result */}
            <div className={`flex flex-col items-center justify-center p-6 rounded-2xl text-center space-y-4 ${th.resultBg}`}>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-outfit">Estimated Timeline</span>
              <div className={`text-6xl font-black font-outfit ${th.h}`}>
                ~{getEstimate()}
                <span className="text-xl font-medium text-indigo-500 ml-2">days</span>
              </div>
              <p className={`text-xs ${th.muted}`}>Includes design, development, and testing.</p>
              <button
                onClick={() => setActivePage('contact')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm hover:shadow-lg transition-shadow shadow-md cursor-pointer"
              >
                Start This Project →
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
