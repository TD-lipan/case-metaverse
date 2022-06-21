import React, { useCallback, useMemo, useState } from 'react';
import styles from './index.less';
import ChannelBar from './ChannelBar';
import ChartArea from './ChartArea';
import useDrag from './use-drag';

import orderDetailsDrag from './images/order_details_drag.png';
import { useEffect } from 'react';
import AutomaticTyping from './AutomaticTyping';
import WorkFlow from './WorkFlow';
import CustomerizationGif from './CustomerizationGif';
import Customerization from './Customerization';

const wordsMap: { [index: number]: string } = {
    0: "Could you see the VR model I sent you?",
    2: "You could choose any font, color, and content you like and engrave it on the product. I will recommend you choose the center of the box. What do you want to write for your niece?",
    6: "I could try to add a cute sticker on it. Do you like this?",
    8: "No problem."
};

export default function () {
    const { noDarg, draging, dragX, dragY, targetAreaHover, onEndMouseOver, onEndMouseLeave, isDraged, setIsDraged, onStartDarg } = useDrag();
    const [showEmail, setShowEmail] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0);
    const [words, setWords] = useState<string>("");

    const workFlowStep = useMemo(() => {
        if (step === 0) return 0;
        if (step < 10) return 1;
        if (step === 10) return 1.5;
        if (step === 11) return 2;
        if (step > 11) return 2.1;
        return 0;
    }, [step]);
    const hanldeClick = () => {
        if (Object.keys(wordsMap).includes(String(step))) {
            setStep(step + 1);
            setWords("");
        }
        if (step >= 12) {
            setShowEmail(true);
            setIsDraged(false);
        }
    }

    const handleKeyPress = (e: any) => {
        const { key, keyCode } = e;
        if (keyCode !== 13) return;

        if (Object.keys(wordsMap).includes(String(step))) {
            if (!words) setWords(wordsMap[step]);
        } else {
            setStep(prev => prev + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress, false);
        return () => {
            window.removeEventListener("keydown", handleKeyPress, false);
        }
    }, [handleKeyPress])

    return (
        <>
            <div className={styles.workspace} />
            <WorkFlow step={workFlowStep} />
            <ChartArea onStartDarg={onStartDarg} showEamil={showEmail} step={step} setStep={setStep} />
            {/* <img className={styles.callDarg} src={callDrag} onDragStart={noDarg} style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }} /> */}
            <img className={styles.orderDetailsDrag} src={orderDetailsDrag} onDragStart={noDarg} style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }} />
            <div className={`${styles.targetArea} ${targetAreaHover}`} onMouseOver={onEndMouseOver} onMouseLeave={onEndMouseLeave}></div>

            {isDraged && <div className={styles.orderPaidInput} onClick={() => setIsDraged(false)} ></div>}

            <ChannelBar />
            <AutomaticTyping str={words} />
            <div className={styles.typeSomething}>Type something...</div>
            <div className={styles.toolbar} />
            <div className={styles.customerToolbar} />
            {/* <div className={styles.customization} /> */}
            <div className={styles.sendButton} onClick={hanldeClick}></div>
            <Customerization />
            <CustomerizationGif />
        </>
    );
}
