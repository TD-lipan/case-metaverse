import styles from './index.less';
import Background from '../components/background';
import NavigationBar from '../components/navigation-bar';

export default function IndexPage() {
  return (
    <div>
      <div className={styles.scene}><NavigationBar /></div>
      <Background />
    </div>
  );
}
