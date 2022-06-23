import React, { useCallback, useState } from 'react';
import styles from './index.less';
import customerization from './images/customerization.gif';

export default function () {
  return (
    <>
      <div className={styles.customerizationGif}>
        <img src={customerization} />
      </div>
    </>
  );
}
