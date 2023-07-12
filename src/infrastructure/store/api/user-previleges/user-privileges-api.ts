import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { ClaimGroupRequest, RoleRequest, RoleResponse } from './user-privileges-types';

const userPrivilegesApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      // Role Listing
      roleListing: build.query<GenericResponseType<RoleResponse[]>, null | undefined>({
        providesTags: [{ type: 'Privileges', id: `roles` }],
        query: () => ({
          url: '/role/list',
          method: 'Get',
        }),
      }),
      saveRole: build.mutation<GenericResponseType<unknown>, RoleRequest>({
        query: (payload) => ({
          url: '/role/save',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Privileges', id: `roles` }],
      }),
      deleteRole: build.mutation<GenericResponseType<unknown>, number>({
        query: (id) => ({
          url: `/role/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Privileges', id: `roles` }],
      }),
      claimGroupListing: build.query<GenericResponseType<ClaimGroupRequest[]>, number | undefined>({
        providesTags: [{ type: 'Privileges', id: `claim-group` }],
        query: (id) => ({
          url: `/claimgroup/list?RoleId=${id}`,
          method: 'Get',
        }),
      }),
      saveClaimGroup: build.mutation<GenericResponseType<unknown>, ClaimGroupRequest>({
        query: (payload) => ({
          url: '/claimgroup/save',
          method: 'Post',
          body: payload,
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Privileges'],
  });

export const {
  useRoleListingQuery,
  useSaveRoleMutation,
  useDeleteRoleMutation,
  useClaimGroupListingQuery,
  useLazyClaimGroupListingQuery,
  useSaveClaimGroupMutation,
} = userPrivilegesApi;
