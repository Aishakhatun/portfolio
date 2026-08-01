import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github, Instagram, Twitter, Facebook, MessageSquare, Clock, Zap, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Contact() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const th = {
    h:    isDark ? 'text-white'     : 'text-slate-900',
    p:    isDark ? 'text-slate-400' : 'text-slate-600',
    muted:isDark ? 'text-slate-500' : 'text-slate-500',
    label:isDark ? 'text-slate-400' : 'text-slate-600',
    avail:isDark
      ? 'bg-gradient-to-br from-indigo-950/80 via-violet-950/60 to-cyan-950/60'
      : 'bg-gradient-to-br from-indigo-50 via-violet-50/60 to-cyan-50/50',
    socialHover: isDark ? 'hover:bg-white/5 hover:text-indigo-300 hover:border-indigo-500/30'
                       : 'hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300',
    quote: isDark
      ? 'glass border border-indigo-500/20'
      : 'bg-indigo-50 border border-indigo-100',
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name='Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Valid email required';
    if (!form.subject.trim()) e.subject='Subject is required';
    if (!form.message.trim() || form.message.length<10) e.message='Min 10 characters required';
    return e;
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(p=>({...p, [name]:value}));
    if (errors[name]) setErrors(p=>({...p,[name]:undefined}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length>0) { setErrors(v); return; }
    setStatus('loading');
    setApiError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name:'', email:'', subject:'', message:'' });
        setTimeout(() => setStatus(null), 6000);
      } else {
        setStatus('error');
        setApiError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setApiError('Server connection failed. Ensure backend server is running.');
    }
  };

  const onTilt=(e)=>{
    const el=e.currentTarget, r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    el.style.transform=`perspective(700px) rotateX(${-y*10}deg) rotateY(${x*10}deg) translateZ(6px)`;
  };
  const offTilt=(e)=>{e.currentTarget.style.transform='';};

  const contactCards = [
    { icon:Mail,   label:'Email',    value:'aishasabugar1@gmail.com', sub:'Replies within 24 hours', href:'mailto:aishasabugar1@gmail.com', gradient:'from-indigo-500 to-violet-600' },
    { icon:Phone,  label:'Phone',    value:'+91-9426046258',          sub:'Mon–Sat, 10AM–7PM IST',    href:'tel:+919426046258',             gradient:'from-emerald-500 to-teal-600' },
    { icon:MapPin, label:'Location', value:'Himatnagar, Gujarat',     sub:'India — PIN 383001',        href:'https://maps.google.com/?q=Himatnagar', gradient:'from-amber-500 to-orange-500' },
  ];

  const socials = [
    { icon:Linkedin,  label:'LinkedIn',  href:'https://linkedin.com'  },
    { icon:Github,    label:'GitHub',    href:'https://github.com'    },
    { icon:Instagram, label:'Instagram', href:'https://instagram.com' },
    { icon:Twitter,   label:'Twitter/X', href:'https://twitter.com'   },
    { icon:Facebook,  label:'Facebook',  href:'https://facebook.com'  },
  ];

  return (
    <div className="space-y-16 pb-20 pt-4">

      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 fade-in-up">
        <span className={`px-4 py-2 rounded-full text-xs font-bold glass border border-indigo-500/30 inline-block ${isDark?'text-indigo-300':'text-indigo-600'}`}>
          Let's Connect
        </span>
        <h1 className={`text-5xl sm:text-6xl font-extrabold font-outfit leading-tight ${th.h}`}>
          Get In <span className="gradient-text">Touch</span>
        </h1>
        <p className={`text-base leading-relaxed ${th.p}`}>
          Have a project idea, collaboration opportunity, or just want to say hello? Let's build something remarkable together.
        </p>
      </div>

      {/* CONTACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactCards.map((card,idx)=>{
          const Icon=card.icon;
          return (
            <a key={idx} href={card.href} target={card.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
              className="th-card p-7 group text-center space-y-4 block card-lift cursor-pointer"
              onMouseMove={onTilt} onMouseLeave={offTilt}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${card.gradient} flex items-center justify-center text-white mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8"/>
              </div>
              <div className="space-y-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest block font-outfit ${th.muted}`}>{card.label}</span>
                <p className={`text-base font-bold group-hover:text-indigo-600 transition-colors break-all ${th.h}`}>{card.value}</p>
                <p className={`text-xs ${th.muted}`}>{card.sub}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* FORM + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="th-card p-8 sm:p-10 space-y-7">
            <div className="space-y-1.5">
              <h2 className={`text-2xl font-bold font-outfit flex items-center gap-3 ${th.h}`}>
                <MessageSquare className="w-6 h-6 text-indigo-500"/>
                Send a Message
              </h2>
              <p className={`text-sm ${th.muted}`}>Fill in the form and I'll get back to you within 24 hours.</p>
            </div>

            {/* Success toast */}
            {status==='success' && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 text-sm font-semibold animate-fadeIn">
                <CheckCircle className="w-5 h-5 shrink-0"/> 🎉 Inquiry submitted &amp; saved! I'll respond within 24 hours.
              </div>
            )}

            {/* Error toast */}
            {status==='error' && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-700 text-sm font-semibold animate-fadeIn">
                <AlertCircle className="w-5 h-5 shrink-0"/> {apiError || 'Submission failed. Please try again.'}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={`text-[10px] font-bold uppercase tracking-widest font-outfit ${th.label}`}>Full Name *</label>
                  <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange}
                    className={`th-input ${errors.name?'error':''}`}/>
                  {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className={`text-[10px] font-bold uppercase tracking-widest font-outfit ${th.label}`}>Email Address *</label>
                  <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange}
                    className={`th-input ${errors.email?'error':''}`}/>
                  {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-widest font-outfit ${th.label}`}>Subject *</label>
                <input name="subject" type="text" placeholder="e.g. Web Design Project Inquiry" value={form.subject} onChange={handleChange}
                  className={`th-input ${errors.subject?'error':''}`}/>
                {errors.subject && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.subject}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-widest font-outfit ${th.label}`}>Message *</label>
                <textarea name="message" rows={5} placeholder="Tell me about your project, timeline, and requirements..." value={form.message} onChange={handleChange}
                  className={`th-input resize-none ${errors.message?'error':''}`}/>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.message}</p>}
                <p className={`text-[10px] text-right ${th.muted}`}>{form.message.length} chars</p>
              </div>

              <button type="submit" disabled={status==='loading'}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-lg ${
                  status==='loading'
                    ? isDark ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/50 hover:scale-[1.01]'
                }`}
              >
                {status==='loading'
                  ? <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending…</>
                  : <><Send className="w-5 h-5"/>Send Message</>
                }
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-6">

          {/* Availability */}
          <div className={`relative p-6 rounded-3xl overflow-hidden ${th.avail}`}>
            <div className="absolute inset-0 dot-grid opacity-20 rounded-3xl"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 pulse-badge"></div>
                <span className="text-sm font-bold text-emerald-600">Available for New Projects</span>
              </div>
              <h3 className={`text-xl font-bold font-outfit ${th.h}`}>Ready to Collaborate?</h3>
              <p className={`text-sm leading-relaxed ${th.p}`}>
                Open to freelance web design &amp; front-end projects. Landing pages, React apps, admin dashboards — let's talk.
              </p>
              <div className="space-y-2.5">
                {[
                  { icon:Clock,  text:'Response: within 24 hours' },
                  { icon:MapPin, text:'Himatnagar, Gujarat, India' },
                  { icon:Globe,  text:'Remote-friendly worldwide'  },
                ].map((item,i)=>{
                  const Icon=item.icon;
                  return (
                    <div key={i} className={`flex items-center gap-3 text-xs ${th.p}`}>
                      <Icon className="w-4 h-4 text-indigo-500 shrink-0"/><span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="th-card p-6 space-y-4">
            <h3 className={`text-lg font-bold font-outfit ${th.h}`}>Social Media</h3>
            <div className="space-y-2">
              {socials.map((s,idx)=>{
                const Icon=s.icon;
                return (
                  <a key={idx} href={s.href} target="_blank" rel="noreferrer"
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl glass border th-text-2 text-sm font-semibold transition-all ${th.socialHover}`}
                    style={{borderColor:'var(--border)'}}
                  >
                    <Icon className="w-5 h-5 shrink-0"/><span>{s.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quote */}
          <div className={`p-6 rounded-3xl space-y-4 ${th.quote}`}>
            <p className={`text-sm italic leading-relaxed ${th.p}`}>
              "Every website is a conversation. I design ones that speak clearly, look beautiful, and leave lasting impressions."
            </p>
            <div className={`flex items-center gap-3 pt-1 border-t`} style={{borderColor:'var(--border)'}}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm font-outfit shadow-md">A</div>
              <div>
                <span className={`text-sm font-bold block ${th.h}`}>Aisha Sabugar</span>
                <span className={`text-xs ${th.muted}`}>Web Designer & Front-End Developer</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
