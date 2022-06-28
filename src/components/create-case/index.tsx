import React, { useState } from 'react';
import styles from './index.less';
import create_case01 from './images/create_case01.png';
import create_case02 from './images/create_case02.png';
import create_case03 from './images/create_case03.png';
import { Scene } from '@/pages/use-scene';
import classNames from 'classnames';

export default function ({
  left = 650,
  top = 244,
  visible = false,
  setScene,
}: {
  left?: number;
  top?: number;
  visible?: boolean;
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
}) {
  const [src, setSrc] = useState<string>(create_case01);
  return (
    <>
      <div
        className={classNames(
          styles.createCase,
          'animate__animated animate__bounceIn',
        )}
        style={{
          top: top + 'px',
          left: left + 'px',
          display: visible ? 'block' : 'none',
        }}
      >
        <div
          className={styles.select}
          onClick={() => {
            src === create_case01 && setSrc(create_case02);
            src === create_case02 && setSrc(create_case01);
          }}
        ></div>
        {src === create_case02 && (
          <div
            className={styles.option}
            onClick={() => {
              setSrc(create_case03);
            }}
          ></div>
        )}
        <img src={src} />
        <div
          className={styles.saveButton}
          onClick={() => {
            setScene(Scene.CaseProcessing);
          }}
        ></div>
      </div>
    </>
  );
}
