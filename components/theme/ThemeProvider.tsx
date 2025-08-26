'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'retro';

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycleTheme: () => void;
  showStart: boolean;
  closeStart: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

const loadRetroCss = async () => { 
  await import('@/styles/retro.css'); 
};

function applyHtmlFlags(next: Theme) {
  const html = document.documentElement;
  // Tailwind dark is class-based
  if (next === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  // Retro uses data attribute (and should not inherit dark styles)
  if (next === 'retro') {
    html.setAttribute('data-theme', 'retro');
    html.classList.remove('dark'); // Ensure retro doesn't inherit dark styles
    html.classList.remove('dark'); // Ensure retro doesn't inherit dark styles
  } else {
    html.removeAttribute('data-theme');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [showStart, setShowStart] = useState(false);

  // Initial theme: localStorage -> system -> light
  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme | null);
    const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initial: Theme = stored ?? (systemDark ? 'dark' : 'light');
    setThemeState(initial);
    applyHtmlFlags(initial);
    if (initial === 'retro') {
      loadRetroCss();
      // Check if we should show start screen
      const url = new URL(window.location.href);
      const force = url.searchParams.get('start') === '1';
      const dismissed = localStorage.getItem('retroStartDismissed') === '1';
      if (force || !dismissed) {
        setShowStart(true);
      }
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    applyHtmlFlags(t);
    if (t === 'retro') {
      loadRetroCss();
      // Check if we should show start screen
      const url = new URL(window.location.href);
      const force = url.searchParams.get('start') === '1';
      const dismissed = localStorage.getItem('retroStartDismissed') === '1';
      if (force || !dismissed) {
        setShowStart(true);
      }
    } else {
      setShowStart(false);
    }
  };

  const cycleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'retro' : 'light');
  };

  const closeStart = () => {
    localStorage.setItem('retroStartDismissed', '1');
    setShowStart(false);
  };

  const value = useMemo(() => ({ 
    theme, 
    setTheme, 
    cycleTheme, 
    showStart, 
    closeStart 
  }), [theme, showStart]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useThemeCtx = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useThemeCtx must be used within ThemeProvider');
  return ctx;
};