import React from 'react';
import styles from './index.less';
// @ts-ignore
import scene from './background.mp4';
export default function () {
  return (
    <div className={styles.videoDiv}>
      <video className={styles.video} height="940px" muted autoPlay loop>
        <source src={scene} type="video/mp4" />
      </video>
    </div>
  );
}
