import React, { useState } from 'react';
import styles from './index.less';
import call_on_going from './images/call_on_going.png';
import call_wrap_up from './images/call_wrap_up.png';
import classNames from 'classnames';

export default function ({
  left = 182,
  top = 244,
  visible = true,
  onStartDarg,
}: {
  left?: number;
  top?: number;
  visible?: boolean;
  onStartDarg: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) {
  const [src, setSrc] = useState<string>(call_on_going);

  return (
    <div
      className={classNames(styles.call, 'animate__animated animate__bounceIn')}
      style={{
        top: top + 'px',
        left: left + 'px',
        display: visible ? 'block' : 'none',
      }}
    >
      <img
        src={src}
        onMouseDown={onStartDarg}
        onDragStart={(e) => e.preventDefault()}
      />
      {src === call_on_going && (
        <div
          className={styles.endCallButton}
          onClick={() => {
            setSrc(call_wrap_up);
          }}
        ></div>
      )}
    </div>
  );
}
