'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const themes = [
  { name: 'light', label: 'Light', icon: Sun },
  { name: 'dark', label: 'Dark', icon: Moon },
  { name: 'retro', label: 'Retro', icon: Gamepad2 },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
    );
  }

  const currentTheme = themes.find(t => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-muted transition-colors focus-ring",
          "retro:rounded-none retro:border-2 retro:border-white retro:bg-black retro:hover:bg-gray-900"
        )}
        aria-label="Toggle theme"
      >
        <CurrentIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className={cn(
            "absolute right-0 top-12 z-50 min-w-[120px] rounded-lg border border-border bg-background shadow-lg",
            "retro:rounded-none retro:border-2 retro:border-white retro:bg-black"
          )}>
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.name;
              
              return (
                <button
                  key={themeOption.name}
                  onClick={() => {
                    setTheme(themeOption.name);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg",
                    "retro:first:rounded-none retro:last:rounded-none retro:hover:bg-gray-900",
                    isActive && "bg-accent text-accent-foreground retro:bg-red-600 retro:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="retro:font-retro retro:text-xs">
                    {themeOption.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}