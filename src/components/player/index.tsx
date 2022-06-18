import player1 from './images/player1.png';
import { useImgPopUp } from '@/hooks/useImgPopUp';
import { useProfile } from '@/hooks/useProfile';
import { motion } from 'framer-motion';
import styles from './index.less';
import img from '../../assets/random1.png';
import profileBar from './images/profileBar.png';
import { useEffect, useState } from 'react';

export default function Player() {
  const { showProfile, profile } = useProfile();

  const [showBar, setShowBar] = useState(true);

  return (
    <>
      <div className={styles.player}>
        {profile()}
        <motion.div
          onHoverStart={() => {
            setShowBar(false);
          }}
          onHoverEnd={() => {
            setShowBar(true);
          }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '140px',
          }}
        >
          <img src={player1} style={{ width: '88px', height: '133px' }} />
          <motion.div hidden={showBar}>
            <div className={styles.profileBar}>
              <button
                style={{ width: '34px', height: '34px', opacity: 0 }}
                onClick={() => {
                  showProfile();
                }}
              >
                p
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
