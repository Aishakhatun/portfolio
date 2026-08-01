import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import ThreeBackground from './components/ThreeBackground.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

function PortfolioApp() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':     return <Home setActivePage={setActivePage} setSelectedProject={setSelectedProject} />;
      case 'about':    return <About />;
      case 'services': return <Services setActivePage={setActivePage} />;
      case 'contact':  return <Contact />;
      default:         return <Home setActivePage={setActivePage} setSelectedProject={setSelectedProject} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">

      {/* ── THREE.JS 3D BACKGROUND ── */}
      <ThreeBackground />

      {/* ── SUBTLE RADIAL OVERLAY ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 85% 85%, rgba(6,182,212,0.05) 0%, transparent 60%)
          `
        }}
      />

      {/* ── NAVBAR ── */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* ── MAIN CONTENT ── */}
      <main
        className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 relative"
        style={{ zIndex: 10 }}
      >
        {renderPage()}
      </main>

      {/* ── FOOTER ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer setActivePage={setActivePage} />
      </div>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div onClick={() => setSelectedProject(null)} style={{ zIndex: 50 }}>
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
