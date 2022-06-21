import { Scene } from '@/pages/use-scene';
import React from 'react';
import CreateCase from '../create-case';
import FilterBar from '../filter-bar';
import InputBox from '../input-box';
import styles from './index.less';
import RolesWidget from '@/components/roles';
import { Action } from '../automatic-typing';

const actions: Action[] = [
    { type: 'typing', key: 0, word: 'Could you see the VR model I sent you?' },
    { type: 'outbound', key: 1 },
    { type: 'typing', key: 2, word: "You could choose any font, color, and content you like and engrave it on the product. I will recommend you choose the center of the box. What do you want to write for your niece?" },
    { type: 'outbound', key: 3 },
    { type: 'inbound', key: 4 },
    { type: 'inbound', key: 5 },
    { type: 'typing', key: 0, word: 'Could you see the VR model I sent you?' },
    { type: 'outbound', key: 3 },
];

export default function ({ setScene }: { setScene: React.Dispatch<React.SetStateAction<Scene>> }) {
    return (
        <>
            <CreateCase setScene={setScene} />
            <InputBox actions={actions} onInBound={(action: Action) => { console.log(action) }} onOutBound={(action: Action) => { console.log(action) }} />
            <FilterBar type="default" />
            <RolesWidget />
        </>
    );
}
