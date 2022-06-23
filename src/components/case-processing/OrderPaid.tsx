import React, { useCallback } from 'react';
import styles from './index.less';
import orderPaidPng from './images/order_paid.png';

export default function ({
  onStartDarg,
}: {
  onStartDarg: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) {
  return (
    <>
      <img
        className={styles.orderPaid}
        src={orderPaidPng}
        onMouseDown={onStartDarg}
        onDragStart={(e) => e.preventDefault()}
      />
    </>
  );
}
