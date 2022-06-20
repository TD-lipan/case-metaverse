import React from 'react';
import FilterBar from '../filter-bar';
import InputBox from '../input-box';
import styles from './index.less';
import RolesWidget from '@/components/roles';

export default function () {
  return (
    <>
      <InputBox />
      <FilterBar type="default" />
      <RolesWidget />
    </>
  );
}
