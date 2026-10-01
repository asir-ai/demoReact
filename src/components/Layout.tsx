
import { Link, Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { useEffect, useState } from "react";

export default function Layout() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme === 'dark';

        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if(isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
    <div className="min-h-screen font-sans flex flex-col">
      {/* Global Navigation Header */}
      <header className="border-b border-zinc-200 sticky top-0 z-50 mb-6">
        <nav className="flex items-center justify-between p-4 px-6 wContainer">
          <Link to="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition">
            CoreApp
          </Link>
          <div className="nav flex gap-6 font-medium text-sm">
            <button
                type='button'
                className='counter'
                onClick={() => setIsDarkMode(!isDarkMode)}
            >
                Switch to {isDarkMode ? "☀️ Light" : "🌙 Dark"} Mode
            </button>
            <Link to="/" className="">Home</Link>
            <Link to="/dashboard" className="">Dashboard</Link>
            <Link to="/users" className="">Users</Link>
          </div>
        </nav>
      </header>
      
      {/* Dynamic Content Container */}
      <main className="mx-auto w-full flex-1">
        {/* The ErrorBoundary wraps the child routes here. 
            If any page (Home or Dashboard) crashes, the layout header remains fully functional! */}
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Global Application Footer */}
      <footer className="border-t border-zinc-200 p-4 text-center text-xs text-zinc-400 mt-auto">
        &copy; {new Date().getFullYear()} CoreApp Inc. All rights reserved.
      </footer>
    </div>
  );
}
