import React from 'react';
import FilterBar from '../filter-bar';
import InputBox from '../input-box';
import styles from './index.less';

export default function () {
    return (
        <>
            <InputBox />
            <FilterBar type="default" />
        </>
    );
}
