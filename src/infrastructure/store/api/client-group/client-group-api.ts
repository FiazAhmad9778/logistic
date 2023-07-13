import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { ClientGroupResponse, CreateClientGroupRequest, UpdateClientGroupRequest } from './client-group-types';

const clientGroupApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      clientGroups: build.query<GenericResponseType<ClientGroupResponse[]>, null | undefined>({
        providesTags: [{ type: 'ClientGroup', id: `client-groups` }],
        query: () => ({
          url: '/clientgroup/list',
          method: 'Get',
        }),
      }),
      saveClientGroup: build.mutation<GenericResponseType<unknown>, CreateClientGroupRequest>({
        query: (payload) => ({
          url: '/clientgroup',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'ClientGroup', id: `client-groups` }],
      }),

      updateClientGroup: build.mutation<GenericResponseType<unknown>, UpdateClientGroupRequest>({
        query: (payload) => ({
          url: '/clientgroup',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'ClientGroup', id: `client-groups` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['ClientGroup'],
  });

export const { useClientGroupsQuery, useSaveClientGroupMutation, useUpdateClientGroupMutation } = clientGroupApi;
