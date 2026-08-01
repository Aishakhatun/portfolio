'use client';

import React, { useState } from 'react';
import {
  User, MapPin, Phone, Mail, GraduationCap, Briefcase,
  Code, Award, BookOpen, Heart, Terminal, Layout, Star
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function About() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('all');

  const th = {
    h:    isDark ? 'text-white'     : 'text-slate-900',
    p:    isDark ? 'text-slate-400' : 'text-slate-600',
    muted:isDark ? 'text-slate-500' : 'text-slate-500',
    sect: isDark
      ? 'bg-gradient-to-br from-indigo-950/80 via-violet-950/60 to-cyan-950/60'
      : 'bg-gradient-to-br from-indigo-50 via-violet-50/70 to-cyan-50/60',
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
    { label:"Mobile",     value:"+91-9426046258",                 icon:Phone,         color:"text-blue-500"   },
    { label:"Email",      value:"aishasabugar1@gmail.com",        icon:Mail,          color:"text-rose-500"   },
  ];

  const skillCategories = [
    { id:'all',       label:'All Skills'  },
    { id:'frontend',  label:'Front-End'   },
    { id:'styling',   label:'Styling'     },
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
          Professional Profile
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <div className="space-y-8">
        <h2 className={`text-2xl font-bold font-outfit text-center ${th.h}`}>
          Education & <span className="gradient-text">Experience</span>
        </h2>
        <div className="max-w-4xl mx-auto space-y-5">
          {timeline.map((item,idx)=>{
            const Icon=item.icon;
            return (
              <div key={idx} className="th-card p-7 flex flex-col sm:flex-row gap-6 items-start group" onMouseMove={onTilt} onMouseLeave={offTilt}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  <Icon className="w-7 h-7"/>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className={`text-lg font-bold font-outfit ${th.h}`}>{item.role}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${isDark?'bg-indigo-900/50 text-indigo-300 border border-indigo-800/60':'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>{item.period}</span>
                  </div>
                  <p className="text-sm font-semibold text-indigo-600">{item.org}</p>
                  <p className={`text-sm leading-relaxed ${th.p}`}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERESTS */}
      <div className={`relative p-8 sm:p-10 rounded-3xl overflow-hidden ${th.sect}`}>
        <div className="absolute inset-0 dot-grid opacity-20 rounded-3xl"></div>
        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <Heart className="w-6 h-6 text-pink-500 mx-auto"/>
            <h3 className={`text-2xl font-bold font-outfit ${th.h}`}>What Drives Me</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title:"Responsive Layouts", desc:"Creating fluid mobile-first layouts that adapt perfectly to any screen size." },
              { title:"UI/UX Micro-Interactions", desc:"Crafting smooth transitions, hover states, glassmorphism, and 3D depth effects." },
              { title:"Continuous Growth", desc:"Learning React patterns, Tailwind architecture, and modern web engineering best practices." },
            ].map((item,idx)=>(
              <div key={idx} className="th-card p-6 space-y-2">
                <h4 className={`font-bold font-outfit ${th.h}`}>{item.title}</h4>
                <p className={`text-xs leading-relaxed ${th.p}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
