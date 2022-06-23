import React, { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './index.less';

interface AutomaticTypingProp {
  width: number;
  height: number;
  top: number;
  left: number;

  sendWidth: number;
  sendHeight: number;
  sendTop: number;
  sendLeft: number;

  onOutBound?: (action: Action) => void;
  onInBound?: (action: Action) => void;
  actions: Action[];
}

export interface Action {
  type: 'inbound' | 'outbound' | 'typing';
  key: string | number;
  word?: string;
  src?: string;
}

export default function ({
  width,
  height,
  top,
  left,
  sendWidth,
  sendHeight,
  sendTop,
  sendLeft,
  onInBound,
  onOutBound,
  actions,
}: AutomaticTypingProp) {
  const automaticTypingRef = useRef<HTMLElement>(null);
  const [actionIndex, setActionIndex] = useState<number>(0);
  const [word, setWord] = useState<string>('');
  const timerRef = useRef<any>(null);

  const action = useMemo(() => actions[actionIndex], [actions, actionIndex]);

  const handleKeyPress = (e: any) => {
    const { key, keyCode } = e;
    if (keyCode !== 13) return;
    if (!action) return;

    if (action.type === 'typing' && action.word) {
      setWord(action.word);
      setActionIndex((prev) => prev + 1);
    }
    if (action.type === 'inbound') {
      onInBound?.(action);
      setActionIndex((prev) => prev + 1);
    }
  };

  const hanldeSend = () => {
    if (!action) return;
    if (action.type !== 'outbound') return;
    onOutBound?.(action);
    setWord('');
    setActionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress, false);
    return () => {
      window.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [handleKeyPress]);

  const automaticTyping = (str: string) => {
    let tempText = '';
    let i = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!automaticTypingRef.current) return;
      if (tempText.length < str.length) {
        tempText += str[i++];
        automaticTypingRef.current.innerHTML = tempText;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        automaticTypingRef.current.innerHTML = tempText;
      }
    }, 20);
  };

  useEffect(() => {
    if (!automaticTypingRef.current) return;
    if (!word) {
      automaticTypingRef.current.innerHTML = '';
    } else {
      automaticTyping(word);
    }
  }, [word]);

  return (
    <>
      {word && (
        <div
          className={styles.automaticTyping}
          style={{
            width: width,
            height: height,
            top: top,
            left: left,
            pointerEvents: 'none',
          }}
        >
          <span className="automatic_typing" ref={automaticTypingRef}></span>
        </div>
      )}
      {!word && (
        <span
          style={{
            width: width,
            height: height,
            top: top,
            left: left,
            pointerEvents: 'none',
          }}
          className={styles.typeSomething}
        >
          Type something...
        </span>
      )}
      <div
        className={styles.sendButton}
        style={{
          width: sendWidth,
          height: sendHeight,
          top: sendTop,
          left: sendLeft,
        }}
        onClick={hanldeSend}
      ></div>
    </>
  );
}
