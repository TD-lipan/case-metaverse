import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './index.less';
import OrderPaid from './OrderPaid';

export default function ({ onStartDarg, showEamil }: { onStartDarg: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void, showEamil: boolean }) {
    const chartAreaRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!chartAreaRef.current) return;
        chartAreaRef.current.scrollTop = chartAreaRef.current.scrollHeight;
    });

    return (
        <>
            <div className={styles.chartArea} ref={chartAreaRef}>

                <div className={styles.time} style={{ top: '6px' }}>11:20AM</div>
                <div className={styles.airpods} />
                <div className={styles.infoMessage} />
                <div className={styles.time} style={{ top: '110px' }}>11:28AM</div>
                <OrderPaid onStartDarg={onStartDarg} />
                {showEamil && <div className={styles.emailCard} />}
            </div>
        </>
    );
}
