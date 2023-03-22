import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../models/IUser';

import AuthService from '../../services/AuthService';

type LoginError = {
  message: string;
  errors: any;
};

export interface LoginState {
  data: IUser | null;
  error: LoginError | null;
}

interface LoginResponse {
  accessToken: string;
  user: IUser;
}

type LoginPayload = {
  email: string;
  password: string;
};

const initialState: LoginState = {
  data: null,
  error: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: LoginError }
>(
  'auth/login',
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.data = user;

      localStorage.setItem('token', accessToken);
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.error = payload ? payload : null;
    });
  },
});

export default loginSlice.reducer;
