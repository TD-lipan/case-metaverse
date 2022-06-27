import React, { useCallback, useMemo, useState, useEffect } from 'react';
import styles from './index.less';
import ChannelBar from './ChannelBar';
import ChartArea from './ChartArea';
import useDrag from '@/hooks/use-drag';

import orderDetailsDrag from './images/order_details_drag.png';
import AutomaticTyping, { Action } from '../automatic-typing';
import WorkFlow from './WorkFlow';

const actions: Action[] = [
  { type: 'typing', key: 0, word: 'Could you see the VR model I sent you?' },
  { type: 'outbound', key: 0 },
  { type: 'inbound', key: 1 },
  {
    type: 'typing',
    key: 2,
    word: 'You could choose any font, color, and content you like and engrave it on the product. I will recommend you choose the center of the box. What do you want to write for your niece?',
  },
  { type: 'outbound', key: 2 },
  { type: 'inbound', key: 3 },
  { type: 'inbound', key: 4 },
  { type: 'inbound', key: 5 },
  {
    type: 'typing',
    key: 6,
    word: 'I could try to add a cute sticker on it. Do you like this?',
  },
  { type: 'outbound', key: 6 },
  { type: 'inbound', key: 7 },
  { type: 'typing', key: 8, word: 'No problem.' },
  { type: 'outbound', key: 8 },
  { type: 'inbound', key: 9 },
  { type: 'inbound', key: 10 },
  { type: 'outbound', key: 11 },
];
export default function ({ marginLeft }: { marginLeft: number }) {
  const {
    noDarg,
    draging,
    dragX,
    dragY,
    targetAreaHover,
    onEndMouseOver,
    onEndMouseLeave,
    isDraged,
    setIsDraged,
    onStartDarg,
  } = useDrag();
  const [step, setStep] = useState<number>(0);

  const workFlowStep = useMemo(() => {
    if (step === 0) return 0;
    if (step < 10) return 1;
    if (step === 10) return 1.5;
    if (step === 11) return 2;
    if (step > 11) return 2.1;
    return 0;
  }, [step]);

  return (
    <>
      <div className={styles.workspace} style={{ marginLeft: marginLeft }}>
        <WorkFlow step={workFlowStep} />
        <ChartArea onStartDarg={onStartDarg} step={step} setStep={setStep} />
        <div
          className={`${styles.targetArea} ${targetAreaHover}`}
          onMouseOver={onEndMouseOver}
          onMouseLeave={onEndMouseLeave}
        ></div>

        {isDraged && step < 12 && (
          <div
            className={styles.orderPaidInput}
            onClick={() => setIsDraged(false)}
          ></div>
        )}

        <ChannelBar />

        <AutomaticTyping
          width={666}
          height={85}
          left={13}
          top={725}
          sendWidth={70}
          sendHeight={24}
          sendLeft={589}
          sendTop={825}
          onInBound={(action: Action) => {
            setStep(Number(action.key) + 1);
          }}
          onOutBound={(action: Action) => {
            setStep(Number(action.key) + 1);
          }}
          actions={actions}
        />
      </div>
      <img
        className={styles.orderDetailsDrag}
        src={orderDetailsDrag}
        onDragStart={noDarg}
        style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }}
      />
    </>
  );
}
