import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';
import FilterBar from '../components/filter-bar';
import InputBox from '../components/input-box';
import MultiTab from '../components/multi-tab';
import CaseProcessing from '../components/case-processing';
import Login from '@/components/login';
import { useState } from 'react';
import Player from '@/components/player';

export default function IndexPage() {
  const [loginShow, setLoginShow] = useState(false);
  return (
    <div>
      {loginShow ? (
        <Login setState={setLoginShow} />
      ) : (
        <>
          <NavigationBar />
          <FilterBar type="default" />
          <InputBox />
          <MultiTab index={2} />
          <CaseProcessing />
        </>
      )}
      <Background />
    </div>
  );
}
