'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Heart, Github, Linkedin, Instagram, Twitter, ArrowUp, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Footer() {
  const { isDark } = useTheme();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const th = {
    h:     isDark ? 'text-white'     : 'text-slate-900',
    muted: isDark ? 'text-slate-500' : 'text-slate-500',
    link:  isDark ? 'text-slate-500 hover:text-indigo-300' : 'text-slate-500 hover:text-indigo-600',
  };

  return (
    <footer
      className="relative mt-20 pt-16 pb-10 overflow-hidden border-t"
      style={{ background: 'var(--footer-bg)', borderColor: 'var(--footer-border)', backdropFilter: 'blur(20px)' }}
    >
      <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b" style={{ borderColor: 'var(--border)' }}>

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
                <Terminal className="w-4 h-4 text-white"/>
              </div>
              <span className={`text-lg font-bold font-outfit ${th.h}`}>
                Aisha <span className="gradient-text">Dev</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${th.muted}`}>
              Passionate Web Designer &amp; Front-End Developer crafting modern, responsive, and visually stunning digital experiences.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon:Linkedin,  href:'https://linkedin.com'  },
                { icon:Github,    href:'https://github.com'    },
                { icon:Instagram, href:'https://instagram.com' },
                { icon:Twitter,   href:'https://twitter.com'   },
              ].map((s,i)=>{
                const Icon=s.icon;
                return (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    className={`w-8 h-8 rounded-full glass border flex items-center justify-center transition-all ${th.link} hover:border-indigo-500/40`}
                    style={{borderColor:'var(--border)'}}
                  >
                    <Icon className="w-3.5 h-3.5"/>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <h4 className={`text-[10px] font-bold uppercase tracking-widest font-outfit ${th.muted}`}>Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[{href:'/',label:'Home'},{href:'/about',label:'About Me'},{href:'/services',label:'Services'},{href:'/contact',label:'Contact'}].map(item=>(
                <li key={item.href}>
                  <Link href={item.href} onClick={scrollToTop}
                    className={`transition-colors cursor-pointer ${th.link}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className={`text-[10px] font-bold uppercase tracking-widest font-outfit ${th.muted}`}>Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0"/>
                <a href="mailto:aishasabugar1@gmail.com" className={`transition-colors truncate text-xs ${th.link}`}>aishasabugar1@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0"/>
                <a href="tel:+919426046258" className={`transition-colors text-xs ${th.link}`}>+91-9426046258</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5"/>
                <span className={`text-xs ${th.muted}`}>Himatnagar, Gujarat — 383001</span>
              </li>
            </ul>
          </div>

          {/* Creator card */}
          <div className="space-y-4">
            <h4 className={`text-[10px] font-bold uppercase tracking-widest font-outfit ${th.muted}`}>Portfolio Info</h4>
            <div className={`p-5 rounded-2xl relative overflow-hidden ${isDark?'glass border border-indigo-500/20':'bg-indigo-50 border border-indigo-100'}`}>
              <div className="space-y-3">
                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${isDark?'text-indigo-400':'text-indigo-600'}`}>
                  <Heart className="w-3 h-3 text-pink-500 fill-pink-500"/> Next.js + Tailwind CSS
                </div>
                <p className={`text-[11px] leading-relaxed ${th.muted}`}>
                  Built with modern Next.js App Router architecture and Tailwind CSS design tokens. Features 3D Three.js background.
                </p>
                <div className={`pt-2 border-t text-[11px] font-bold`} style={{borderColor:'var(--border)'}}>
                  <span className={th.muted}>Created by: </span>
                  <a href="mailto:aishasabugar1@gmail.com" className="underline text-indigo-500 hover:text-indigo-400">aishasabugar1@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]" style={{color:'var(--text-3)'}}>
          <p>© {new Date().getFullYear()} Aisha Sabugar. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Next.js App Router Portfolio</span>
            <button onClick={scrollToTop}
              aria-label="Scroll to top"
              className={`w-8 h-8 rounded-full glass border flex items-center justify-center transition-all hover:border-indigo-500/40 ${th.muted}`}
              style={{borderColor:'var(--border)'}}>
              <ArrowUp className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
