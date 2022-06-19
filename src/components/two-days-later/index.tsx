import React from 'react';
import FilterBar from '../filter-bar';
import InputBox from '../input-box';
import styles from './index.less';
import { useImgPopUp } from '../../hooks/useImgPopUp'
import Player from '../player'
import callIcon from './images/call_icon.png'

export default function () {
    const { showMessageBox,
        hideMessageBox,
        messageBox,
        caseBox,
        bubbleBox,
        showBubble, } = useImgPopUp();

    return (
        <>
            <FilterBar type="default" />
            <button onClick={() => { showMessageBox() }} style={{position:'absolute',zIndex:500}}>test</button>
            {messageBox(callIcon)}
            <Player/>
        </>
    );
}
