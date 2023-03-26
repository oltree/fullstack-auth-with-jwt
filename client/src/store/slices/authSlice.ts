import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import { IUser } from '../../models/IUser';
import { API_URL } from '../../http';

type AuthError = {
  message: string;
  errors: any;
};

type AuthPayload = {
  email: string;
  password: string;
};

export interface AuthState {
  user: IUser | null;
  error: AuthError | null;
  isAuth: boolean;
  isRegistered: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isAuth: false,
  isRegistered: false,
  isLoading: false,
};

export const registration = createAsyncThunk<
  AuthResponse,
  AuthPayload,
  { rejectValue: AuthError }
>(
  'auth/registration',
  async ({ email, password }: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await AuthService.registration(email, password);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

export const login = createAsyncThunk<
  AuthResponse,
  AuthPayload,
  { rejectValue: AuthError }
>(
  'auth/login',
  async ({ email, password }: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: AuthError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      return;
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

export const checkAuth = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: AuthError }
>('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    });

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        const { accessToken } = payload;
        state.isLoading = false;
        state.isRegistered = true;

        localStorage.setItem('token', accessToken);
      })
      .addCase(registration.rejected, (state, { payload }) => {
        state.error = payload ? payload : null;
        state.isLoading = false;
      })

      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { accessToken, user } = payload;
        state.user = user;
        state.isAuth = true;
        state.isLoading = false;

        localStorage.setItem('token', accessToken);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload ? payload : null;
        state.isLoading = false;
      })

      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;

        localStorage.removeItem('token');
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.error = payload ? payload : null;
        state.isLoading = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        const { accessToken, user } = payload;
        state.user = user;
        state.isAuth = true;
        state.isRegistered = true;
        state.isLoading = false;

        localStorage.setItem('token', accessToken);
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.error = payload ? payload : null;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
