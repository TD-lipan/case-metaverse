import { Scene } from '@/pages/use-scene';
import React, { useCallback, useRef } from 'react';
import CreateCase from '../create-case';
import FilterBar from '../filter-bar';
import RolesWidget from '@/components/roles';
import { Action } from '../automatic-typing';
import CarlyYatesRole from '../roles/CarlyYatesRole';
import TeresaJuarezRole from '../roles/TeresaJuarezRole';
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
import chatBubble1 from '../../assets/beforeCreateCase1.png';
import chatBubble2 from '../../assets/beforeCreateCase2.png';
import chatBubble3 from '../../assets/beforeCreateCase3.png';
import chatBubble4 from '../../assets/beforeCreateCase4.png';
import chatBubble5 from '../../assets/beforeCreateCase5.png';
import chatBubble6 from '../../assets/beforeCreateCase6.png';

const actions: Action[] = [
  { type: 'inbound', key: 0, src: chatBubble1, width: 394, height: 84 },
  {
    type: 'typing',
    key: 1,
    word: "that's a wonderful choice I would recommend you the white one as it is in stock",
  },
  { type: 'outbound', key: 2, src: chatBubble2, width: 395, height: 95 },
  { type: 'inbound', key: 3, src: chatBubble3, width: 395, height: 70 },
  {
    type: 'typing',
    key: 4,
    word: 'We have a customization service, do you wanna try?',
  },
  { type: 'outbound', key: 5, src: chatBubble4, width: 394, height: 76 },
  { type: 'inbound', key: 6, src: chatBubble5, width: 173, height: 74 },
  { type: 'outbound', key: 7, src: chatBubble6, width: 305, height: 106 },
];

export default function ({
  setScene,
  onToggleCommonRole = (flag: boolean) => {},
}: {
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
  onToggleCommonRole: (flag: boolean) => void;
}) {
  const carlyYates = useRef<CarlyYatesRole | null>(null);
  const teresaJuarez = useRef<TeresaJuarezRole | null>(null);
  const toggleCommonRole = useRef(() => {});
  const currentMessage = useRef<Message>();

  const [createCaseVisible, setCreateCaseVisible] = useState(false);

  const onInput = useCallback((action: Action) => {
    if (action.type === 'typing') return;

    const sprite =
      action.type === 'inbound' ? carlyYates.current : teresaJuarez.current;
    const { width, height, src } = action;

    if (!src || !sprite || !width || !height) return;

    const isLast = action.key === 7;

    currentMessage.current?.hide();

    const messageBox = new Message(src, {
      width: width + 'px',
      height: height + 'px',
      cursor: isLast ? 'pointer' : 'unset',
    });

    if (isLast) {
      messageBox.getImgInstance().then((elem) =>
        elem.addEventListener('click', () => {
          messageBox.hide();
          setTimeout(() => setCreateCaseVisible(true), 700);
        }),
      );
    }

    const position = calculatePositionBySizeAndCenterPoint(
      width,
      height,
      sprite.getCenterPoint(),
    );

    setTimeout(() => messageBox.show(position.x, position.y - 8), 300);

    currentMessage.current = messageBox;
  }, []);

  const move1 = useMemo(() => {
    return _once(() => {
      const cy = carlyYates.current;
      const tj = teresaJuarez.current;

      if (!cy || !tj) return;

      cy.move1();

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
          setTimeout(() => airpodsBox.hide(), 0);
          recommendBox.show(recommendBoxP.x, recommendBoxP.y - 8, 2000);
        });
      });

      setTimeout(() => {
        const airpodsBoxP = calculatePositionBySizeAndCenterPoint(
          airpodsBoxW,
          airpodsBoxH,
          cy.getCenterPoint(),
        );
        airpodsBox.show(_subtract(airpodsBoxP.x, 48), airpodsBoxP.y);
        setTimeout(() => tj.move1(), 700);
      }, 2300);
    });
  }, []);

  return (
    <>
      <RolesWidget
        showFreeDialogue={true}
        onInit={(cy, tj, fn) => {
          carlyYates.current = cy;
          teresaJuarez.current = tj;
          toggleCommonRole.current = fn;
        }}
      />
      <InputBox actions={actions} onInBound={onInput} onOutBound={onInput} />
      <CreateCase
        left={276}
        top={4}
        visible={createCaseVisible}
        setScene={setScene}
      />
      <FilterBar
        onClick={(flag: boolean) => {
          toggleCommonRole.current();
          onToggleCommonRole(flag);
          move1();
        }}
      />
    </>
  );
}
