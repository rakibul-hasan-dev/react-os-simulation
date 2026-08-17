import React, { useState, useRef, useEffect } from 'react';

export const TerminalApp = () => {
  const [history, setHistory] = useState([
    { text: 'WebOS CLI v1.0.0', type: 'system' },
    { text: 'Type "help" to view available commands.', type: 'system' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      const newHistory = [...history, { text: `user@webos:~$ ${input}`, type: 'user' }];

      if (trimmed === 'clear') {
        setHistory([]);
      } else if (trimmed === 'help') {
        newHistory.push({
          text: 'Available commands: help, clear, date, echo [text], whoami',
          type: 'response',
        });
        setHistory(newHistory);
      } else if (trimmed === 'date') {
        newHistory.push({ text: new Date().toString(), type: 'response' });
        setHistory(newHistory);
      } else if (trimmed === 'whoami') {
        newHistory.push({ text: 'developer@webos-kernel', type: 'response' });
        setHistory(newHistory);
      } else if (trimmed.startsWith('echo ')) {
        newHistory.push({ text: trimmed.slice(5), type: 'response' });
        setHistory(newHistory);
      } else if (trimmed !== '') {
        newHistory.push({
          text: `Command not found: ${trimmed}. Type "help" for assistance.`,
          type: 'error',
        });
        setHistory(newHistory);
      } else {
        setHistory(newHistory);
      }

      setInput('');
    }
  };

  return (
    <div className="h-full p-3 font-mono text-xs flex flex-col space-y-1 bg-slate-950 text-green-400">
      {history.map((item, idx) => (
        <div
          key={idx}
          className={
            item.type === 'error'
              ? 'text-red-400'
              : item.type === 'system'
              ? 'text-slate-400'
              : item.type === 'response'
              ? 'text-green-300'
              : 'text-white'
          }
        >
          {item.text}
        </div>
      ))}
      <div className="flex items-center space-x-2 pt-1">
        <span className="text-emerald-500 font-bold">user@webos:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono focus:ring-0"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};