import { appApi } from './../index';
import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
} from './auth-types';
import { GenericResponseType } from '../../../../types/common/http-types';

const authApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      // LOGIN
      login: build.mutation<GenericResponseType<LoginResponse>, LoginPayload>({
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
      forgotPassword: build.mutation<GenericResponseType<unknown>, ForgotPasswordPayload>({
        query: (payload) => ({
          url: '/auth/forgot-password',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),
      // RESET PASSWORD
      resetPassword: build.mutation<GenericResponseType<unknown>, ResetPasswordPayload>({
        query: (payload) => ({
          url: '/auth/reset-password',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),
      // CHANGE PASSWORD
      changePassword: build.mutation<GenericResponseType<unknown>, ChangePasswordPayload>({
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
} = authApi;
