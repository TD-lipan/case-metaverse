import BaseRole from './BaseRole';
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import { animate } from './roleUtils';

export default class CarlyYatesRole extends BaseRole<PIXI.AnimatedSprite> {
  constructor(
    app: PIXI.Application,
    resources: string[] | string,
    position: PIXI.IPointData,
  ) {
    super(app, resources, position);

    const sprite = this.getInstance();

    sprite.interactive = true;
    sprite.zIndex = 1;
  }

  public move() {
    const sprite = this.getInstance();

    new TWEEN.Tween(sprite)
      .to({ x: 350, y: 300 }, 1000)
      .to({ x: 450, y: 350 }, 1000)
      .to({ x: 520, y: 370 }, 1000)
      .to({ x: 600, y: 500 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onStart(() => sprite.play())
      .onComplete(() => setTimeout(() => sprite.stop(), 300))
      .start();
    animate();
  }

  public bind<E>(event: string, fn: (event: E) => unknown) {
    this.getInstance()?.on(event, fn);
  }
}
