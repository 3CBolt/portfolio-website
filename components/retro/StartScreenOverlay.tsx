'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StartScreenOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const entries = [
    { label: 'Start Portfolio', action: () => onClose() },
    { label: 'Projects', action: () => { onClose(); router.push('/projects'); } },
    { label: 'About', action: () => { onClose(); router.push('/about'); } },
    { label: 'Contact', action: () => { onClose(); router.push('/contact'); } },
  ];

  useEffect(() => {
    menuRef.current?.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      
      const up = e.key === 'ArrowUp' || e.key.toLowerCase() === 'w';
      const down = e.key === 'ArrowDown' || e.key.toLowerCase() === 's';
      
      if (up || down) {
        e.preventDefault();
        setSelectedIndex(prev => {
          if (down) return (prev + 1) % entries.length;
          return (prev - 1 + entries.length) % entries.length;
        });
      }
      
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        entries[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onClose, router]);

  useEffect(() => {
    // Set dismissal when component unmounts
    return () => localStorage.setItem('retroStartDismissed', '1');
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Sky background */}
      <div className="absolute inset-0 bg-[#7ec0ff]" />
      
      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 retro-scanlines" />
      
      {/* Ground / bricks */}
      <div className="absolute bottom-0 left-0 right-0 h-20 grid grid-cols-24 gap-px px-1 py-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="bg-[#b84c0f] outline outline-2 outline-[#d97c36]" />
        ))}
      </div>

      {/* Title plaque + menu */}
      <div
        className="relative mx-4 w-[min(720px,92vw)] rounded-none border-2 border-[#c96d17] bg-[#f79e3b] p-6 shadow-[6px_6px_0_#000]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 id="retro-title" className="mb-6 text-center text-3xl text-white retro-emboss">
          YOUR NAME
        </h1>
        <p className="mb-4 text-center text-sm text-black/80">Press ENTER to start</p>

        <div
          ref={menuRef}
          tabIndex={0}
          aria-labelledby="retro-title"
          className="mx-auto flex w-64 flex-col gap-2 outline-none"
        >
          {entries.map((item, i) => (
            <button
              key={item.label}
              className={`flex items-center justify-start gap-2 border-2 border-white px-3 py-2 text-white shadow-[3px_3px_0_#000]
                         hover:translate-y-[-2px] focus-visible:ring-2 transition-transform
                         ${i === selectedIndex ? 'bg-[#e60012]' : 'bg-[#a0a0a0]'}`}
              onClick={item.action}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span className="inline-block w-4 text-center">
                {i === selectedIndex ? '▶' : ' '}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] text-black/70">
          © {new Date().getFullYear()} Your Name
        </p>
      </div>
    </div>
  );
}