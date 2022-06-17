import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';
import FilterBar from '../components/filter-bar';
import InputBox from '../components/input-box';
import MultiTab from '../components/multi-tab';

export default function IndexPage() {
  return (
    <div>
      <NavigationBar />
      <FilterBar type='default' />
      <InputBox />
      <MultiTab index={2} />
      <Background />
    </div>
  );
}
