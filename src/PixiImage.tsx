import { Application, extend, type ApplicationRef } from '@pixi/react';
import { Filter, Sprite, Texture } from 'pixi.js';

extend({
  Sprite,
});

type PixiImageProps = {
  appRef: React.RefObject<ApplicationRef | null>;
  spriteRef: React.RefObject<Sprite | null>;
  textureRef?: Texture | undefined;
  texture: Texture;
  filters: Filter[] | undefined;
};
const PixiImage = ({
  spriteRef,
  appRef,
  //textureRef,
  texture,
  filters,
}: PixiImageProps) => {
  return (
    <div>
      <Application
        ref={appRef}
        width={800}
        height={600}
        resolution={1}
        preferWebGLVersion={2}
      >
        <pixiSprite
          key={'preSprite'}
          ref={spriteRef}
          texture={texture}
          filters={filters}
          width={800}
          height={600}
        ></pixiSprite>
      </Application>
    </div>
  );
};

export default PixiImage;
