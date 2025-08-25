'use client';

import { useRetro } from './RetroProvider';
import StartScreenOverlay from './StartScreenOverlay';

export function RetroMount() {
  const { showStart, closeStart } = useRetro();
  
  return (
    <>
      {showStart && <StartScreenOverlay onClose={closeStart} />}
    </>
  );
}