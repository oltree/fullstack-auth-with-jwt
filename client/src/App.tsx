import { FC } from 'react';

import styles from './App.module.css';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';

const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Registration />
      <Login />
    </div>
  );
};

export default App;
