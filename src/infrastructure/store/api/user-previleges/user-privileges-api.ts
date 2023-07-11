import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { RoleResponse } from './user-privileges-types';

const userPrivilegesApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      // Role Listing
      roleListing: build.query<GenericResponseType<RoleResponse>, null | undefined>({
        providesTags: [{ type: 'Privileges', id: `roles` }],
        query: () => ({
          url: '/role/list',
          method: 'Get',
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Privileges'],
  });

export const { useRoleListingQuery } = userPrivilegesApi;
