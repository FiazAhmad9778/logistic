import { appApi } from './../index';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  VerifyTokenRequest,
} from './auth-types';
import { GenericResponseType } from '../../../../types/common/http-types';

const authApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      // LOGIN
      login: build.mutation<GenericResponseType<LoginResponse>, LoginRequest>({
        query: (payload) => ({
          url: '/auth/login',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),
      // REFRESH TOKEN
      refreshToken: build.mutation<GenericResponseType<LoginResponse>, null>({
        query: () => ({
          url: '/auth/refresh-token',
          method: 'POST',
        }),
      }),
      // FORGOT PASSWORD
      forgotPassword: build.mutation<GenericResponseType<unknown>, ForgotPasswordRequest>({
        query: (payload) => ({
          url: '/auth/forgot-password',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),

      // Verify
      verifyToken: build.mutation<GenericResponseType<unknown>, VerifyTokenRequest>({
        query: (payload) => ({
          url: '/auth/verify',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),

      // RESET PASSWORD
      resetPassword: build.mutation<GenericResponseType<unknown>, ResetPasswordRequest>({
        query: (payload) => ({
          url: '/auth/reset-password',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),
      // CHANGE PASSWORD
      changePassword: build.mutation<GenericResponseType<unknown>, ChangePasswordRequest>({
        query: (payload) => ({
          url: '/auth/change-password',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),
      // LOGOUT
      logout: build.mutation<GenericResponseType<boolean>, null>({
        query: () => ({
          url: '/auth/log-out',
          method: 'POST',
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Auth'],
  });

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useVerifyTokenMutation,
} = authApi;
