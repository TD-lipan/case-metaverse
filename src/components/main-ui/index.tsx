import { Scene } from '@/pages/use-scene';
import React, { useRef } from 'react';
import CreateCase from '../create-case';
import FilterBar from '../filter-bar';
import RolesWidget from '@/components/roles';
import { Action } from '../automatic-typing';
import * as PIXI from 'pixi.js';
import CarlyYatesRole from '../roles/CarlyYatesRole';
import TeresaJuarezRole from '../roles/TeresaJuarezRole';
import { useCallback } from 'react';
import _once from 'lodash/once';
import _subtract from 'lodash/subtract';
import { useState } from 'react';
import { useMemo } from 'react';
import Message, {
  calculatePositionBySizeAndCenterPoint,
} from '@/components/message/Message';
import airpods from '@/assets/B Airpods default 3@2x.png';
import airpodsHover from '@/assets/B Airpods hover@2x.png';
import agentRecommend from '@/assets/B discount information@2x.png';
import InputBox from '@/components/input-box';

const actions: Action[] = [
  { type: 'typing', key: 0, word: 'Could you see the VR model I sent you?' },
  { type: 'outbound', key: 1 },
  {
    type: 'typing',
    key: 2,
    word: 'You could choose any font, color, and content you like and engrave it on the product. I will recommend you choose the center of the box. What do you want to write for your niece?',
  },
  { type: 'outbound', key: 3 },
  { type: 'inbound', key: 4 },
  { type: 'inbound', key: 5 },
  { type: 'typing', key: 0, word: 'Could you see the VR model I sent you?' },
  { type: 'outbound', key: 3 },
];

export default function ({
  setScene,
}: {
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
}) {
  const carlyYates = useRef<CarlyYatesRole>();
  const teresaJuarez = useRef<TeresaJuarezRole>();
  const toggleCommonRole = useRef(() => {});

  const [createCaseVisible, setCreateCaseVisible] = useState(false);

  const move1 = useMemo(() => {
    return _once(() => {
      const cy = carlyYates.current;
      const tj = teresaJuarez.current;

      if (!cy || !tj) return;

      cy.move1();
      setTimeout(() => tj.move1(), 1000);

      const airpodsBoxW = 192;
      const airpodsBoxH = 166;
      const airpodsBox = new Message(airpods, {
        width: airpodsBoxW + 'px',
        height: airpodsBoxH + 'px',
        cursor: 'pointer',
      });

      const recommendBoxW = 332;
      const recommendBoxH = 178;
      const recommendBox = new Message(agentRecommend, {
        width: recommendBoxW + 'px',
        height: recommendBoxH + 'px',
        cursor: 'pointer',
      });

      airpodsBox.getImgInstance().then((elem) => {
        elem.addEventListener('mouseover', () => (elem.src = airpodsHover));
        elem.addEventListener('mouseout', () => (elem.src = airpods));
        elem.addEventListener('click', () => {
          const recommendBoxP = calculatePositionBySizeAndCenterPoint(
            recommendBoxW,
            recommendBoxH,
            tj.getCenterPoint(),
          );
          recommendBox.show(recommendBoxP.x, recommendBoxP.y - 8, 2000);
          setTimeout(() => airpodsBox.hide(), 2000);
        });
      });

      setTimeout(() => {
        const airpodsBoxP = calculatePositionBySizeAndCenterPoint(
          airpodsBoxW,
          airpodsBoxH,
          cy.getCenterPoint(),
        );
        airpodsBox.show(_subtract(airpodsBoxP.x, 48), airpodsBoxP.y);
      }, 2000);
    });
  }, []);

  return (
    <>
      <RolesWidget
        onInit={(cy, tj, fn) => {
          carlyYates.current = cy;
          teresaJuarez.current = tj;
          toggleCommonRole.current = fn;
        }}
      />
      {createCaseVisible && <CreateCase setScene={setScene} />}
      <InputBox
        actions={actions}
        onInBound={(action: Action) => {
          console.log(action);
        }}
        onOutBound={(action: Action) => {
          console.log(action);
        }}
      />
      <FilterBar
        onClick={() => {
          toggleCommonRole.current();
          move1();
        }}
      />
    </>
  );
}
