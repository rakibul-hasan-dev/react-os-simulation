import React, { useState } from 'react';

export const NotepadApp = () => {
  const [content, setContent] = useState('// Welcome to WebOS Notepad\n// Start typing your notes here...\n');

  return (
    <div className="h-full flex flex-col bg-slate-900">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-3 bg-slate-950 text-slate-200 font-mono text-xs resize-none border-none outline-none focus:ring-0"
        placeholder="Type here..."
      />
    </div>
  );
};