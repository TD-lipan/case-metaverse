import _uniqueId from 'lodash/uniqueId';
import _assign from 'lodash/assign';
import _subtract from 'lodash/subtract';
import _add from 'lodash/add';
import _divide from 'lodash/divide';
import React from 'react';
import * as PIXI from 'pixi.js';

function pxToNumber(value: number | string) {
  return typeof value === 'string'
    ? parseFloat(value.replace('px', ''))
    : value;
}

export function calculatePositionBySizeAndCenterPoint(
  width: number | string,
  height: number | string,
  centerPoint: PIXI.IPointData,
) {
  const w = pxToNumber(width);
  const h = pxToNumber(height);

  return {
    x: _subtract(centerPoint.x, _divide(w, 2)),
    y: _subtract(centerPoint.y, h),
  };
}

interface MessageStyle extends React.CSSProperties {
  width?: number;
  height?: number;
}

interface OtherProps {
  showAnimationName?: string;
  hideAnimationName?: string;
}

export default class Message {
  private imgId = '';
  private imgElem: HTMLImageElement | null = null;
  private rootElem: HTMLDivElement | null = null;
  private containerElem: HTMLDivElement | null = null;
  private otherProps: OtherProps | undefined = undefined;

  constructor(src: string, style?: MessageStyle, otherProps?: OtherProps) {
    this.otherProps = otherProps;

    setTimeout(() => {
      this.rootElem = document.querySelector('.popup-container-wrapper');
      this.containerElem = document.querySelector('.popup-container');

      if (!this.containerElem && !this.rootElem) {
        this.rootElem = document.createElement('div');
        this.rootElem.className = 'popup-container-wrapper';
        this.rootElem.style.position = 'absolute';
        this.rootElem.style.top = '0';
        this.rootElem.style.left = '0';
        this.rootElem.style.width = '1920px';
        this.rootElem.style.height = '1080px';
        this.rootElem.style.pointerEvents = 'none';
        // @ts-ignore
        this.rootElem.style.zoom = 0.87;
        this.rootElem.style.zIndex = '1';

        this.containerElem = document.createElement('div');
        this.containerElem.className = 'popup-container';
        this.containerElem.style.position = 'relative';
        this.containerElem.style.width = '100%';
        this.containerElem.style.height = '100%';
        this.rootElem.appendChild(this.containerElem);

        document.querySelector('#root > div')?.appendChild(this.rootElem);
      }

      setTimeout(() => {
        if (this.containerElem && !this.imgId) {
          this.imgId = 'img-' + _uniqueId();
          this.imgElem = document.createElement('img');
          this.imgElem.className = this.imgId;
          this.imgElem.src = src;
          this.imgElem.style.position = 'absolute';
          this.imgElem.style.display = 'none';
          this.imgElem.style.objectFit = 'cover';
          _assign(this.imgElem.style, {
            ...style,
            width: style?.width ? style.width + 'px' : 'auto',
            height: style?.height ? style.height + 'px' : 'auto',
          });
          this.containerElem.appendChild(this.imgElem);
        }
      });
    });
  }

  public showByCenterPosition(
    roleCenterPosition: PIXI.IPointData,
    delay: number = 0,
    offset: PIXI.IPointData = { x: 0, y: 0 },
  ) {
    if (this.imgElem) {
      const box = calculatePositionBySizeAndCenterPoint(
        this.imgElem.style.width,
        this.imgElem.style.height,
        roleCenterPosition,
      );

      this.show(_add(box.x, offset.x), _add(box.y, offset.y), delay);
    }
  }

  public show(x: number, y: number, delay: number = 0) {
    if (this.imgElem) {
      this.imgElem.style.left = x + 'px';
      this.imgElem.style.top = y + 'px';
      this.imgElem.style.display = 'block';
      this.imgElem.className = this.otherProps?.showAnimationName
        ? this.otherProps?.showAnimationName
        : 'animate__bounceIn';
    }

    if (delay) setTimeout(() => this.hide(), delay);
  }

  public getImgInstance(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      let cnt = 0;
      const timer = setInterval(() => {
        if (this.imgElem) {
          clearInterval(timer);
          resolve(this.imgElem);
        }

        if (cnt >= 20) reject(null);
        else cnt++;
      }, 200);
    });
  }

  public changeSource(src: string) {
    this.imgElem?.addEventListener('mouseover', () => {
      console.log(111);
    });

    if (this.imgElem) {
      this.imgElem.src = src;
    }
  }

  public hide() {
    if (this.imgElem) {
      this.imgElem.className = this.otherProps?.hideAnimationName
        ? this.otherProps?.hideAnimationName
        : 'animate__bounceOut';
    }
    setTimeout(() => {
      this.imgElem?.remove();
    }, 600);
  }
}
