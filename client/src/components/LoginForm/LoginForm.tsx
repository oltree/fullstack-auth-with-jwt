import { FC, useState, memo, MouseEvent, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { authSelector } from '../../store/selectors/authSelector';
import { registration, login, logout } from '../../store/slices/authSlice';

import styles from './LoginForm.module.css';

const enum Action {
  registration = 'registration',
  login = 'login',
  logout = 'logout',
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(authSelector);
  const disabled = !authData.user;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>, action: string) => {
      e.preventDefault();

      switch (action) {
        case 'registration':
          dispatch(registration({ email, password }));
          break;
        case 'login':
          dispatch(login({ email, password }));
          break;
        case 'logout':
          dispatch(logout());
          break;
        default:
          break;
      }

      setEmail('');
      setPassword('');
    },
    [email, password, dispatch]
  );

  return (
    <div className={styles.registrationWrapper}>
      <input
        value={email}
        type="text"
        placeholder="Email"
        onChange={handleEmailChange}
        className={styles.input}
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        className={styles.input}
      />
      <div className={styles.buttons}>
        <button
          onClick={(e) => handleSubmit(e, Action.registration)}
          className={styles.button}
        >
          Registration
        </button>
        <button
          onClick={(e) => handleSubmit(e, Action.login)}
          className={styles.button}
        >
          Login
        </button>
        <button
          onClick={(e) => handleSubmit(e, Action.logout)}
          disabled={disabled}
          className={styles.button}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default memo(LoginForm);
