import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Monitor } from 'lucide-react';

export const Taskbar = ({ windows, toggleWindow }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-12 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 fixed bottom-0 left-0 right-0 z-[99999] flex items-center justify-between px-4">
      {/* Start Button & Active Apps */}
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
          <Monitor size={18} />
        </button>

        <div className="h-5 w-[1px] bg-slate-700/60 mx-1" />

        {/* Dynamic App Launcher / Taskbar Items */}
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => toggleWindow(win.id)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              win.isOpen && !win.isMinimized
                ? 'bg-slate-700/80 text-white shadow-sm border border-slate-600/50'
                : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {win.id === 'terminal' && <Terminal size={14} />}
            {win.id === 'notepad' && <FileText size={14} />}
            <span>{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Clock */}
      <div className="text-xs font-mono text-slate-300 bg-slate-800/50 px-3 py-1 rounded-md border border-slate-700/40">
        {time}
      </div>
    </div>
  );
};