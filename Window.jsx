import React, { useState, useRef } from 'react';
import { Minus, Square, X } from 'lucide-react';

export const Window = ({
  id,
  title,
  isOpen,
  isMinimized,
  zIndex,
  initialPosition,
  initialSize,
  onClose,
  onMinimize,
  onFocus,
  children,
}) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 });

  if (!isOpen || isMinimized) return null;

  const handleMouseDown = (e) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      setPosition({
        x: Math.max(0, dragRef.current.posX + dx),
        y: Math.max(0, dragRef.current.posY + dy),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      onClick={onFocus}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: initialSize?.width || '450px',
        height: initialSize?.height || '320px',
        zIndex: zIndex,
      }}
      className="absolute bg-slate-900 border border-slate-700/80 rounded-lg shadow-2xl flex flex-col overflow-hidden select-none backdrop-blur-md"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className={`px-3 py-2 flex items-center justify-between cursor-move border-b border-slate-700/60 ${
          isDragging ? 'bg-slate-700' : 'bg-slate-800/90'
        }`}
      >
        <span className="text-xs font-medium text-slate-300 tracking-wide">{title}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700/50 transition-colors"
          >
            <Minus size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-red-500/20 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 bg-slate-950/90 overflow-auto text-slate-100">
        {children}
      </div>
    </div>
  );
};