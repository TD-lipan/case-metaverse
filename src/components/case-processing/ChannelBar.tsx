import React, { useCallback, useState } from 'react';
import styles from './index.less';
import channelDropdown from './images/channel_dropdown.png';
import channelEmailToolbar from './images/channel_email_toolbar.png';
import channelLivechatToolbar from './images/channel_livechat_toolbar.png';

export default function () {
  const [imgSrc, setImgSrc] = useState<string>(channelLivechatToolbar);
  const [showChannelDropdown, setShowChannelDropdown] =
    useState<boolean>(false);
  const hanldeChangeChannel = () => {
    setShowChannelDropdown(!showChannelDropdown);
  };

  const hanldeChange = (src: string) => {
    setImgSrc(src);
    setShowChannelDropdown(false);
  };

  return (
    <>
      <div className={styles.channelBar}>
        <div className={styles.clickArea} onClick={hanldeChangeChannel}></div>
        <img src={imgSrc} />
      </div>
      <div
        className={styles.channelDropdown}
        style={{ display: showChannelDropdown ? 'block' : 'none' }}
      >
        <img src={channelDropdown} />
        <div className={styles.list}>
          <div className={styles.item}></div>
          <div
            className={styles.item}
            onClick={() => hanldeChange(channelLivechatToolbar)}
          ></div>
          <div
            className={styles.item}
            onClick={() => hanldeChange(channelEmailToolbar)}
          ></div>
        </div>
      </div>
    </>
  );
}
