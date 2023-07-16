/* eslint-disable @typescript-eslint/no-explicit-any */
import baseQueryWithRefreshToken from '@/helpers/base-query/baseQueryWithRefreshToken';
import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { ExtendedErrorResponse } from '../../../types/common/http-types';

// initialize an empty api service that we'll inject endpoints into later as needed
export const appApi = createApi({
  baseQuery: baseQueryWithRefreshToken as unknown as BaseQueryFn<string | FetchArgs, unknown, ExtendedErrorResponse>,
  tagTypes: ['companyUsers', 'Privileges', 'Driver', 'Client', 'ClientGroup'],
  endpoints: () => ({}),
});
