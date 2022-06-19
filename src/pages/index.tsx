import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';
import FilterBar from '../components/filter-bar';
import InputBox from '../components/input-box';
import MultiTab from '../components/multi-tab';
import CaseProcessing from '../components/case-processing';
import Login from '@/components/login';
import { useEffect, useState } from 'react';
import Player from '@/components/player';
import useScene, { Scene } from './use-scene';
import MainUi from '@/components/main-ui';


export default function IndexPage() {
  const { scene, setScene } = useScene();

  return (
    <div>

      {scene === Scene.Login && <Login setScene={setScene} />}

      {scene === Scene.Main && <MainUi />}
      {scene === Scene.CaseProcessing && <CaseProcessing />}

      {scene !== Scene.Login &&
        <>
          <NavigationBar />
          <MultiTab index={2} />
        </>}
      <Background />
    </div >
  );
}
