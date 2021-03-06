import React, { useRef, useLayoutEffect } from 'react';
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import BaseRole from './BaseRole';
import CarlyYatesRole from './CarlyYatesRole';
import { animate } from './roleUtils';
import styles from './RolesWidget.less';
import 'animate.css';
import _add from 'lodash/add';
import _divide from 'lodash/divide';
import _random from 'lodash/random';

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
import carlyYatesToolbar from '../../assets/images/roles/Customer toolbar in homepage@2x.png';
import TeresaJuarezRole from './TeresaJuarezRole';
import damonMensonMsg from '../../assets/random1.png';
import jamesAnyeniMsg from '../../assets/random2.png';
import damonMensonMsg2 from '../../assets/random3.png';
import jamesAnyeniMsg2 from '../../assets/random4.png';
import surinPotterMsg from '../../assets/random5.png';
import jadeKinzelMsg from '../../assets/random6.png';
import luisMeloMsg from '../../assets/random7.png';
import titoDias from '../../assets/images/roles/Tito Dias.png';
import juneCadavez from '../../assets/images/roles/June Cadavez.png';

interface RolesWidgetProps {
  carlyYatesProps?: {
    position: PIXI.IPointData;
  };
  teresaJuarezProps?: {
    position: PIXI.IPointData;
  };
  showFreeDialogue?: boolean;
  onInit?: (
    carlyYatesInstance: CarlyYatesRole,
    teresaJuarez: TeresaJuarezRole,
    toggleCommonRole: (visible: boolean) => void,
  ) => void;
}

const RolesWidget: React.FC<RolesWidgetProps> = (props) => {
  const {
    onInit,
    carlyYatesProps,
    teresaJuarezProps,
    showFreeDialogue = false,
  } = props;
  const mainPanel = useRef<HTMLDivElement>(null);
  const carlyYatesRole = useRef<CarlyYatesRole>();
  // @ts-ignore
  const teresaJuarezRole = useRef<BaseRole>();

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
    app.stage.sortableChildren = true;

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
      .add('carlyYatesToolbar', carlyYatesToolbar)
      .add('titoDias', titoDias)
      .add('juneCadavez', juneCadavez)
      .load(function () {
        const carlyYates = new CarlyYatesRole(
          app,
          ['carlyYates01', 'carlyYates03'],
          carlyYatesProps?.position
            ? carlyYatesProps.position
            : { x: 260, y: 190 },
          ['carlyYates01', 'carlyYates04'],
        );

        const teresaJuarez = new TeresaJuarezRole(
          app,
          ['teresaJuarez01', 'teresaJuarez03'],
          teresaJuarezProps?.position
            ? teresaJuarezProps.position
            : { x: 886, y: 540 },
        );

        carlyYates.bind<MouseEvent>('click', () => {
          carlyYates.toggleMenu();
        });

        carlyYatesRole.current = carlyYates;
        teresaJuarezRole.current = teresaJuarez;

        const pelinVenz = new BaseRole(app, 'pelinVenz', { x: 890, y: 400 });
        pelinVenz.setSacle({ x: 0.5, y: 0.5 });

        const w2 = new BaseRole(app, 'w2', { x: 1644, y: 467 });
        const titoDias = new BaseRole(app, 'titoDias', { x: 1527, y: 601 });
        const juneCadavez = new BaseRole(app, 'juneCadavez', {
          x: 1440,
          y: 720,
        });

        const damonMenson = new BaseRole<PIXI.Sprite>(
          app,
          ['damonMenson01', 'damonMenson02'],
          { x: 430, y: 166 },
        );
        showFreeDialogue && damonMenson.showMessage(damonMensonMsg, 2, 178, 70);
        // showFreeDialogue && damonMenson.showMessage(damonMensonMsg2, 9, 312, 70);

        const emmyElsner = new BaseRole(
          app,
          ['emmyElsner01', 'emmyElsner02'],
          {
            x: 540,
            y: 40,
          },
          true,
          false,
        );

        emmyElsner.move();

        const jadeKinzel = new BaseRole(app, ['jadeKinzel01', 'jadeKinzel02'], {
          x: 959,
          y: 632,
        });
        showFreeDialogue && jadeKinzel.showMessage(jadeKinzelMsg, 9, 394, 84);

        const jamesAnyeni = new BaseRole(
          app,
          ['jamesAnyeni01', 'jamesAnyeni02'],
          { x: 1245, y: 189 },
        );
        showFreeDialogue &&
          jamesAnyeni.showMessage(jamesAnyeniMsg, 12, 324, 74);
        showFreeDialogue &&
          jamesAnyeni.showMessage(jamesAnyeniMsg2, 7, 394, 84);

        const surinPotter = new BaseRole(
          app,
          ['surinPotter01', 'surinPotter02'],
          { x: 1178, y: 438 },
        );

        const tomSive = new BaseRole(app, ['tomSive01', 'tomSive02'], {
          x: 1546,
          y: 384,
        });
        showFreeDialogue && surinPotter.showMessage(surinPotterMsg, 8, 340, 84);
        showFreeDialogue && tomSive.showMessage(luisMeloMsg, 4, 149, 70);

        [jadeKinzel, jamesAnyeni, surinPotter].forEach((item) => {
          const instance = item.getInstance();
          const position = instance.position;
          const width = instance.width;
          const height = instance.height;

          instance.anchor.set(0.5, 0.5);
          instance.position.set(
            _add(position.x, _divide(width, 2)),
            _add(position.y, _divide(height, 2)),
          );
        });

        onInit?.(carlyYates, teresaJuarez, (visible) => {
          [jadeKinzel, jamesAnyeni, surinPotter].forEach((item) => {
            setTimeout(() => {
              new TWEEN.Tween(item.getInstance())
                .to(
                  {
                    scale: {
                      x: visible ? 1 : 0,
                      y: visible ? 1 : 0,
                    },
                    rotation: visible ? 0 : 1,
                  },
                  900,
                )
                .easing(TWEEN.Easing.Elastic.InOut)
                .start();
              animate();
            }, _random(0, 300));
          });
        });
      });
  }, []);

  return <div className={styles.rolesWidget} ref={mainPanel}></div>;
};

export default RolesWidget;
