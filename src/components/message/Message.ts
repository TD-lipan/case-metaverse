import _uniqueId from 'lodash/uniqueId';
import _assign from 'lodash/assign';
import _subtract from 'lodash/subtract';
import _add from 'lodash/add';
import _divide from 'lodash/divide';
import React from 'react';
import * as PIXI from 'pixi.js';

export function calculatePositionBySizeAndCenterPoint(
  width: number,
  height: number,
  centerPoint: PIXI.IPointData,
) {
  return {
    x: _subtract(centerPoint.x, _divide(width, 2)),
    y: _subtract(centerPoint.y, height),
  };
}

export default class Message {
  private imgId = '';
  private imgElem: HTMLImageElement | null = null;
  private rootElem: HTMLDivElement | null = null;
  private containerElem: HTMLDivElement | null = null;

  constructor(src: string, style?: React.CSSProperties) {
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
          _assign(this.imgElem.style, style);
          this.containerElem.appendChild(this.imgElem);
        }
      });
    });
  }

  public show(x: number, y: number, delay?: number) {
    if (this.imgElem) {
      this.imgElem.style.left = x + 'px';
      this.imgElem.style.top = y + 'px';
      this.imgElem.style.display = 'block';
      this.imgElem.className = 'animate__bounceIn';
    }

    if (delay != null) setTimeout(() => this.hide(), delay);
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

  public hide() {
    if (this.imgElem) {
      this.imgElem.className = 'animate__bounceOut';
    }
    setTimeout(() => {
      this.imgElem?.remove();
    }, 600);
  }
}
