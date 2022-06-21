import React, { useCallback, useRef, useState } from 'react';
import styles from './index.less';
import customerization from './images/customerization.gif';

export default function () {
    const automaticTypingRef = useRef<HTMLElement>(null);
    const automaticTyping = (str: string) => {

        let str_ = ''
        let i = 0
        let timer = setInterval(() => {
            if (!automaticTypingRef.current) return;
            if (str_.length < str.length) {
                str_ += str[i++];
                automaticTypingRef.current.innerHTML = str_
            } else {
                clearInterval(timer)
                automaticTypingRef.current.innerHTML = str_
            }
        }, 20)
    }
    return (
        <>
            <div className={styles.customization}>
                <div className={styles.script} ref={automaticTypingRef} onClick={()=>automaticTyping('Platform Love')}></div>
                <div className={styles.sticker}></div>
            </div>
        </>
    );
}
