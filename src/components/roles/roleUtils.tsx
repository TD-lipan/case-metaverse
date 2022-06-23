import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

export function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

export function addStaticRole<T>(
  app: PIXI.Application,
  resourceName: string,
  position?: PIXI.IPointData,
) {
  const sprite = new PIXI.Sprite(app.loader.resources[resourceName].texture);
  position && sprite.position.set(position.x, position.y);
  return sprite as unknown as T;
}

export function addDynamicRole<T>(
  app: PIXI.Application,
  resources: string[],
  position?: PIXI.IPointData,
  speed: number = 0.075,
) {
  const animatedSprite = new PIXI.AnimatedSprite(
    resources.reduce((textures: PIXI.Texture[], res: string) => {
      const texture = app.loader.resources[res].texture;

      texture && textures.push(texture);

      return textures;
    }, []),
  );
  position && animatedSprite.position.set(position.x, position.y);
  animatedSprite.animationSpeed = speed;
  return animatedSprite as unknown as T;
}
