'use client';

import { useRetro } from './RetroProvider';
import { Gamepad2 } from 'lucide-react';

export default function RetroToggle() {
  const { theme, toggleRetro } = useRetro();
  const onClick = () => toggleRetro();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={theme === 'retro'}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold
                 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                 border-border bg-background text-foreground hover:bg-muted
                 data-[on=true]:bg-accent data-[on=true]:text-accent-foreground"
      data-on={theme === 'retro'}
    >
      <Gamepad2 className="h-4 w-4" />
      {theme === 'retro' ? 'Retro: ON' : 'Retro: OFF'}
    </button>
  );
}