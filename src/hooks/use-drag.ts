import React, { useCallback } from 'react';
import styles from './index.less';
import { useState } from 'react';
import { useEffect } from 'react';

const root = document.getElementById('root');

export default function () {
  const [draging, setDraging] = useState<boolean>(false);
  const [isDraged, setIsDraged] = useState<boolean>(false);
  const [dragX, setDragX] = useState<number>(0);
  const [dragY, setDragY] = useState<number>(0);
  const [targetAreaHover, setTargetAreaHover] = useState<string>('');
  const noDarg = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    document.body.addEventListener('mousemove', handleMouseMove, false);
    document.body.addEventListener('mouseup', handleMouseUp, false);
    document.body.style.cursor = 'grab';
    setDragX(e.clientX - (root?.offsetLeft || 0));
    setDragY(e.clientY + document.documentElement.scrollTop);

    setDraging(true);
  };

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      document.body.removeEventListener('mousemove', handleMouseMove, false);
      if (targetAreaHover) setIsDraged(true);
      setDraging(false);

      setTargetAreaHover('');
      document.body.style.cursor = '';
    },
    [targetAreaHover],
  );

  const handleMouseMove = (event: MouseEvent) => {
    if (event.buttons === 0) {
      document.body.removeEventListener('mousemove', handleMouseMove, false);
      document.body.style.cursor = '';
      return;
    }
    //document.getSelection()?.removeAllRanges();
    setDragX(event.clientX - (root?.offsetLeft || 0));
    setDragY(event.clientY + document.documentElement.scrollTop);
  };

  useEffect(() => {
    document.body.addEventListener('mouseup', handleMouseUp, false);
    return () => {
      document.body.removeEventListener('mouseup', handleMouseUp, false);
    };
  }, [handleMouseUp]);

  const hanldMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.buttons === 0) {
      return;
    }
    setTargetAreaHover(styles.targetAreaHover);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTargetAreaHover('');
  };

  return {
    dragX,
    dragY,
    draging,
    isDraged,
    noDarg,
    onStartDarg: handleMouseDown,
    onEndMouseOver: hanldMouseOver,
    onEndMouseLeave: onMouseLeave,
    targetAreaHover,
    setIsDraged,
  };
}
