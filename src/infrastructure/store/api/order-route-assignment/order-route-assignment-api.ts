import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateOrderRouteAssignmentRequest } from './order-route-assignment-types';

const orderRouteAssignmentApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      orderRouteAssignmentList: build.query<GenericResponseType<unknown[]>, null | undefined>({
        providesTags: [{ type: 'OrderRouteAssignment', id: `order-routes` }],
        query: () => ({
          url: '/orderrouteassignment/list',
          method: 'Get',
        }),
      }),
      saveOrderRouteAssignment: build.mutation<GenericResponseType<number>, CreateOrderRouteAssignmentRequest>({
        query: (payload) => ({
          url: '/orderrouteassignment/save',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'OrderRouteAssignment', id: `order-routes` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['OrderRouteAssignment'],
  });

export const { useOrderRouteAssignmentListQuery, useSaveOrderRouteAssignmentMutation } = orderRouteAssignmentApi;
