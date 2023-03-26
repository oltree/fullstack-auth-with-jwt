import { AuthState } from '../slices/authSlice';

type AuthSelector = {
  auth: AuthState;
};

export const authSelector = (state: AuthSelector) => state.auth;
