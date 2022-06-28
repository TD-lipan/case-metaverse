import React, { useCallback, useMemo, useState, useEffect } from 'react';
import styles from './index.less';
import CustomerizationGif from './CustomerizationGif';
import Customerization from './Customerization';
import Workspace from './workspace';

export default function () {
  const [left, setLeft] = useState<number>(-880);
  const [right, setRight] = useState<number>(-700);

  useEffect(() => {
    setLeft(0);
    setRight(0);
  }, []);

  return (
    <>
      <div className={styles.mask}></div>
      <Workspace marginLeft={left} />
      <div className={styles.toolbar} />
      <div className={styles.customerToolbar} />
      <CustomerizationGif />
      <Customerization marginRight={right} />
    </>
  );
}
