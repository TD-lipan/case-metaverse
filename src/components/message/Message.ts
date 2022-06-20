import { uniqueId } from 'lodash';

export default class Message {
  private imgId = '';
  private imgElem: HTMLImageElement | null = null;
  private rootElem: HTMLDivElement | null = null;
  private containerElem: HTMLDivElement | null = null;

  constructor(src: string) {
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
        this.rootElem.style.zIndex = '3';
        this.rootElem.style.pointerEvents = 'none';

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
          this.imgId = 'img-' + uniqueId();
          this.imgElem = document.createElement('img');
          this.imgElem.className = this.imgId;
          this.imgElem.src = src;
          this.imgElem.style.position = 'absolute';
          // this.imgElem.style.left = x + 'px';
          // this.imgElem.style.top = y + 'px';
          this.imgElem.style.display = 'none';
          this.containerElem.appendChild(this.imgElem);
        }
      });
    });
  }

  public show(x: number, y: number) {
    if (this.imgElem) {
      this.imgElem.style.left = x + 'px';
      this.imgElem.style.top = y + 'px';
      this.imgElem.style.display = 'block';
      this.imgElem.className = 'animate__bounceIn';
    }
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
