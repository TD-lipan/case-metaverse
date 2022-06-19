import React, { useState } from 'react';
import styles from './index.less';
import call_on_going from './images/call_on_going.png';
import call_wrap_up from './images/call_wrap_up.png';


export default function ({ onStartDarg }: { onStartDarg: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void }) {
    const [src, setSrc] = useState<string>(call_on_going);
    return (
        <div className={styles.call}>
            <img src={src}  onMouseDown={onStartDarg} onDragStart={(e) => e.preventDefault()} />
            {src === call_on_going && <div className={styles.endCallButton} onClick={() => { setSrc(call_wrap_up) }}></div>}
        </div>
    );
}
