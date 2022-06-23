import { Scene } from '@/pages/use-scene';
import React from 'react';
import CreateCase from '../create-case';
import FilterBar from '../filter-bar';
import RolesWidget from '@/components/roles';
import { Action } from '../automatic-typing';

const actions: Action[] = [
  { type: 'typing', key: 0, word: 'Could you see the VR model I sent you?' },
  { type: 'outbound', key: 1 },
  { type: 'typing', key: 2, word: 'test' },
  { type: 'outbound', key: 3 },
  { type: 'inbound', key: 4 },
  { type: 'inbound', key: 5 },
  { type: 'typing', key: 0, word: 'Could you see the VR model I sent you?' },
  { type: 'outbound', key: 3 },
];

export default function ({
  setScene,
}: {
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
}) {
  return (
    <>
      <CreateCase setScene={setScene} />
      <FilterBar type="default" />
      <RolesWidget />
    </>
  );
}
