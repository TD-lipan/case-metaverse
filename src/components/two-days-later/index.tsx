import { useRef, useState, useLayoutEffect } from 'react';

import FilterBar from '../filter-bar';
import CustomerProfile from '../customer-profile';
import Call from '../call';
import useDrag from '@/hooks/use-drag';
import RolesWidget from '../roles';
import CarlyYatesRole from '../roles/CarlyYatesRole';
import TeresaJuarezRole from '../roles/TeresaJuarezRole';
import Message, {
  calculatePositionBySizeAndCenterPoint,
} from '@/components/message/Message';

import styles from './index.less';

import callDrag from './images/call_drag.png';
import callImg from '@/assets/Call- icon@2x.png';
import notificationImg from '@/assets/Notification.png';
import { useCallback } from 'react';

export default function ({ showCommonRoles }: { showCommonRoles: boolean }) {
  const {
    noDarg,
    draging,
    dragX,
    dragY,
    targetAreaHover,
    onEndMouseOver,
    onEndMouseLeave,
    isDraged,
    setIsDraged,
    onStartDarg,
  } = useDrag();
  const carlyYates = useRef<CarlyYatesRole | null>(null);
  const teresaJuarez = useRef<TeresaJuarezRole | null>(null);
  const toggleCommonRole = useRef(() => {});
  const [callVisible, setCallVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleClick = useCallback(() => {
    setCallVisible(false);
    setProfileVisible(false);
    setTimeout(() => {
      setNotificationVisible(true);
    }, 500);
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      const cy = carlyYates.current;
      const tj = teresaJuarez.current;

      if (!cy || !tj) return;

      const callBoxW = 120;
      const callBoxH = 120;
      const callBox = new Message(callImg, {
        width: callBoxW + 'px',
        height: callBoxH + 'px',
        cursor: 'pointer',
        animationDuration: '1.2s',
      });

      const callBoxP = calculatePositionBySizeAndCenterPoint(
        callBoxW,
        callBoxH,
        cy.getCenterPoint(),
      );

      setTimeout(() => {
        callBox.show(callBoxP.x + 5, callBoxP.y);
        callBox.getImgInstance().then((elem) => {
          elem.className = 'animate__animated animate__tada animate__infinite';
          elem.addEventListener('click', () => {
            callBox.hide();
            setCallVisible(true);
            setTimeout(() => setProfileVisible(true), 1000);
          });
        });
      }, 500);
    }, 500);
  }, []);

  return (
    <>
      <RolesWidget
        carlyYatesProps={{ position: { x: 580, y: 510 } }}
        teresaJuarezProps={{ position: { x: 850, y: 509 } }}
        onInit={(cy, tj, fn) => {
          carlyYates.current = cy;
          teresaJuarez.current = tj;
          toggleCommonRole.current = fn;
        }}
      />
      <Call visible={callVisible} onStartDarg={onStartDarg} />
      <CustomerProfile
        visible={profileVisible}
        isDraged={isDraged}
        isEmpty={false}
        onClick={handleClick}
      />
      {notificationVisible && (
        <img className={styles.notification} src={notificationImg} />
      )}
      <img
        className={styles.callDrag}
        src={callDrag}
        onDragStart={noDarg}
        style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }}
      />
      <div
        className={`${styles.targetArea} ${targetAreaHover}`}
        onMouseOver={onEndMouseOver}
        onMouseLeave={onEndMouseLeave}
      ></div>
      <FilterBar
        type={showCommonRoles ? 'default' : 'selected'}
        onClick={() => {
          toggleCommonRole.current();
        }}
      />
    </>
  );
}
