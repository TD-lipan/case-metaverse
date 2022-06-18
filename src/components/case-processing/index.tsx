import React, { useCallback } from 'react';
import styles from './index.less';
import ChannelBar from './ChannelBar';
import OrderPaid from './OrderPaid';

export default function () {
    return (
        <>
            <div className={styles.workspace} />
            <OrderPaid />
            <div className={styles.time} style={{ top: '376px' }}>11:20AM</div>
            <div className={styles.time} style={{ top: '500px' }}>11:28AM</div>
            {false && <div className={styles.infoMessage} />}
            <div className={styles.airpods} />

            <ChannelBar />

            <div className={styles.toolbar} />
            <div className={styles.customerToolbar} />
            <div className={styles.customization} />
        </>
    );
}
