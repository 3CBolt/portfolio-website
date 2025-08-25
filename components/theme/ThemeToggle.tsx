'use client';

import { useThemeCtx } from './ThemeProvider';
import { Sun, Moon, Gamepad2 } from 'lucide-react';

const ThemeButton = ({ 
  active, 
  label, 
  icon: Icon, 
  onClick 
}: { 
  active: boolean; 
  label: string; 
  icon: any;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 py-2 text-sm font-medium border-r last:border-r-0 transition-colors
      ${active 
        ? 'bg-accent text-accent-foreground' 
        : 'bg-background text-foreground hover:bg-muted'
      }
    `}
    aria-pressed={active}
  >
    <Icon className="h-4 w-4" />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeCtx();
  
  return (
    <div 
      role="tablist" 
      aria-label="Theme selector" 
      className="inline-flex rounded-lg border border-border overflow-hidden bg-background"
    >
      <ThemeButton 
        label="Light" 
        icon={Sun}
        active={theme === 'light'} 
        onClick={() => setTheme('light')} 
      />
      <ThemeButton 
        label="Dark" 
        icon={Moon}
        active={theme === 'dark'} 
        onClick={() => setTheme('dark')} 
      />
      <ThemeButton 
        label="NES" 
        icon={Gamepad2}
        active={theme === 'retro'} 
        onClick={() => setTheme('retro')} 
      />
    </div>
  );
}