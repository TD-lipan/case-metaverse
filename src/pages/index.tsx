import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';
import FilterBar from '../components/filter-bar';
import InputBox from '../components/input-box';
import MultiTab from '../components/multi-tab';
import OnDrag from '../components/on-drag';

export default function IndexPage() {
  return (
    <div>
      <NavigationBar />
      <FilterBar type='default' />
      <InputBox />
      <MultiTab index={2} />
      <OnDrag />
      <Background />
    </div>
  );
}
