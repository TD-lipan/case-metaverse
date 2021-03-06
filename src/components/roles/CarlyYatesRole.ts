import BaseRole, { PointsType } from './BaseRole';
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import { addStaticRole, animate } from './roleUtils';
import _divide from 'lodash/divide';
import _add from 'lodash/add';
import Message from '@/components/message/Message';

export default class CarlyYatesRole extends BaseRole<PIXI.AnimatedSprite> {
  private menuInstance: PIXI.Sprite;
  private groupInstance: PIXI.Container;
  private msgInstance: any = null;
  private jumpResources: string[] = [];

  constructor(
    app: PIXI.Application,
    resources: string[] | string,
    position: PIXI.IPointData,
    jumpResources: string[],
  ) {
    super(app, resources, { x: 0, y: 0 }, false, false);

    const sprite = this.getInstance();
    sprite.interactive = true;
    sprite.cursor = 'pointer';
    this.jumpResources = jumpResources;
    this.menuInstance = this.initMenuInstance();
    this.groupInstance = new PIXI.Container();
    this.groupInstance.interactive = true;
    this.groupInstance.zIndex = 1;
    this.groupInstance.position.set(position.x, position.y);
    this.groupInstance.addChild(sprite);
    this.groupInstance.addChild(this.menuInstance);

    app.stage.addChild(this.groupInstance);
    console.log(this.groupInstance.width, this.getGroupInstance.length);
  }

  public jump() {
    const instance = this.getInstance();
    const app = this.getApp();

    instance.stop();
    this.menuInstance.visible = false;
    instance.textures = this.jumpResources.reduce(
      (textures: PIXI.Texture[], res: string) => {
        const texture = app.loader.resources[res].texture;

        texture && textures.push(texture);

        return textures;
      },
      [],
    );

    setTimeout(() => {
      instance.play();
    }, 300);
  }

  private initMenuInstance() {
    const menuInstance: PIXI.Sprite = addStaticRole(
      this.getApplication(),
      'carlyYatesToolbar',
      { x: 109, y: 15 },
    );

    menuInstance.interactive = true;
    menuInstance.scale.set(0.5, 0.5);
    menuInstance.visible = false;
    menuInstance.cursor = 'pointer';

    return menuInstance;
  }

  public move1() {
    const sprite = this.getInstance();
    const group = this.getGroupInstance();

    const p1 = new TWEEN.Tween(group)
      .to({ x: 242, y: 430 }, 1000)
      .onStart(() => sprite.play());

    const p2 = new TWEEN.Tween(group)
      .to({ x: 380, y: 490 }, 800)
      .onComplete(() => setTimeout(() => sprite.stop(), 300));

    p1.chain(p2.delay(200)).start();
    animate();
  }

  public move2() {
    const sprite = this.getInstance();
    const group = this.getGroupInstance();

    const p1 = new TWEEN.Tween(group)
      .to({ x: 530, y: 480 }, 1300)
      .onStart(() => sprite.play())
      .onComplete(() => setTimeout(() => sprite.stop(), 300));

    p1.start();
    animate();
  }

  public getGroupInstance() {
    return this.groupInstance;
  }

  public toggleMenu(visible?: boolean) {
    this.menuInstance.visible =
      visible != null ? visible : !this.menuInstance.visible;
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

  public setPosition(position: PIXI.IPointData) {
    this.groupInstance.position.set(position.x, position.y);
  }

  public showAirPodsMsg(src: string, width: number, height: number) {
    const afterX =
      this.groupInstance.getGlobalPosition().x + 53 - width / 2 + 30;
    const afterY = this.groupInstance.getGlobalPosition().y - 140;
    this.msgInstance = new Message(src);
    setTimeout(() => {
      this.msgInstance.show(afterX, afterY);
    }, 100);
  }

  public onHover(src: string) {
    if (this.msgInstance) this.msgInstance.changeSource(src);
  }

  public hideAirPodsMsg() {
    if (this.msgInstance) this.msgInstance.hide();
  }

  public getCenterPoint() {
    return {
      x: _add(
        this.groupInstance.getGlobalPosition().x,
        _divide(this.getInstance().width, 2),
      ),
      y: this.groupInstance.getGlobalPosition().y,
    };
  }
}
