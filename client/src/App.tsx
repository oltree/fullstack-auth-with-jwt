import { FC, useState, useEffect } from 'react';

import LoginForm from './components/LoginForm/LoginForm';
import UserService from './services/UserService';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { authSelector } from './store/selectors/authSelector';
import { checkAuth } from './store/slices/authSlice';
import { IUser } from './models/IUser';

import styles from './App.module.css';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth, user, error, isRegistered, isLoading } =
    useAppSelector(authSelector);
  const userIsActivatedAccount = isAuth && user?.isActivated;
  const userConfirmEmail = isAuth && user?.isActivated === false;
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  const title = isRegistered ? 'Sing In' : 'Sign Up';

  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <LoginForm />
      {userConfirmEmail && 'Confirm your email to get a list of users!'}
      <div>
        {userIsActivatedAccount && (
          <button onClick={getUsers}>Получить пользователей</button>
        )}
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
      <div>{error?.message}</div>
    </div>
  );
};

export default App;
