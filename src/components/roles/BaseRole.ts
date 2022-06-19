import * as PIXI from 'pixi.js';
import { addDynamicRole, addStaticRole } from './roleUtils';

export default class BaseRole<T extends PIXI.Sprite> {
  private name: string;
  private instance: T;

  constructor(
    app: PIXI.Application,
    resources: string[] | string,
    position: PIXI.IPointData,
  ) {
    if (resources instanceof Array) {
      this.name = resources[0].replace(/\d{2,}$/, '');
      this.instance = addDynamicRole(app, resources, position);
    } else {
      this.name = resources;
      this.instance = addStaticRole(app, resources, position);
    }

    app.stage.addChild(this.instance);
  }

  public getInstance() {
    return this.instance;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setSacle(scale: PIXI.IPointData) {
    this.instance.scale.set(scale.x, scale.y);
  }

  public setSpeed(speed: number) {
    if (this.instance instanceof PIXI.AnimatedSprite)
      this.instance.animationSpeed = speed;
  }
}
