import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';
import FilterBar from '../components/filter-bar';
import InputBox from '../components/input-box';
import MultiTab from '../components/multi-tab';
import CaseProcessing from '../components/case-processing';
import Login from '@/components/login';
import { useCallback, useEffect, useState } from 'react';
import useScene, { Scene } from './use-scene';
import Player from '@/components/player';
import MainUi from '@/components/main-ui';
import TwoDaysLater from '@/components/two-days-later';

export default function IndexPage() {
  const { scene, setScene } = useScene(Scene.Main);
  const [showCommonRoles, setShowCommonRoles] = useState(true);

  const handleToggleCommonRole = useCallback((flag: boolean) => {
    setShowCommonRoles(flag);
  }, []);

  useEffect(() => {
    setShowCommonRoles(true);
  }, [scene]);

  return (
    <div>
      {scene === Scene.Login && <Login setScene={setScene} />}

      {scene === Scene.Main && (
        <MainUi
          setScene={setScene}
          onToggleCommonRole={handleToggleCommonRole}
        />
      )}
      {scene === Scene.CaseProcessing && <CaseProcessing />}
      {scene === Scene.TwoDaysLater && (
        <TwoDaysLater onToggleCommonRole={handleToggleCommonRole} />
      )}

      {scene !== Scene.Login && (
        <>
          <NavigationBar />
          <MultiTab showCommonRoles={showCommonRoles} />
        </>
      )}
      <Background />
    </div>
  );
}
