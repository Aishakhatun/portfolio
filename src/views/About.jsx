'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, MapPin, Phone, Mail, GraduationCap, Briefcase,
  Code, Award, BookOpen, Heart, Terminal, Layout, Star,
  Lightbulb, Sliders, Settings, BarChart3, CheckCircle2, ArrowRight, Zap, Globe
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function About() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [projectType, setProjectType] = useState('landing');
  const [responsiveNeeded, setResponsiveNeeded] = useState(true);
  const [reactNeeded, setReactNeeded] = useState(true);

  const th = {
    h:    isDark ? 'text-white'     : 'text-slate-900',
    p:    isDark ? 'text-slate-400' : 'text-slate-600',
    muted:isDark ? 'text-slate-500' : 'text-slate-500',
    sect: isDark
      ? 'bg-gradient-to-br from-indigo-950/80 via-violet-950/60 to-cyan-950/60'
      : 'bg-gradient-to-br from-indigo-50 via-violet-50/70 to-cyan-50/60',
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
    num:   isDark ? 'text-indigo-900' : 'text-indigo-200',
  };

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

  const onTilt=(e)=>{
    const el=e.currentTarget, r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    el.style.transform=`perspective(800px) rotateX(${-y*12}deg) rotateY(${x*12}deg) translateZ(8px)`;
  };
  const offTilt=(e)=>{e.currentTarget.style.transform='';};

  const personalDetails = [
    { label:"Full Name",  value:"Sabugar Aishakhatun Sirajahmed", icon:User,         color:"text-indigo-500" },
    { label:"Role",       value:"Web Designer & Front-End Dev",   icon:Briefcase,     color:"text-violet-500" },
    { label:"Company",    value:"Xipra Technology",               icon:Award,         color:"text-cyan-500"   },
    { label:"University", value:"Sankalchand Patel University",   icon:GraduationCap, color:"text-emerald-500"},
    { label:"Degree",     value:"B.Tech Computer Engineering",    icon:BookOpen,      color:"text-pink-500"   },
    { label:"Location",   value:"Himatnagar 383001, Gujarat",     icon:MapPin,        color:"text-amber-500"  },
    { label:"Languages",  value:"English, Hindi, Gujarati",       icon:Globe,         color:"text-blue-500"   },
    { label:"Email",      value:"aishasabugar1@gmail.com",        icon:Mail,          color:"text-rose-500"   },
  ];

  const skillCategories = [
    { id:'all',       label:'All Skills'  },
    { id:'frontend',  label:'Front-End'   },
    { id:'styling',   label:'Styling'     },
    { id:'databases', label:'Databases'   },
    { id:'languages', label:'Languages'   },
  ];

  const skills = [
    { name:"HTML5 & Semantic Markup",    category:"frontend",  pct:95, gradient:"from-amber-400 to-orange-500"  },
    { name:"CSS3 & Responsive Layouts",  category:"styling",   pct:90, gradient:"from-sky-400 to-cyan-500"      },
    { name:"JavaScript (ES6+)",          category:"frontend",  pct:85, gradient:"from-yellow-400 to-amber-500"  },
    { name:"React.js",                   category:"frontend",  pct:82, gradient:"from-cyan-400 to-blue-600"     },
    { name:"Tailwind CSS",               category:"styling",   pct:88, gradient:"from-indigo-400 to-violet-600" },
    { name:"Bootstrap",                  category:"styling",   pct:85, gradient:"from-purple-400 to-indigo-600" },
    { name:"Figma Design Translation",   category:"styling",   pct:80, gradient:"from-pink-400 to-rose-500"     },
    { name:"MongoDB",                    category:"databases", pct:80, gradient:"from-emerald-500 to-green-600"  },
    { name:"MySQL",                      category:"databases", pct:78, gradient:"from-blue-400 to-cyan-500"     },
    { name:"PostgreSQL",                 category:"databases", pct:75, gradient:"from-blue-500 to-indigo-600"   },
    { name:"C & C++ Programming",        category:"languages", pct:75, gradient:"from-emerald-400 to-teal-600"  },
  ];

  const filtered = activeTab==='all' ? skills : skills.filter(s=>s.category===activeTab);

  const timeline = [
    { role:"Web Designer", org:"Xipra Technology", period:"Present",
      icon:Briefcase, color:"from-indigo-500 to-violet-600",
      desc:"Designing clean, user-friendly, and high-performance websites. Building client UI solutions using HTML, CSS, JavaScript, and modern front-end frameworks." },
    { role:"B.Tech — Computer Engineering", org:"Sankalchand Patel University, Visnagar", period:"8th Semester",
      icon:GraduationCap, color:"from-cyan-500 to-blue-600",
      desc:"Focusing on Software Engineering, Web Development, Computer Architecture, Data Structures, and Algorithmic Problem Solving." },
  ];

  return (
    <div className="space-y-20 pb-20 pt-4">

      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 fade-in-up">
        <span className={`px-4 py-2 rounded-full text-xs font-bold glass border border-indigo-500/30 inline-block ${isDark?'text-indigo-300':'text-indigo-600'}`}>
          About &amp; Services
        </span>
        <h1 className={`text-5xl sm:text-6xl font-extrabold font-outfit leading-tight ${th.h}`}>
          About <span className="gradient-text">Aisha Sabugar</span>
        </h1>
        <p className={`text-base leading-relaxed ${th.p}`}>
          Computer Engineering student &amp; Web Designer building elegant, accessible, and high-performance web applications.
        </p>
      </div>

      {/* IDENTITY CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* 3D Avatar */}
        <div className="lg:col-span-4 flex justify-center items-center">
          <div
            className="relative w-72 h-72 rounded-3xl th-card flex flex-col items-center justify-center gap-4 cursor-default overflow-hidden"
            onMouseMove={onTilt} onMouseLeave={offTilt}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-indigo-500/15 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/12 blur-3xl"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-float">
                  <Terminal className="w-10 h-10 text-white"/>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center animate-float-delay shadow-md">
                  <Code className="w-4 h-4 text-white"/>
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center animate-float-delay2 shadow-md">
                  <Layout className="w-4 h-4 text-white"/>
                </div>
              </div>
              <div className="text-center">
                <p className={`text-lg font-bold font-outfit ${th.h}`}>Aisha Sabugar</p>
                <p className={`text-xs ${th.muted}`}>Web Designer & Developer</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isDark?'bg-indigo-900/60 text-indigo-300 border border-indigo-800':'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>React.js</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isDark?'bg-cyan-900/60 text-cyan-300 border border-cyan-800':'bg-cyan-50 text-cyan-700 border border-cyan-200'}`}>Tailwind</span>
              </div>
            </div>
          </div>
        </div>

        {/* Objective */}
        <div className="lg:col-span-8 space-y-6">
          <div className="th-card p-8 space-y-4">
            <h2 className={`text-2xl font-bold font-outfit ${th.h}`}>Career Objective</h2>
            <p className={`leading-relaxed ${th.p}`}>
              To become a highly successful professional in Computer Science, working in an innovative and globally competitive environment. I believe every website should be an intersection of intuitive usability and visual excellence.
            </p>
            <p className={`leading-relaxed ${th.p}`}>
              Currently working as a <span className="text-indigo-600 font-semibold">Web Designer at Xipra Technology</span>, while pursuing my 8th semester of Computer Engineering at <span className="text-cyan-600 font-semibold">Sankalchand Patel University</span>.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { text:"Clean & Maintainable Code",    color: isDark?'border-indigo-500/30 text-indigo-300 bg-indigo-950/40':'border-indigo-200 text-indigo-700 bg-indigo-50' },
                { text:"Mobile-First Responsive Design",color: isDark?'border-cyan-500/30 text-cyan-300 bg-cyan-950/40'    :'border-cyan-200 text-cyan-700 bg-cyan-50'       },
              ].map((b,i)=>(
                <div key={i} className={`px-4 py-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${b.color}`}>
                  <Star className="w-3.5 h-3.5"/> {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="space-y-6">
        <h2 className={`text-2xl font-bold font-outfit text-center ${th.h}`}>
          Personal <span className="gradient-text">Information</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalDetails.map((item,idx)=>{
            const Icon=item.icon;
            return (
              <div key={idx} className="th-card p-5 space-y-3 cursor-default group" onMouseMove={onTilt} onMouseLeave={offTilt}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}
                  style={{background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.06)'}}>
                  <Icon className="w-4 h-4"/>
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest block font-outfit ${th.muted}`}>{item.label}</span>
                  <p className={`text-sm font-semibold mt-1 leading-snug ${th.h}`}>{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SERVICES & CAPABILITIES */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest font-outfit">My Services</span>
          <h2 className={`text-3xl font-bold font-outfit ${th.h}`}>
            Services & <span className="gradient-text">Capabilities</span>
          </h2>
        </div>
        
        {/* 3D FLIP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* SKILLS */}
      <div className="th-card p-8 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest font-outfit">Proficiency</span>
            <h2 className={`text-2xl font-bold font-outfit ${th.h}`}>Technical Skill Matrix</h2>
          </div>
          <div className="flex flex-wrap gap-1 glass rounded-2xl p-1">
            {skillCategories.map((cat)=>(
              <button key={cat.id} onClick={()=>setActiveTab(cat.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab===cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5'
                             : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
                }`}>{cat.label}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((skill,idx)=>(
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={`font-semibold ${th.h}`}>{skill.name}</span>
                <span className="text-xs font-bold text-indigo-500">{skill.pct}%</span>
              </div>
              <div className="skill-bar">
                <div className={`skill-fill bg-gradient-to-r ${skill.gradient}`} style={{'--w':`${skill.pct}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="space-y-10">
        <h2 className={`text-2xl font-bold font-outfit text-center ${th.h}`}>
          Education & <span className="gradient-text">Experience</span>
        </h2>
        <div className="relative border-l border-indigo-500/30 pl-8 ml-4 sm:ml-12 space-y-10 max-w-3xl mx-auto">
          {timeline.map((item,idx)=>{
            const Icon=item.icon;
            return (
              <div key={idx} className="relative group flex flex-col gap-2">
                {/* Timeline Node Dot */}
                <div className="absolute -left-[40px] top-6 w-4.5 h-4.5 rounded-full bg-[#0a0a1a] border-2 border-indigo-500 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                
                {/* Timeline Card */}
                <div className="th-card p-6 flex flex-col sm:flex-row gap-5 items-start card-lift" onMouseMove={onTilt} onMouseLeave={offTilt}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <Icon className="w-6 h-6"/>
                  </div>
                  <div className="space-y-1.5 flex-1 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className={`text-base font-extrabold font-outfit ${th.h}`}>{item.role}</h3>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${isDark?'bg-indigo-950/60 text-indigo-300 border border-indigo-800/40':'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>{item.period}</span>
                    </div>
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-wide">{item.org}</p>
                    <p className={`text-xs sm:text-sm leading-relaxed ${th.p}`}>{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>



    </div>
  );
}
