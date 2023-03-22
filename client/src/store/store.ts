import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import registrationReducer from '../components/registration/registrationSlice';
import loginReducer from '../components/login/loginSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
