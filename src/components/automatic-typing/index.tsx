import { useEffect, useMemo, useState, useRef } from 'react';
import classNames from 'classnames';

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
  width?: number;
  height?: number;
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
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const action = useMemo(() => actions[actionIndex], [actions, actionIndex]);

  const handleKeyPress = (e: any) => {
    const { keyCode } = e;
    if (keyCode !== 13) return;
    if (!action) return;

    if (action.type === 'typing' && action.word) {
      setWord(action.word);
      setActionIndex((prev) => prev + 1);
    } else if (action.type === 'inbound') {
      onInBound?.(action);
      setActionIndex((prev) => prev + 1);
    } else if (action.type === 'outbound' && !isTyping) {
      hanldeSend();
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
    const automaticTypingElem = automaticTypingRef.current;
    if (isTyping || !automaticTypingElem) return;

    setIsTyping(true);

    let tempText = '';
    let i = 0;
    timerRef.current = setInterval(() => {
      if (tempText.length < str.length) {
        tempText += str[i++];
      } else if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsTyping(false);
      }
      automaticTypingElem.innerHTML = tempText;
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
        className={classNames(
          styles.sendButton,
          !isTyping && word && styles.active,
        )}
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
