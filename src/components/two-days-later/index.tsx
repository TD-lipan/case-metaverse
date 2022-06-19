import React, { useEffect } from 'react';
import FilterBar from '../filter-bar';
import CustomerProfile from '../customer-profile';
import callDrag from './images/call_drag.png'
import Call from '../call';
import useDrag from './use-drag';
import styles from './index.less'


export default function () {
    const { noDarg, draging, dragX, dragY, targetAreaHover, onEndMouseOver, onEndMouseLeave, isDraged, setIsDraged, onStartDarg } = useDrag();

    return (
        <>
            <CustomerProfile isDraged={isDraged} />
            <Call onStartDarg={onStartDarg} />

            <img className={styles.callDrag} src={callDrag} onDragStart={noDarg} style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }} />
            <div className={`${styles.targetArea} ${targetAreaHover}`} onMouseOver={onEndMouseOver} onMouseLeave={onEndMouseLeave}></div>

            <FilterBar type="default" />
        </>
    );
}
