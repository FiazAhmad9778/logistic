import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { UserResponse } from './company-types';

const companyApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      userById: build.query<GenericResponseType<UserResponse>, number | null | undefined>({
        providesTags: [{ type: 'Company', id: `user` }],
        query: (id) => ({
          url: `/user/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      usersList: build.query<GenericResponseType<UserResponse[]>, null | undefined>({
        providesTags: [{ type: 'Company', id: `users` }],
        query: () => ({
          url: '/user/list',
          method: 'Get',
        }),
      }),
      saveUser: build.mutation<GenericResponseType<number>, unknown>({
        query: (payload) => ({
          url: '/user/save',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Company', id: `users` }],
      }),
      updateUser: build.mutation<GenericResponseType<number>, unknown>({
        query: (payload) => ({
          url: '/user',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'Company', id: `users` },
          { type: 'Company', id: `user` },
        ],
      }),
      deleteUser: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/user/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Company', id: `users` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Company'],
  });

export const {
  useUserByIdQuery,
  useUsersListQuery,
  useSaveUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = companyApi;
