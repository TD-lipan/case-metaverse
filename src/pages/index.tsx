import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';
import FilterBar from '../components/filter-bar';
import InputBox from '../components/input-box';
import MultiTab from '../components/multi-tab';
import CaseProcessing from '../components/case-processing';
import Login from '@/components/login';
import { useEffect, useState } from 'react';
import useScene, { Scene } from './use-scene';
import Player from '@/components/player';
import MainUi from '@/components/main-ui';
import BaseRole from '@/components/roles';
import TwoDaysLater from '@/components/two-days-later';

export default function IndexPage() {
  const { scene, setScene } = useScene();

  return (
    <div>
      {scene === Scene.Login && <Login setScene={setScene} />}

      {scene === Scene.Main && <MainUi />}
      {scene === Scene.Main && <BaseRole />}
      {scene === Scene.CaseProcessing && <CaseProcessing />}
      {scene === Scene.TwoDaysLater && <TwoDaysLater />}

      {scene !== Scene.Login && (
        <>
          <NavigationBar />
          <MultiTab index={2} />
        </>
      )}
      <Background />
    </div>
  );
}
