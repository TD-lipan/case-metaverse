import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './index.less';
import OrderPaid from './OrderPaid';
import C01 from './images/live-chat-bubble/C01.png';
import C02 from './images/live-chat-bubble/C02.png';
import C03 from './images/live-chat-bubble/C03.png';
import C04 from './images/live-chat-bubble/C04.png';
import C05 from './images/live-chat-bubble/C05.png';
import C06 from './images/live-chat-bubble/C06.png';
import C07 from './images/live-chat-bubble/C07.png';
import C08 from './images/live-chat-bubble/C08.png';

import T01 from './images/live-chat-bubble/T01.png';
import T02 from './images/live-chat-bubble/T02.png';
import T03 from './images/live-chat-bubble/T03.png';
import T04 from './images/live-chat-bubble/T04.png';
import T05 from './images/live-chat-bubble/T05.png';
import T06 from './images/live-chat-bubble/T06.png';
import { useState } from 'react';

export default function ({ onStartDarg, showEamil, step }: { onStartDarg: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void, showEamil: boolean, step: number }) {

    const chartAreaRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!chartAreaRef.current) return;
        chartAreaRef.current.scrollTop = chartAreaRef.current.scrollHeight;
    });

    const renderLiveChatBubble = () => {
        return (
            <>
                {step >= 1 && <div className={styles.liveChatBubble} ><img src={T03} style={{ float: 'right' }} /></div>}
                {step >= 2 && <div className={styles.liveChatBubble} ><img src={C04} /></div>}
                {step >= 3 && <div className={styles.liveChatBubble} style={{ height: "90px" }}><img src={T04} style={{ float: 'right' }} /></div>}
                {step >= 4 && <div className={styles.liveChatBubble} ><img src={C05} /></div>}
                {step >= 5 && <div className={styles.liveChatBubble} ><img src={C06} /></div>}
                {step >= 6 && <div className={styles.liveChatBubble} ><img src={C07} /></div>}
                {step >= 7 && <div className={styles.liveChatBubble} ><img src={T05} style={{ float: 'right' }} /></div>}
                {step >= 8 && <div className={styles.liveChatBubble} ><img src={C08} /></div>}
                {step >= 9 && <div className={styles.liveChatBubble} ><img src={T06} style={{ float: 'right' }} /></div>}
            </>
        )
    }

    return (
        <>
            <div className={styles.chartArea} ref={chartAreaRef}>
                {renderLiveChatBubble()}
                {step >= 10 && <div className={styles.time} style={{ top: '6px' }}>11:20AM</div>}
                {step >= 10 && <div className={styles.infoMessage} />}
                {step >= 11 && <div className={styles.airpods} />}

                {step >= 12 && <div className={styles.time} style={{ top: '110px' }}>11:28AM</div>}
                {step >= 12 && <OrderPaid onStartDarg={onStartDarg} />}
                {showEamil && <div className={styles.emailCard} />}

            </div>
        </>
    );
}
