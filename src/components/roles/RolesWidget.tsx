import React, { useRef, useLayoutEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import BaseRole from './BaseRole';
import CarlyYatesRole from './CarlyYatesRole';

import styles from './RolesWidget.less';
import 'animate.css';

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
import surinPotterMsg from '../../assets/random3.png';
import jamesAnyeniMsg2 from '../../assets/random4.png';
import jamesAnyeniMsg3 from '../../assets/random5.png';
import jamesAnyeniMsg4 from '../../assets/random6.png';
import airpods from '../../assets/airpods.png';
import airpodsHover from '../../assets/airpodsHover.png';
import airpodsAgent from '../../assets/airpodsAgent.png';
import { Action } from '@/components/automatic-typing';
import InputBox from '@/components/input-box';
import chatBubble1 from '../../assets/beforeCreateCase1.png';
import chatBubble2 from '../../assets/beforeCreateCase2.png';
import chatBubble3 from '../../assets/beforeCreateCase3.png';
import chatBubble4 from '../../assets/beforeCreateCase4.png';
import chatBubble5 from '../../assets/beforeCreateCase5.png';
import chatBubble6 from '../../assets/beforeCreateCase6.png';

const RolesWidget: React.FC = () => {
  const mainPanel = useRef<HTMLDivElement>(null);
  const carlyYatesRole = useRef<CarlyYatesRole>();
  // @ts-ignore
  const teresaJuarezRole = useRef<BaseRole>();
  const actions: Action[] = [
    {
      type: 'typing',
      key: 0,
      word: "that's a wonderful choice I would recommend you the white one as it is in stock",
    },
    { type: 'outbound', key: 1, src: chatBubble2 },
    { type: 'inbound', key: 2, src: chatBubble3 },
    {
      type: 'typing',
      key: 3,
      word: 'We have a customization service, do you wanna try?',
    },
    { type: 'outbound', key: 4, src: chatBubble4 },
    { type: 'inbound', key: 5, src: chatBubble5 },
    { type: 'outbound', key: 6, src: chatBubble6 },
  ];

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
      .load(function () {
        const carlyYates = new CarlyYatesRole(
          app,
          ['carlyYates01', 'carlyYates03'],
          { x: 260, y: 190 },
        );

        const teresaJuarez = new TeresaJuarezRole(
          app,
          ['teresaJuarez01', 'teresaJuarez03'],
          { x: 886, y: 540 },
        );

        carlyYates.bindForGroup<MouseEvent>('mouseover', () => {
          carlyYates.toggleMenu(true);
          carlyYates.onHover(airpodsHover);
        });

        carlyYates.bindForGroup<MouseEvent>('mouseout', (event) => {
          carlyYates.toggleMenu(false);
          carlyYates.onHover(airpods);
        });

        carlyYates.bind<MouseEvent>('click', () => {
          carlyYates.move();
          setTimeout(() => {
            teresaJuarez.move();
            setTimeout(() => {
              carlyYates.showAirPodsMsg(airpods, 192, 5);
              // setTimeout(()=>{
              //   carlyYates.onHover(airpodsHover)
              //   setTimeout(()=>{carlyYates.hideAirPodsMsg()},1000)
              // },5000);
              teresaJuarez.showMessage(airpodsAgent, 1, 332, 178);
            }, 1000);
          }, 1300);
        });

        carlyYatesRole.current = carlyYates;
        teresaJuarezRole.current = teresaJuarez;

        const pelinVenz = new BaseRole(app, 'pelinVenz', { x: 890, y: 400 });
        pelinVenz.setSacle({ x: 0.5, y: 0.5 });

        const w2 = new BaseRole(app, 'w2', { x: 1644, y: 467 });

        const damonMenson = new BaseRole<PIXI.Sprite>(
          app,
          ['damonMenson01', 'damonMenson02'],
          { x: 430, y: 166 },
        );
        damonMenson.showMessage(damonMensonMsg, 2, 178, 70);

        const emmyElsner = new BaseRole(app, ['emmyElsner01', 'emmyElsner02'], {
          x: 540,
          y: 40,
        });

        emmyElsner.move();

        const jadeKinzel = new BaseRole(app, ['jadeKinzel01', 'jadeKinzel02'], {
          x: 959,
          y: 632,
        });
        jadeKinzel.showMessage(jamesAnyeniMsg3, 9, 394, 84);

        const jamesAnyeni = new BaseRole(
          app,
          ['jamesAnyeni01', 'jamesAnyeni02'],
          { x: 1245, y: 189 },
        );
        jamesAnyeni.showMessage(jamesAnyeniMsg, 12, 394, 84);
        jamesAnyeni.showMessage(jamesAnyeniMsg2, 7, 394, 84);

        const surinPotter = new BaseRole(
          app,
          ['surinPotter01', 'surinPotter02'],
          { x: 1178, y: 438 },
        );

        surinPotter.showMessage(surinPotterMsg, 3, 394, 70);

        const tomSive = new BaseRole(app, ['tomSive01', 'tomSive02'], {
          x: 1546,
          y: 384,
        });
        tomSive.showMessage(jamesAnyeniMsg4, 8, 394, 84);
      });
  }, []);

  return (
    <>
      <InputBox
        actions={actions}
        onInBound={(action: Action) => {
          action.src &&
            teresaJuarezRole.current?.showMessage(action.src, 0.5, 100, 100);
        }}
        onOutBound={(action: Action) => {
          action.src &&
            carlyYatesRole.current?.showMessage(action.src, 0.5, 100, 100);
        }}
      />
      <div className={styles.rolesWidget} ref={mainPanel}></div>
    </>
  );
};

export default RolesWidget;
