'use client';

import StartScreenOverlay from '@/components/retro/StartScreenOverlay';
import { useThemeCtx } from '@/components/theme/ThemeProvider';

export default function StartMount() {
  const { showStart, closeStart } = useThemeCtx();
  return showStart ? <StartScreenOverlay onClose={closeStart} /> : null;
}