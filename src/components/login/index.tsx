import React from 'react';
import styles from './index.less';
import loginImg from './images/login.png';

export default function Login({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.background}>
      <button
        className={styles.loginBtn}
        onClick={() => {
          setState(false);
        }}
      >
        login
      </button>
      <img src={loginImg} className={styles.imgBox} />
    </div>
  );
}
