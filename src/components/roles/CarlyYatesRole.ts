import BaseRole from './BaseRole';
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
    const group = this.getGroupInstance();

    const p1 = new TWEEN.Tween(group)
      .to({ x: 242, y: 380 }, 1000)
      .onStart(() => sprite.play());

    const p2 = new TWEEN.Tween(group)
      .to({ x: 530, y: 480 }, 1300)
      .onComplete(() => setTimeout(() => sprite.stop(), 300));

    p1.chain(p2.delay(300)).start();
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

  public talk() {
    console.log(
      _add(
        this.groupInstance.getGlobalPosition().x,
        _divide(this.getInstance().width, 2),
      ),
    );
  }
}
