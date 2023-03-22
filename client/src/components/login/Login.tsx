import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from './loginSlice';

import styles from './Login.module.css';
import { loginSelector } from './loginSelector';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(loginSelector);
  console.log(data);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.loginWrapper}
    >
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
        className={styles.input}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.button}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
