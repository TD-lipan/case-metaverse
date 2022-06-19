import { useRef, useLayoutEffect } from 'react';
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import styles from './baseRole.less';

import carlyYates01 from '../../assets/images/roles/Carly Yates01.png';
import carlyYates02 from '../../assets/images/roles/Carly Yates02.png';
import carlyYates03 from '../../assets/images/roles/Carly Yates03.png';
import carlyYates04 from '../../assets/images/roles/Carly Yates04.png';
import pelinVenz from '../../assets/images/roles/Pelin Venz.png';
import w2 from '../../assets/images/roles/2w2.png';
import damonMenson01 from '../../assets/images/roles/Damon Menson01.png';
import damonMenson02 from '../../assets/images/roles/Damon Menson02.png';
import emmyElsner01 from '../../assets/images/roles/Emmy Elsner 01.png';
import emmyElsner02 from '../../assets/images/roles/Emmy Elsner 02.png';
import jadeKinzel01 from '../../assets/images/roles/Jade Kinzel01.png';
import jadeKinzel02 from '../../assets/images/roles/Jade Kinzel02.png';
import jamesAnyeni01 from '../../assets/images/roles/James Anyeni01.png';
import jamesAnyeni02 from '../../assets/images/roles/James Anyeni02.png';
import surinPotter01 from '../../assets/images/roles/Surin Potter01.png';
import surinPotter02 from '../../assets/images/roles/Surin Potter02.png';
import teresaJuarez01 from '../../assets/images/roles/Teresa Juarez01.png';
import teresaJuarez02 from '../../assets/images/roles/Teresa Juarez02.png';
import teresaJuarez03 from '../../assets/images/roles/Teresa Juarez03.png';
import tomSive01 from '../../assets/images/roles/Tom Sive01.png';
import tomSive02 from '../../assets/images/roles/Tom Sive02.png';

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

function addStaticRole(
  app: PIXI.Application,
  resourceName: string,
  position: PIXI.IPointData,
  scale?: PIXI.IPointData,
) {
  const sprite = new PIXI.Sprite(app.loader.resources[resourceName].texture);

  sprite.x = position.x;
  sprite.y = position.y;
  scale && sprite.scale.set(scale.x, scale.y);

  app.stage.addChild(sprite);
  return sprite;
}

function addDynamicRole(
  app: PIXI.Application,
  resources: string[],
  position: PIXI.IPointData,
  speed?: number,
  scale?: PIXI.IPointData,
) {
  const animatedSprite = new PIXI.AnimatedSprite(
    resources.reduce((textures: PIXI.Texture[], res: string) => {
      const texture = app.loader.resources[res].texture;

      texture && textures.push(texture);

      return textures;
    }, []),
  );

  animatedSprite.x = position.x;
  animatedSprite.y = position.y;
  speed && (animatedSprite.animationSpeed = 0.075);
  scale && animatedSprite.scale.set(scale.x, scale.y);

  app.stage.addChild(animatedSprite);
  return animatedSprite;
}

const BaseRole: React.FC = () => {
  const mainPanel = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const _mainPanel = mainPanel.current;

    if (!_mainPanel) return;

    const app = new PIXI.Application({
      width: 1920,
      height: 1080,
      antialias: true,
      transparent: true,
      resolution: 0.87,
      backgroundAlpha: 0,
      forceCanvas: false,
    });

    !_mainPanel.hasChildNodes() && _mainPanel.append(app.view);

    app.loader
      .add('carlyYates01', carlyYates01)
      .add('carlyYates02', carlyYates02)
      .add('carlyYates03', carlyYates03)
      .add('carlyYates04', carlyYates04)
      .add('pelinVenz', pelinVenz)
      .add('w2', w2)
      .add('damonMenson01', damonMenson01)
      .add('damonMenson02', damonMenson02)
      .add('emmyElsner01', emmyElsner01)
      .add('emmyElsner02', emmyElsner02)
      .add('jadeKinzel01', jadeKinzel01)
      .add('jadeKinzel02', jadeKinzel02)
      .add('jamesAnyeni01', jamesAnyeni01)
      .add('jamesAnyeni02', jamesAnyeni02)
      .add('surinPotter01', surinPotter01)
      .add('surinPotter02', surinPotter02)
      .add('teresaJuarez01', teresaJuarez01)
      .add('teresaJuarez02', teresaJuarez02)
      .add('teresaJuarez03', teresaJuarez03)
      .add('tomSive01', tomSive01)
      .add('tomSive02', tomSive02)
      .load(function () {
        const carlyYates = addDynamicRole(
          app,
          ['carlyYates01', 'carlyYates03'],
          { x: 389, y: 501 },
          0.75,
        );
        addStaticRole(app, 'pelinVenz', { x: 890, y: 400 }, { x: 0.5, y: 0.5 });
        addStaticRole(app, 'w2', { x: 1644, y: 467 });
        addDynamicRole(
          app,
          ['damonMenson01', 'damonMenson02'],
          { x: 430, y: 166 },
          0.75,
        ).play();
        addDynamicRole(
          app,
          ['emmyElsner01', 'emmyElsner02'],
          { x: 540, y: 40 },
          0.75,
        ).play();
        addDynamicRole(
          app,
          ['jadeKinzel01', 'jadeKinzel02'],
          { x: 959, y: 632 },
          0.75,
        ).play();
        addDynamicRole(
          app,
          ['jamesAnyeni01', 'jamesAnyeni02'],
          { x: 1245, y: 189 },
          0.75,
        ).play();
        addDynamicRole(
          app,
          ['surinPotter01', 'surinPotter02'],
          { x: 1178, y: 438 },
          0.75,
        ).play();
        addDynamicRole(
          app,
          ['teresaJuarez01', 'teresaJuarez03'],
          { x: 646, y: 506 },
          0.75,
        ).play();
        addDynamicRole(
          app,
          ['tomSive01', 'tomSive02'],
          { x: 1546, y: 384 },
          0.75,
        ).play();

        new TWEEN.Tween(carlyYates)
          .to({ x: 350, y: 300 }, 1000)
          .to({ x: 450, y: 350 }, 1000)
          .to({ x: 520, y: 370 }, 1000)
          .to({ x: 600, y: 500 }, 1000)
          .easing(TWEEN.Easing.Cubic.Out)
          .onStart(() => carlyYates.play())
          .onComplete(() => setTimeout(() => carlyYates.stop(), 1000))
          .start();
        animate();
      });
  }, []);

  return <div className={styles.mainPanel} ref={mainPanel}></div>;
};

export default BaseRole;
