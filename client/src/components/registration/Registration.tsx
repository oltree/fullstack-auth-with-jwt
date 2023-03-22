import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { registration } from './registrationSlice';

import styles from './Registration.module.css';
import { registrationSelector } from './registrationSelector';

const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(registrationSelector);
  console.log(data);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registration({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.registrationWrapper}
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
        Registration
      </button>
    </form>
  );
};

export default Registration;
