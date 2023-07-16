import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { ClientGroupResponse, CreateClientGroupRequest, UpdateClientGroupRequest } from './client-group-types';

const clientGroupApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      clientGroupById: build.query<GenericResponseType<ClientGroupResponse>, number | null | undefined>({
        providesTags: [{ type: 'ClientGroup', id: `client-group` }],
        query: (id) => ({
          url: `/clientgroup/get?id=${id}`,
          method: 'Get',
        }),
      }),
      clientGroups: build.query<GenericResponseType<ClientGroupResponse[]>, null | undefined>({
        providesTags: [{ type: 'ClientGroup', id: `client-groups` }],
        query: () => ({
          url: '/clientgroup/list',
          method: 'Get',
        }),
      }),
      saveClientGroup: build.mutation<GenericResponseType<number>, CreateClientGroupRequest>({
        query: (payload) => ({
          url: '/clientgroup',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'ClientGroup', id: `client-groups` }],
      }),

      updateClientGroup: build.mutation<GenericResponseType<number>, UpdateClientGroupRequest>({
        query: (payload) => ({
          url: '/clientgroup',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'ClientGroup', id: `client-groups` },
          { type: 'ClientGroup', id: `client-group` },
        ],
      }),
      deleteClientGroup: build.mutation<GenericResponseType<boolean>, number | undefined>({
        query: (id) => ({
          url: `/clientgroup/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'ClientGroup', id: `client-groups` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['ClientGroup'],
  });

export const {
  useClientGroupByIdQuery,
  useClientGroupsQuery,
  useSaveClientGroupMutation,
  useUpdateClientGroupMutation,
  useDeleteClientGroupMutation,
} = clientGroupApi;
