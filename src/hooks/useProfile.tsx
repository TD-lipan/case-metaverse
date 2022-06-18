import { useState } from 'react';
import styles from '@/hooks/index.less';
import { motion } from 'framer-motion';
import p1 from '../assets/profile1.png';
import p2 from '../assets/profile2.png';
import p3 from '../assets/profile3.png';
import p4 from '../assets/profile4.png';

export const useProfile = () => {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(p1);

  const variantsForMsg = {
    open: { x: [20, 0], opacity: [0, 1], duration: 0.5 },
    closed: { x: [0, -20], opacity: [1, 0], duration: 0.5 },
  };

  const showProfile = () => {
    setShow(true);
  };
  const hideProfile = () => {
    setShow(false);
  };

  const profile = () => {
    return (
      <>
        <div style={{ position: 'absolute', left: '313px', marginTop: '18px' }}>
          <button onClick={hideProfile} className={styles.closeBtn}>
            X
          </button>
        </div>
        <div className={styles.buttonList}>
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'space-between',
              width: 200,
            }}
          >
            <button
              onClick={() => {
                setImg(p1);
              }}
              className={styles.switchBtn}
            >
              1
            </button>
            <button
              onClick={() => {
                setImg(p2);
              }}
              className={styles.switchBtn}
            >
              2
            </button>
            <button
              onClick={() => {
                setImg(p3);
              }}
              className={styles.switchBtn}
            >
              3
            </button>
            <button
              onClick={() => {
                setImg(p4);
              }}
              className={styles.switchBtn}
            >
              4
            </button>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={show ? 'open' : 'closed'}
          variants={variantsForMsg}
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img src={img} alt="" style={{ width: '365px' }} />
        </motion.div>
      </>
    );
  };

  return {
    showProfile,
    hideProfile,
    profile,
  };
};
