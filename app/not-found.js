'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <h1 className="text-6xl font-extrabold font-outfit gradient-text">404</h1>
      <h2 className="text-2xl font-bold font-outfit text-slate-200">Page Not Found</h2>
      <p className="text-slate-400 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform cursor-pointer"
      >
        Go Back Home
      </Link>
    </div>
  );
}
