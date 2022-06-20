import { Scene } from '@/pages/use-scene';
import React from 'react';
import CreateCase from '../create-case';
import FilterBar from '../filter-bar';
import InputBox from '../input-box';
import styles from './index.less';
import RolesWidget from '@/components/roles';

export default function ({setScene}:{ setScene: React.Dispatch<React.SetStateAction<Scene>>}) {
    return (
        <>
        <CreateCase setScene={setScene} />
            <InputBox />
            <FilterBar type="default" />
            <RolesWidget />
        </>
    );
}
