import { LoginState } from './loginSlice';

type LoginSelector = {
  login: LoginState;
};

export const loginSelector = (state: LoginSelector) => state.login;
