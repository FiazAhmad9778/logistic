import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '../../api/auth/auth-types';

type AuthState = LoginResponse & {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  email: '',
  name: '',
  userId: 0,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
      }
    },
    clearAuth: (state) => {
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.email = initialState.email;
      state.name = initialState.name;
      state.userId = initialState.userId;
      state.isAuthenticated = false;
    },

    authenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
  },
});

export const { setAuth, clearAuth, authenticating } = authSlice.actions;
export default authSlice.reducer;
