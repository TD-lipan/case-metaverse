import React from 'react';
import AutomaticTyping, { Action } from '../automatic-typing';
import styles from './index.less';

interface InputBoxProp {
    onOutBound?: (action: Action) => void;
    onInBound?: (action: Action) => void;
    actions: Action[];
}
export default function ({ actions, onInBound, onOutBound }: InputBoxProp) {
    return (
        <div className={styles.inputBox}>
            <AutomaticTyping
                width={1133} height={88} left={20} top={20}
                sendWidth={85} sendHeight={24} sendLeft={1024} sendTop={122}
                onInBound={onInBound}
                onOutBound={onOutBound}
                actions={actions} />
        </div>
    );
}
