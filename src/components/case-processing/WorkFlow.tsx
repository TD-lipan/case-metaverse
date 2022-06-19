import React, { useCallback } from 'react';
import styles from './index.less';

import item1_0 from './images/work-flow/item1_0.png';
import item1_1 from './images/work-flow/item1_1.png';
import item2_0 from './images/work-flow/item2_0.png';
import item2_1 from './images/work-flow/item2_1.png';
import item3_0 from './images/work-flow/item3_0.png';
import item3_1 from './images/work-flow/item3_1.png';
import item4_0 from './images/work-flow/item4_0.png';
import item4_1 from './images/work-flow/item4_1.png';
import item5_0 from './images/work-flow/item5_0.png';
import item5_1 from './images/work-flow/item5_1.png';
import ok from './images/work-flow/ok.png';

export default function ({ step = 0 }: { step: number }) {

    return (
        <>
            <div className={styles.workFlow} >
                <div className={styles.row1}>
                    <img src={step == 1 ? item1_1 : step < 1 ? item1_0 : ok} />
                    <img src={step == 2 ? item2_1 : step < 1 ? item2_0 : ok} />
                    <img src={step == 3 ? item3_1 : step < 1 ? item3_0 : ok} />
                    <img src={step == 4 ? item4_1 : step < 1 ? item4_0 : ok} />
                    <img src={step == 5 ? item5_1 : step < 1 ? item5_0 : ok} />
                </div>
                <div className={styles.row2}>
                    <span>Comunicating</span>
                    <span>Paid</span>
                    <span>Making</span>
                    <span>Delivering</span>
                    <span>Finished</span>
                </div>
                <div className={styles.line}></div>
            </div>
        </>
    );
}
