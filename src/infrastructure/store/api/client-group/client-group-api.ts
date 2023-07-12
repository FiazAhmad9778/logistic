import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { ClientGroupRequest } from './client-group-types';

const clientGroupApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      clientGroups: build.query<GenericResponseType<unknown>, null | undefined>({
        providesTags: [{ type: 'ClientGroup', id: `client-groups` }],
        query: () => ({
          url: '/clientgroup/list',
          method: 'Get',
        }),
      }),
      saveClientGroup: build.mutation<GenericResponseType<unknown>, ClientGroupRequest>({
        query: (payload) => ({
          url: '/clientgroup/save',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'ClientGroup', id: `client-groups` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['ClientGroup'],
  });

export const { useClientGroupsQuery, useSaveClientGroupMutation } = clientGroupApi;
