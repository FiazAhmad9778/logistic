import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateRouteRequest, RouteResponse } from './route-types';

const routeApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      routeById: build.query<GenericResponseType<RouteResponse>, number | null | undefined>({
        providesTags: [{ type: 'Route', id: `route` }],
        query: (id) => ({
          url: `/route/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      routeList: build.query<GenericResponseType<RouteResponse[]>, null | undefined>({
        providesTags: [{ type: 'Route', id: `routes` }],
        query: () => ({
          url: '/route/list',
          method: 'Get',
        }),
      }),
      saveRoute: build.mutation<GenericResponseType<number>, CreateRouteRequest>({
        query: (payload) => ({
          url: '/route',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Route', id: `routes` }],
      }),
      updateRoute: build.mutation<GenericResponseType<number>, CreateRouteRequest>({
        query: (payload) => ({
          url: '/route',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'Route', id: `routes` },
          { type: 'Route', id: `route` },
        ],
      }),
      deleteRoute: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/route/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Route', id: `routes` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Route'],
  });

export const {
  useRouteByIdQuery,
  useRouteListQuery,
  useSaveRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} = routeApi;
