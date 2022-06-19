import React from 'react';
import FilterBar from '../filter-bar';
import InputBox from '../input-box';
import styles from './index.less';
import { useImgPopUp } from '../../hooks/useImgPopUp'
import Player from '../player'
import callIcon from './images/call_icon.png'

import carly01 from './images/carly01.png'
import carly02 from './images/carly02.png'
import carly03 from './images/carly03.png'

type LittlePersonName = 'carly' | '';
export interface LittlePerson {
    x: number;
    y: number;
    name: LittlePersonName
}

export default function () {

    const getImg = (name: LittlePersonName, index: number) => {

    }

    return (
        <>
            <div>
                <div><img src={ } /></div>
            </div>
        </>
    );
}
