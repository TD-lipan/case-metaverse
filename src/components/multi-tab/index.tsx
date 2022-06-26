import React from 'react';
import styles from './index.less';

export default function ({
  showCommonRoles = true,
}: {
  showCommonRoles: boolean;
}) {
  return (
    <div className={showCommonRoles ? styles.multiTab1 : styles.multiTab2}>
      <div></div>
    </div>
  );
}
