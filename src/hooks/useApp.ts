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

  const [viteTexture, setViteTexture] = useState<Texture | undefined>(
    undefined
  );
  const [reactTexture, setReactTexture] = useState<Texture | undefined>(
    undefined
  );

  useEffect(() => {
    const loadTexture1 = async () => {
      //const vtexture = await Assets.load('/vite.svg');
      const vtexture = await Assets.load({
        src: 'https://placecats.com/neo/1024/1024',
        loadParser: 'loadTextures',
      });
      //const vtexture = Texture.from('https://placecats.com/neo/1024/1024');
      setViteTexture(vtexture);
    };
    loadTexture1();
  }, []);

  useEffect(() => {
    const loadTexture2 = async () => {
      await Assets.init({
        preferences: {
          crossOrigin: 'anonymous',
        },
      });
      //const rtexture = await Assets.load('/react.svg');
      const rtexture = await Assets.load({
        src: 'https://placecats.com/millie/1024/1024',
        loadParser: 'loadTextures',
      });

      //const rtexture = Texture.from('https://placecats.com/millie/1024/1024');
      setReactTexture(rtexture);
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
    if (!viteTexture) return;
    if (!spriteRef.current) return;

    const perf = performance.now();

    const newTexture = createTextureFrom(viteTexture);
    setTexture(newTexture);

    console.log('updateTextureByState:', performance.now() - perf, 'ms');
  };

  const updateTextureByRef = () => {
    if (!reactTexture) return;
    if (!spriteRef.current) return;

    const perf = performance.now();
    const newTexture = createTextureFrom(reactTexture);
    spriteRef.current.texture = newTexture;
    console.log('updateTextureByRef:', performance.now() - perf, 'ms');
  };

  const updateDynamicTextureByState = () => {
    if (!reactTexture) return;

    const perf = performance.now();

    const w = reactTexture.width;
    const h = reactTexture.height;
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
    setTexture(t);

    console.log('updateDynamicTextureByState:', performance.now() - perf, 'ms');
  };

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
    addFilters,
    removeFilters,
    texture,
    filters,
  };
};

export default useApp;
