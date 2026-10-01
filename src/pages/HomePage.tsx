import { useState } from "react";

export default function HomePage() {
    const [shouldCrash, setShouldCrash] = useState(false);

    if (shouldCrash) {
        throw new Error("Simulated client components rendering exception!");
    }
    
    return (
    <div className="rounded-2xl border border-zinc-200 p-8 shadow-sm flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to CoreApp</h1>
      <p className="text-zinc-500 mb-8 max-w-xl">This is Page 1. It showcases the core Vite template configurations built directly inside Tailwind CSS.</p>
      
      <div className="border border-red-200 rounded-xl bg-red-50/50 p-5 max-w-md">
        <h3 className="text-sm font-semibold text-red-800 mb-1">Test Error Boundary UI</h3>
        <p className="text-xs text-red-600 mb-4">Clicking the element below injects an unhandled rendering throw to trigger the boundary layout state layer.</p>
        <button 
          onClick={() => setShouldCrash(true)} 
          className="text-xs font-semibold bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition cursor-pointer"
        >
          Force UI Crash
        </button>
      </div>
    </div>
  );
}