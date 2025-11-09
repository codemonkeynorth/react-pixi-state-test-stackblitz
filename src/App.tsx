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
    updateDynamicTextureByRef,
    updateNeoByState,
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
        Update texture by state (millie)
      </button>
      <button onClick={updateTextureByRef}>
        Update texture by ref (neo)
      </button>
      <button onClick={updateDynamicTextureByState}>
        update dynamic texture by state
      </button>
      <button onClick={updateDynamicTextureByRef}>
        update dynamic texture by ref
      </button>
      <br />
      <button onClick={addFilters}>add filters</button>
      <button onClick={removeFilters}>remove filters</button>
      <br />
      <br />
      <button onClick={updateNeoByState}>Update neo by state</button>
    </div>
  );
}

export default App;
