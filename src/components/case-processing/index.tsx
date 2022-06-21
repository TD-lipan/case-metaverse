import React, { useCallback, useMemo, useState, useEffect } from 'react';
import styles from './index.less';
import CustomerizationGif from './CustomerizationGif';
import Customerization from './Customerization';
import Workspace from './workspace';

export default function () {
    return (
        <>
            <Workspace />
            <div className={styles.toolbar} />
            <div className={styles.customerToolbar} />
            <CustomerizationGif />
            <Customerization />
        </>
    );
}
