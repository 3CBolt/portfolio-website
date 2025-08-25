'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'default' | 'retro';

type RetroContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleRetro: () => void;
  showStart: boolean;
  closeStart: () => void;
  forceShowStart: () => void;
};

const RetroContext = createContext<RetroContextValue | null>(null);

// Lazy import CSS only when retro is active (avoids penalizing default theme)
const loadRetroCss = async () => {
  await import('@/styles/retro.css');
};

export function RetroProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('default');
  const [showStart, setShowStart] = useState(false);

  // initial theme + optional ?start=1 hook
  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null;
    const initial = stored === 'retro' ? 'retro' : 'default';
    setThemeState(initial);

    const url = new URL(window.location.href);
    const force = url.searchParams.get('start') === '1';

    if (initial === 'retro') {
      document.documentElement.setAttribute('data-theme', 'retro');
      loadRetroCss();
      // Show start if not dismissed or forced
      const dismissed = localStorage.getItem('retroStartDismissed') === '1';
      if (force || !dismissed) setShowStart(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  // persist and flip html[data-theme]
  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    if (t === 'retro') {
      document.documentElement.setAttribute('data-theme', 'retro');
      loadRetroCss();
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const toggleRetro = () => {
    setTheme(theme === 'retro' ? 'default' : 'retro');
    if (theme !== 'retro') {
      // just switched to retro: show overlay if not dismissed
      const dismissed = localStorage.getItem('retroStartDismissed') === '1';
      if (!dismissed) setShowStart(true);
    } else {
      // switched off retro: ensure overlay closed
      setShowStart(false);
    }
  };

  const closeStart = () => {
    localStorage.setItem('retroStartDismissed', '1');
    setShowStart(false);
  };

  const forceShowStart = () => setShowStart(true);

  const value = useMemo(
    () => ({ theme, setTheme, toggleRetro, showStart, closeStart, forceShowStart }),
    [theme, showStart]
  );

  return <RetroContext.Provider value={value}>{children}</RetroContext.Provider>;
}

export function useRetro() {
  const ctx = useContext(RetroContext);
  if (!ctx) throw new Error('useRetro must be used within RetroProvider');
  return ctx;
}