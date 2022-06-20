import * as PIXI from 'pixi.js';
import { addDynamicRole, addStaticRole } from './roleUtils';
import _divide from 'lodash/divide';
import _add from 'lodash/add';
import Message from '@/components/message/Message';

export default class BaseRole<T extends PIXI.Sprite> {
  private name: string;
  private instance: T;
  private app: PIXI.Application;

  constructor(
    app: PIXI.Application,
    resources: string[] | string,
    position: PIXI.IPointData,
    needToStage = true,
  ) {
    if (resources instanceof Array) {
      this.name = resources[0].replace(/\d{2,}$/, '');
      this.instance = addDynamicRole(app, resources, position);
    } else {
      this.name = resources;
      this.instance = addStaticRole(app, resources, position);
    }

    this.app = app;
    needToStage && app.stage.addChild(this.instance);
  }

  public getApp() {
    return this.app;
  }

  public getInstance() {
    return this.instance;
  }

  public showMessage(
    src: string,
    second: number,
    width: number,
    height: number,
  ) {
    const afterX = this.instance.x + 53 - width / 2;
    const afterY = this.instance.y - height;

    const messageBox = new Message(src);
    setTimeout(() => {
      messageBox.show(afterX, afterY);
      setTimeout(() => {
        messageBox.hide();
      }, 2000);
    }, second * 1000);
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

  public talk() {
    console.log(
      _add(this.instance.position.x, _divide(this.instance.width, 2)),
    );
  }
}
