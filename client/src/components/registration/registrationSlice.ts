import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../models/IUser';

import AuthService from '../../services/AuthService';

type RegistrationError = {
  message: string;
  errors: any;
};

export interface RegistrationState {
  data: IUser | null;
  error: RegistrationError | null;
}

interface RegistrationResponse {
  accessToken: string;
  user: IUser;
}

type RegistrationPayload = {
  email: string;
  password: string;
};

const initialState: RegistrationState = {
  data: null,
  error: null,
};

export const registration = createAsyncThunk<
  RegistrationResponse,
  RegistrationPayload,
  { rejectValue: RegistrationError }
>(
  'auth/registration',
  async ({ email, password }: RegistrationPayload, { rejectWithValue }) => {
    try {
      const response = await AuthService.registration(email, password);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, { payload }) => {
      const { accessToken, user } = payload;
      state.data = user;

      localStorage.setItem('token', accessToken);
    });
    builder.addCase(registration.rejected, (state, { payload }) => {
      state.error = payload ? payload : null;
    });
  },
});

export default registrationSlice.reducer;
