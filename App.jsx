import React, { useState } from 'react';
import { Window } from './components/Window.jsx';
import { Taskbar } from './components/Taskbar.jsx';
import { TerminalApp } from './components/apps/TerminalApp.jsx';
import { NotepadApp } from './components/apps/NotepadApp.jsx';
export default function App() {
  const [windows, setWindows] = useState([
    {
      id: 'terminal',
      title: 'Terminal',
      isOpen: true,
      isMinimized: false,
      zIndex: 1,
      position: { x: 80, y: 60 },
      size: { width: 520, height: 340 },
    },
    {
      id: 'notepad',
      title: 'Notepad',
      isOpen: false,
      isMinimized: false,
      zIndex: 2,
      position: { x: 200, y: 120 },
      size: { width: 420, height: 300 },
    },
  ]);

  const focusWindow = (id) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return prev.map((win) =>
        win.id === id ? { ...win, zIndex: maxZ + 1, isMinimized: false } : win
      );
    });
  };

  const toggleWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          if (!win.isOpen) {
            return { ...win, isOpen: true, isMinimized: false };
          }
          if (win.isMinimized) {
            return { ...win, isMinimized: false };
          }
          return { ...win, isMinimized: true };
        }
        return win;
      })
    );
    focusWindow(id);
  };

  const closeWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isOpen: false } : win))
    );
  };

  const minimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 select-none relative">
      {/* Desktop Background Area */}
      <div className="absolute inset-0 p-6 flex flex-col flex-wrap items-start gap-6">
        {windows.map((win) => (
          <button
            key={win.id}
            onDoubleClick={() => toggleWindow(win.id)}
            className="flex flex-col items-center justify-center w-20 h-20 rounded-lg hover:bg-slate-800/40 text-slate-300 hover:text-white transition-all group"
          >
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/50 group-hover:scale-105 transition-transform shadow-lg">
              {win.id === 'terminal' && <span className="text-emerald-400 font-mono text-xl">&gt;_</span>}
              {win.id === 'notepad' && <span className="text-indigo-400 font-mono text-xl">TXT</span>}
            </div>
            <span className="text-xs mt-2 text-center drop-shadow-md font-medium">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Windows Rendering Layer */}
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isOpen={win.isOpen}
          isMinimized={win.isMinimized}
          zIndex={win.zIndex}
          initialPosition={win.position}
          initialSize={win.size}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
        >
          {win.id === 'terminal' && <TerminalApp />}
          {win.id === 'notepad' && <NotepadApp />}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar windows={windows} toggleWindow={toggleWindow} />
    </div>
  );
}