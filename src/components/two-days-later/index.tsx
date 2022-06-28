import { useRef, useState, useLayoutEffect, useEffect } from 'react';

import FilterBar from '../filter-bar';
import CustomerProfile from '../customer-profile';
import Call from '../call';
import useDrag from '@/hooks/use-drag';
import RolesWidget from '../roles';
import CarlyYatesRole from '../roles/CarlyYatesRole';
import TeresaJuarezRole from '../roles/TeresaJuarezRole';
import * as PIXI from 'pixi.js';
import Message, {
  calculatePositionBySizeAndCenterPoint,
} from '@/components/message/Message';

import styles from './index.less';

import callDrag from './images/call_drag.png';
import callImg from '@/assets/Call- icon@2x.png';
import Red from '@/assets/images/roles/Red.png';
import Blue from '@/assets/images/roles/Blue.png';
import Green from '@/assets/images/roles/Green.png';
import notificationImg from '@/assets/Notification.png';
import { useCallback } from 'react';

export default function ({
  showCommonRoles = true,
  onToggleCommonRole = (flag: boolean) => {},
}: {
  showCommonRoles?: boolean;
  onToggleCommonRole: (flag: boolean) => void;
}) {
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
  const toggleCommonRole = useRef((visible: boolean) => {});
  const [callVisible, setCallVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleClick = useCallback(() => {
    const cy = carlyYates.current;

    if (!cy) return;

    setCallVisible(false);
    setProfileVisible(false);
    cy.toggleMenu();

    setTimeout(() => {
      popFireworks(cy);
      setNotificationVisible(true);
    }, 5000);
  }, []);

  const popFireworks = useCallback((cy: CarlyYatesRole) => {
    const centerPosition = cy.getCenterPoint();
    cy.jump();

    const blueImg = new Message(
      Blue,
      {
        width: 206,
        height: 146,
        animationDuration: '1s',
      },
      {
        showAnimationName:
          'animate__animated animate__bounceIn animate__infinite',
      },
    );

    setTimeout(() => {
      blueImg.showByCenterPosition(centerPosition, 0, { x: 7, y: 118 });
    }, 300);

    const redImg = new Message(
      Red,
      {
        width: 197,
        height: 130,
        animationDuration: '1s',
      },
      {
        showAnimationName:
          'animate__animated animate__bounceIn animate__infinite',
      },
    );

    setTimeout(() => {
      redImg.showByCenterPosition(centerPosition, 0, { x: -7, y: 120 });
    }, 200);

    const greenImg = new Message(
      Green,
      {
        width: 176,
        height: 96,
        animationDuration: '1s',
      },
      {
        showAnimationName:
          'animate__animated animate__bounceIn animate__infinite',
      },
    );

    setTimeout(() => {
      greenImg.showByCenterPosition(centerPosition, 0, { x: -4, y: 71 });
    }, 100);
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      const cy = carlyYates.current;
      const tj = teresaJuarez.current;

      if (!cy || !tj) return;

      cy.bindForMenu('click', () => {
        setTimeout(() => setProfileVisible((visible) => !visible));
      });

      const cyCenterPosition = cy.getCenterPoint();
      const callBox = new Message(callImg, {
        width: 120,
        height: 120,
        cursor: 'pointer',
        animationDuration: '1.2s',
        pointerEvents: 'auto',
      });

      setTimeout(() => {
        callBox.showByCenterPosition(cyCenterPosition, 0, {
          x: 5,
          y: 0,
        });
        callBox.getImgInstance().then((elem) => {
          elem.className = 'animate__animated animate__tada animate__infinite';
          elem.addEventListener('click', () => {
            callBox.hide();
            setCallVisible(true);
          });
        });
      }, 500);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      const container = document.querySelector('.popup-container');
      container && (container.innerHTML = '');
    };
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
      <Call
        visible={callVisible}
        onStartDarg={(e) => {
          setCallVisible(false);
          onStartDarg(e);
        }}
      />
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
        onClick={(flag) => {
          toggleCommonRole.current(flag);
          onToggleCommonRole(flag);
        }}
      />
    </>
  );
}
