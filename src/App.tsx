import './App.css';

import { type ApplicationRef } from '@pixi/react';
import { useRef } from 'react';
import { Sprite } from 'pixi.js';
import PixiImage from './PixiImage';
import useApp from './hooks/useApp';

function App() {
  //
  const spriteRef = useRef<Sprite | null>(null);
  const appRef = useRef<ApplicationRef | null>(null);

  const {
    updateTextureByState,
    updateTextureByRef,
    updateDynamicTextureByState,
    addFilters,
    removeFilters,
    texture,
    filters,
  } = useApp({
    appRef,
    spriteRef,
  });

  return (
    <div>
      <PixiImage
        appRef={appRef}
        spriteRef={spriteRef}
        texture={texture}
        filters={filters}
      ></PixiImage>

      <button onClick={updateTextureByState}>
        Update texture by state (vite logo)
      </button>
      <button onClick={updateTextureByRef}>
        Update texture by ref (react logo)
      </button>
      <button onClick={updateDynamicTextureByState}>
        update dynamic texture by state
      </button>
      <br />
      <button onClick={addFilters}>add filters</button>
      <button onClick={removeFilters}>remove filters</button>
    </div>
  );
}

export default App;
