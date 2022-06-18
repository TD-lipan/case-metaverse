import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './index.less';
import OrderPaid from './OrderPaid';

export default function ({ str }: { str: string }) {

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

    useEffect(() => {
        if (!automaticTypingRef.current) return;
        if (!str) {
            automaticTypingRef.current.innerHTML = ''
        } else {
            automaticTyping(str);
        }
    }, [str]);

    return (
        <>
            {str && <div className={styles.automaticTyping}>
                <span className='automatic_typing' ref={automaticTypingRef}></span>
            </div>}
        </>
    );
}
