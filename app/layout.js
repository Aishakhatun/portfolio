import './globals.css';
import { ThemeProvider } from '../src/context/ThemeContext.jsx';
import Navbar from '../src/components/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';
import ThreeBackground from '../src/components/ThreeBackground.jsx';

export const metadata = {
  title: 'Aisha Sabugar — Web Designer & Front-End Developer',
  description: 'Portfolio of Aisha Sabugar — Web Designer, Developer & Front-End Specialist crafting modern digital experiences.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0a0a1a] text-slate-100">
        <ThemeProvider>
          {/* 3D Background */}
          <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <ThreeBackground />
          </div>

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="relative z-10 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
