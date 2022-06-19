import React from 'react';
import styles from './index.less';
import loginImg from './images/login.png';
import { Scene } from '../../pages/use-scene';

export default function Login({
  setScene,
}: {
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
}) {
  return (
    <div className={styles.background}>
      <button
        className={styles.loginBtn}
        onClick={() => {
          setScene(prev => prev + 1);
        }}
      >
        login
      </button>
      <img src={loginImg} className={styles.imgBox} />
    </div>
  );
}
