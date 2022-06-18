import { useState } from 'react';
import styles from './index.less';
import { motion } from 'framer-motion';
import b1 from '../assets/bubble1.png';
import b2 from '../assets/bubble2.png';
import b3 from '../assets/bubble3.png';
import b4 from '../assets/bubble4.png';

export const useImgPopUp = () => {
  const [show, setShow] = useState(false);
  const [bubbleImg, setBubbleImg] = useState();
  let timer: any = null;
  let bubbles = [b1, b2, b3];
  let num = 0;

  const variantsForMsg = {
    open: { scale: [0.2, 1.2, 1], duration: 0.5 },
    closed: { scale: 0, duration: 0.5 },
  };

  const variantsForCase = {
    open: { y: [20, 0], opacity: [0, 1], duration: 0.5 },
    closed: { y: [0, -20], opacity: [1, 0], duration: 0.5 },
  };

  const showMessageBox = () => {
    setShow(true);
  };
  const hideMessageBox = () => {
    setShow(false);
  };

  const messageBox = (src: any) => {
    return (
      <div className={styles.container}>
        <motion.div
          initial={false}
          animate={show ? 'open' : 'closed'}
          variants={variantsForMsg}
        >
          <img src={src} alt="" />
        </motion.div>
      </div>
    );
  };

  const caseBox = (src: any) => {
    return (
      <div className={styles.container}>
        <motion.div
          initial={false}
          animate={show ? 'open' : 'closed'}
          variants={variantsForCase}
        >
          <img src={src} alt="" />
        </motion.div>
      </div>
    );
  };

  const showBubble = () => {
    clearInterval(timer);
    timer = setInterval(function () {
      setBubbleImg(bubbles[num]);
      num++;
      if (num === 3) clearInterval(timer);
    }, 300);
  };

  const bubbleBox = () => {
    return (
      <div className={styles.container}>
        {bubbleImg && (
          <motion.div
            onHoverStart={() => {
              setBubbleImg(b4);
            }}
            onHoverEnd={() => {
              setBubbleImg(b3);
            }}
            onClick={() => {
              setBubbleImg(undefined);
            }}
          >
            <img src={bubbleImg} alt="" style={{ width: '148px' }} />
          </motion.div>
        )}
      </div>
    );
  };

  return {
    showMessageBox,
    hideMessageBox,
    messageBox,
    caseBox,
    bubbleBox,
    showBubble,
  };
};
