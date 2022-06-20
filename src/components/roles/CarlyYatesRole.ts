import BaseRole from './BaseRole';
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import { addStaticRole, animate } from './roleUtils';
import _divide from 'lodash/divide';
import _add from 'lodash/add';

export default class CarlyYatesRole extends BaseRole<PIXI.AnimatedSprite> {
  private menuInstance: PIXI.Sprite;
  private groupInstance: PIXI.Container;

  constructor(
    app: PIXI.Application,
    resources: string[] | string,
    position: PIXI.IPointData,
  ) {
    const origin = { x: 0, y: 0 };
    super(app, resources, origin, false);

    const sprite = this.getInstance();
    sprite.interactive = true;

    this.menuInstance = this.initMenuInstance(app, origin);

    this.groupInstance = new PIXI.Container();
    this.groupInstance.interactive = true;
    this.groupInstance.zIndex = 1;
    this.groupInstance.position.set(position.x, position.y);

    this.groupInstance.addChild(sprite);
    this.groupInstance.addChild(this.menuInstance);

    app.stage.addChild(this.groupInstance);
  }

  private initMenuInstance(app: PIXI.Application, position: PIXI.IPointData) {
    const menuInstance: PIXI.Sprite = addStaticRole(app, 'carlyYatesToolbar', {
      x: position.x + 109,
      y: position.y + 15,
    });

    menuInstance.interactive = true;
    menuInstance.scale.set(0.5, 0.5);
    menuInstance.visible = false;

    return menuInstance;
  }

  public move() {
    const sprite = this.getInstance();

    new TWEEN.Tween(this.getGroupInstance())
      .to({ x: 580, y: 501 }, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onStart(() => sprite.play())
      .onComplete(() => setTimeout(() => sprite.stop(), 100))
      .start();
    animate();
  }

  public getGroupInstance() {
    return this.groupInstance;
  }

  public toggleMenu(visible: boolean) {
    this.menuInstance.visible = visible;
  }

  public bind<E>(event: string, fn: (event: E) => unknown) {
    this.getInstance().on(event, fn);
  }

  public bindForMenu<E>(event: string, fn: (event: E) => unknown) {
    this.menuInstance.on(event, fn);
  }

  public bindForGroup<E>(event: string, fn: (event: E) => unknown) {
    this.groupInstance.on(event, fn);
  }

  public talk() {
    console.log(
      _add(
        this.groupInstance.getGlobalPosition().x,
        _divide(this.getInstance().width, 2),
      ),
    );
  }
}
