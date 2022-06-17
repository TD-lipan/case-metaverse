import React from 'react';
import styles from './index.less';

export default function ({ index }: { index: number }) {
    return (
        <div className={index === 1 ? styles.multiTab1 : styles.multiTab2}>
            <div></div>
        </div>
    );
}
