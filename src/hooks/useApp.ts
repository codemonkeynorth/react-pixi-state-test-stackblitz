import { useEffect, useState } from 'react';
import {
  Assets,
  BlurFilter,
  BufferImageSource,
  ColorMatrixFilter,
  Filter,
  Sprite,
  Texture,
} from 'pixi.js';
import type { ApplicationRef } from '@pixi/react';

type UseAppProps = {
  appRef?: React.RefObject<ApplicationRef | null>;
  spriteRef: React.RefObject<Sprite | null>;
};
const useApp = ({ spriteRef }: UseAppProps) => {
  const [texture, setTexture] = useState<Texture>(Texture.EMPTY);
  const [filters, setFilters] = useState<Filter[]>([]);

  const [millieTexture, setMillieTexture] = useState<Texture | undefined>(
    undefined
  );
  const [neoTexture, setNeoTexture] = useState<Texture | undefined>(
    undefined
  );

  useEffect(() => {
    const loadTexture1 = async () => {
      const mTexture = await Assets.load('/millie1024.jpg');
      setMillieTexture(mTexture);
    };
    loadTexture1();
  }, []);

  useEffect(() => {
    const loadTexture2 = async () => {
      const nTexture = await Assets.load('/neo1024.jpg');
      setNeoTexture(nTexture);
    };
    loadTexture2();
  }, []);

  const createTextureFrom = (texture: any) => {
    const buffer = texture.source.resource;
    const newSource = new BufferImageSource({
      resource: buffer,
      format: 'rgba8unorm',
      width: texture.width,
      height: texture.height,
    });
    const newTexture = Texture.from(newSource);
    return newTexture;
  };

  const updateTextureByState = () => {
    if (!millieTexture) return;
    if (!spriteRef.current) return;

    const perf = performance.now();

    const newTexture = createTextureFrom(millieTexture);
    setTexture(newTexture);

    console.log('updateTextureByState:', performance.now() - perf, 'ms');
  };

  const updateTextureByRef = () => {
    if (!neoTexture) return;
    if (!spriteRef.current) return;

    const perf = performance.now();
    const newTexture = createTextureFrom(neoTexture);
    spriteRef.current.texture = newTexture;
    console.log('updateTextureByRef:', performance.now() - perf, 'ms');
  };

  const createDynamicTexture = () => {
    if(!neoTexture) return
    const w = neoTexture.width;
    const h = neoTexture.height;
    const buffer = new Uint8Array(w * h * 4);

    const totalPixels = w * h * 4;
    for (let i = 0; i < totalPixels; i = i + 4) {
      buffer[i] = Math.floor(Math.random() * 256);
      buffer[i + 1] = Math.floor(Math.random() * 256);
      buffer[i + 2] = Math.floor(Math.random() * 256);
      buffer[i + 3] = 255;
    }

    const newSource = new BufferImageSource({
      resource: buffer,
      format: 'rgba8unorm',
      width: w,
      height: h,
    });

    const t = Texture.from(newSource, true);
    t.source.scaleMode = 'nearest';

    return t

  }

  const updateDynamicTextureByState = () => {
    
    const perf = performance.now();
    const newTexture = createDynamicTexture()
    if(newTexture) setTexture(newTexture);
    console.log('updateDynamicTextureByState:', performance.now() - perf, 'ms');
  };

  const updateDynamicTextureByRef = () => {
    if(!spriteRef.current) return
    const perf = performance.now();
    const newTexture = createDynamicTexture()
    if(newTexture) spriteRef.current.texture = newTexture
    console.log('updateDynamicTextureByState:', performance.now() - perf, 'ms');
  }

  const updateNeoByState = () => {
    const newTexture = createTextureFrom(neoTexture);
    setTexture(newTexture);
  }

  const addFilters = () => {
    const cf = new ColorMatrixFilter();
    const blur = new BlurFilter({ strength: 16 });
    cf.desaturate();
    setFilters([cf, blur]);
  };

  const removeFilters = () => {
    setFilters([]);
  };

  return {
    updateTextureByState,
    updateTextureByRef,
    updateDynamicTextureByState,
    updateDynamicTextureByRef,
    updateNeoByState,
    addFilters,
    removeFilters,
    texture,
    filters,
  };
};

export default useApp;
