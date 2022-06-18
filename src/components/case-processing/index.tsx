import React, { useCallback } from 'react';
import styles from './index.less';
import fromPng from './images/form.png';
import callDrag from './images/call_drag.png';
import channelDropdown from './images/channel_dropdown.png';
import channelEmailToolbar from './images/channel_email_toolbar.png';
import channelLivechatToolbar from './images/channel_livechat_toolbar.png';
import orderDetailsDrag from './images/order_details_drag.png';
import { useState } from 'react';
import { useEffect } from 'react';
import ChannelBar from './ChannelBar';

export default function () {
    const [draging, setDraging] = useState<boolean>(false);
    const [dragX, setDragX] = useState<number>(0);

    const [dragY, setDragY] = useState<number>(0);
    const noDarg = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        document.body.addEventListener('mousemove', handleMouseMove, false);
        document.body.addEventListener('mouseup', handleMouseUp, false);
        document.body.style.cursor = 'grab';
        setDragX(e.clientX);
        setDragY(e.clientY + document.documentElement.scrollTop);

        setDraging(true);
    };

    const handleMouseUp = useCallback((e: MouseEvent) => {
        document.body.removeEventListener('mousemove', handleMouseMove, false);
        setDraging(false);
        document.body.style.cursor = '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hanldeDragOver = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();
        console.log(e);
        setDragX(e.clientX);
        setDragY(e.clientY);
    }
    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (event.buttons === 0) {
            document.body.removeEventListener('mousemove', handleMouseMove, false);
            document.body.style.cursor = '';
            return;
        }
        //document.getSelection()?.removeAllRanges();
        setDragX(event.clientX);
        setDragY(event.clientY + document.documentElement.scrollTop);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.body.addEventListener('mouseup', handleMouseUp, false);
        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove, false);
            document.body.removeEventListener('mouseup', handleMouseUp, false);
            document.body.style.cursor = '';
        };
    }, [])

    return (
        <>
            <div className={styles.workspace} />
            <img className={styles.from} src={fromPng} onMouseDown={handleMouseDown} onDragStart={noDarg} onDragOver={hanldeDragOver} />
            <img className={styles.callDarg} src={callDrag} onDragStart={noDarg} style={{ display: draging ? 'block' : 'none', left: dragX, top: dragY }} />
            <div className={styles.time} style={{ top: '376px' }}>11:20AM</div>
            <div className={styles.time} style={{ top: '500px' }}>11:28AM</div>
            <div className={styles.infoMessage} />

           <ChannelBar />

            <div className={styles.toolbar} />
            <div className={styles.customerToolbar} />
            <div className={styles.customization} />
        </>
    );
}
