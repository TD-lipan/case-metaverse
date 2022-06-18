import React, { useCallback, useState } from 'react';
import styles from './index.less';
import ChannelBar from './ChannelBar';
import ChartArea from './ChartArea';
import useDrag from './use-drag';

import orderDetailsDrag from './images/order_details_drag.png';

export default function () {
    const { noDarg, draging, dragX, dragY, targetAreaHover, onEndMouseOver, onEndMouseLeave, isDraged, setIsDraged, onStartDarg } = useDrag();
    const [showEmail, setShowEmail] = useState<boolean>(false);

    const hanldeClick = () => {
        setShowEmail(true);
        setIsDraged(false);
    }

    return (
        <>
            <div className={styles.workspace} />
            <ChartArea onStartDarg={onStartDarg} showEamil={showEmail} />
            {/* <img className={styles.callDarg} src={callDrag} onDragStart={noDarg} style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }} /> */}
            <img className={styles.orderDetailsDrag} src={orderDetailsDrag} onDragStart={noDarg} style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }} />
            <div className={`${styles.targetArea} ${targetAreaHover}`} onMouseOver={onEndMouseOver} onMouseLeave={onEndMouseLeave}></div>

            {isDraged && <div className={styles.orderPaidInput} onClick={() => setIsDraged(false)} ></div>}

            <ChannelBar />

            <div className={styles.typeSomething}>Type something...</div>
            <div className={styles.toolbar} />
            <div className={styles.customerToolbar} />
            <div className={styles.customization} />
            <div className={styles.sendButton} onClick={hanldeClick}></div>
        </>
    );
}
