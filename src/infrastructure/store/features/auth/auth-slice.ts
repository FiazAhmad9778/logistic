import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '../../api/auth/auth-types';

const initialState: LoginResponse = {
  accessToken: '',
  refreshToken: '',
  email: '',
  name: '',
  userId: 0,
  claims: [],
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
        state.claims = action.payload.claims;
      }
    },
    clearAuth: (state) => {
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.email = initialState.email;
      state.name = initialState.name;
      state.userId = initialState.userId;
      state.claims = initialState.claims;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
