import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';
import FilterBar from '../components/filter-bar';
import InputBox from '../components/input-box';

export default function IndexPage() {
  return (
    <div>
      <NavigationBar />
      <FilterBar />
      <InputBox />
      <Background />
    </div>
  );
}
