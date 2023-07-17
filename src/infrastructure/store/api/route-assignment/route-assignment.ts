import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateRouteAssignmentRequest, RouteAssignmentResponse } from './route-assignment-types';

const routeApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      routeAssignmentById: build.query<GenericResponseType<RouteAssignmentResponse>, number | null | undefined>({
        providesTags: [{ type: 'RouteAssignment', id: `route-assignment` }],
        query: (id) => ({
          url: `/route-assignment/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      routeAssignmentList: build.query<GenericResponseType<RouteAssignmentResponse[]>, null | undefined>({
        providesTags: [{ type: 'RouteAssignment', id: `routes-assignment` }],
        query: () => ({
          url: '/route-assignment/list',
          method: 'Get',
        }),
      }),
      saveRouteAssignment: build.mutation<GenericResponseType<number>, CreateRouteAssignmentRequest>({
        query: (payload) => ({
          url: '/route-assignment',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'RouteAssignment', id: `routes-assignment` }],
      }),
      updateRouteAssignment: build.mutation<GenericResponseType<number>, CreateRouteAssignmentRequest>({
        query: (payload) => ({
          url: '/route-assignment',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'RouteAssignment', id: `routes-assignment` },
          { type: 'RouteAssignment', id: `route-assignment` },
        ],
      }),
      deleteRouteAssignment: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/route-assignment/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'RouteAssignment', id: `routes-assignment` }],
      }),
      assignedOrderList: build.query<GenericResponseType<unknown[]>, number | null | undefined>({
        providesTags: [{ type: 'RouteAssignment', id: `assigned-order` }],
        query: (id) => ({
          url: `/route/assigned-order/list?id=${id}`,
          method: 'Get',
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['RouteAssignment'],
  });

export const {
  useRouteAssignmentByIdQuery,
  useRouteAssignmentListQuery,
  useSaveRouteAssignmentMutation,
  useUpdateRouteAssignmentMutation,
  useDeleteRouteAssignmentMutation,
  useAssignedOrderListQuery,
} = routeApi;
