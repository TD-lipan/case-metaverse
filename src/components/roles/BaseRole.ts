import * as PIXI from 'pixi.js';
import { addDynamicRole, addStaticRole, animate } from './roleUtils';
import _divide from 'lodash/divide';
import * as TWEEN from '@tweenjs/tween.js';
import _add from 'lodash/add';
import _random from 'lodash/random';
import Message from '@/components/message/Message';

export type PointsType = {
  x: number;
  y: number;
  delay?: number;
}[];

export default class BaseRole<T extends PIXI.Sprite> {
  private name: string;
  private instance: T;
  private app: PIXI.Application;
  private messageInstance: any = null;

  constructor(
    app: PIXI.Application,
    resources: string[] | string,
    position?: PIXI.IPointData,
    needToStage = true,
    randomPlay = true,
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
    randomPlay && this.randomPlay();
  }

  public getApplication() {
    return this.app;
  }

  public randomPlay() {
    setTimeout(() => {
      if (this.instance instanceof PIXI.AnimatedSprite) {
        this.instance.play();
      }

      setTimeout(() => {
        if (this.instance instanceof PIXI.AnimatedSprite) {
          this.instance.stop();
          this.randomPlay();
        }
      }, 2000);
    }, _random(1000, 5000));
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
    isAuto?: boolean,
  ) {
    const afterX = this.instance.x + 53 - width / 2;
    const afterY = this.instance.y - height;
    this.messageInstance = new Message(src);
    setTimeout(() => {
      this.messageInstance.show(afterX, afterY);
      if (isAuto === undefined || isAuto) {
        setTimeout(() => {
          this.messageInstance.hide();
        }, 2000);
      }
    }, second * 1000);
  }

  public hideMessage() {
    this.messageInstance.hide();
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

  public setPosition(position: PIXI.IPointData) {
    this.instance.position.set(position.x, position.y);
  }

  public move() {
    const instance = this.instance;

    if (instance instanceof PIXI.AnimatedSprite) {
      const { position, width } = instance;
      const start = position.x + width;
      const end = position.x + 500;

      const go = new TWEEN.Tween(instance)
        .to({ x: end }, _random(3000, 5000))
        .onStart(() => {
          instance.play();
        })
        .onComplete(() => {
          setTimeout(() => {
            instance.stop();
          }, 300);
          this.instance.width = -width;
          this.instance.position.x += width;
        });

      const back = new TWEEN.Tween(instance)
        .to({ x: start }, _random(3000, 5000))
        .onStart(() => {
          instance.play();
        })
        .onComplete(() => {
          setTimeout(() => {
            instance.stop();
          }, 300);
          this.instance.width = -width;
          this.instance.position.x -= width;
        });

      go.chain(back.delay(_random(2000, 4000)));
      back.chain(go.delay(_random(2000, 4000)));

      go.start();

      animate();
    }
  }

  public getCenterPoint() {
    return {
      x: _add(this.instance.position.x, _divide(this.instance.width, 2)),
      y: this.instance.position.y,
    };
  }
}
