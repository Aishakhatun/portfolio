'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2, Send, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/',        label: 'Home' },
    { href: '/about',   label: 'About' },
    { href: '/services',label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 glass-nav shadow-sm' : 'py-5 bg-transparent'
      }`}
      style={{ zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* ── Brand ─────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 blur-sm opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-lg">
                <Code2 className="w-5 h-5" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold font-outfit tracking-tight th-text-1">
                Aisha <span className="gradient-text">Dev</span>
              </span>
              <span className="block text-[10px] font-medium th-text-3 tracking-widest uppercase">
                Web Designer & Developer
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Pills ─────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full glass border"
            style={{ borderColor: 'var(--border)' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer relative ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-md shadow-indigo-400/30'
                      : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Theme Toggle + CTA ─────────────────────── */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`theme-toggle ${isDark ? 'dark' : ''} shrink-0`}
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                  : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              }}
            >
              <div className="theme-toggle-thumb">
                {isDark
                  ? <Moon className="w-3 h-3 text-indigo-600" />
                  : <Sun className="w-3 h-3 text-amber-500" />
                }
              </div>
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden md:flex btn-glow px-5 py-2.5 rounded-full border border-indigo-500/50 font-semibold text-sm items-center gap-2 group cursor-pointer text-indigo-600 hover:text-white hover:bg-indigo-600 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Hire Me</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden p-2.5 rounded-xl glass border th-text-2"
              style={{ borderColor: 'var(--border)' }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden animate-fadeIn fixed inset-0 top-[70px] z-40"
          style={{ background: isDark ? 'rgba(10,10,26,0.85)' : 'rgba(240,244,255,0.9)', backdropFilter: 'blur(20px)' }}
        >
          <div
            className="border-b p-6 space-y-2"
            style={{ borderColor: 'var(--border)', background: 'var(--nav-bg)' }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl text-base font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-600 border border-indigo-500/30'
                      : isDark ? 'th-text-2 hover:bg-white/5' : 'th-text-2 hover:bg-indigo-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-indigo-500 pulse-badge"></div>}
                </Link>
              );
            })}

            <div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--border)' }}>
              {/* Theme toggle row */}
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-semibold th-text-2">{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
                <button
                  onClick={toggleTheme}
                  className={`theme-toggle ${isDark ? 'dark' : ''}`}
                  style={{ background: isDark ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}
                >
                  <div className="theme-toggle-thumb">
                    {isDark ? <Moon className="w-3 h-3 text-indigo-600" /> : <Sun className="w-3 h-3 text-amber-500" />}
                  </div>
                </button>
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 text-center"
              >
                <Send className="w-4 h-4" />
                Let's Work Together
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
