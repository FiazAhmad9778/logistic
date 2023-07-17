import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateOrderStatusRequest, UpdateOrderStatusRequest } from './order-status-types';

const orderStatusApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      orderStatusById: build.query<GenericResponseType<unknown>, number | null | undefined>({
        providesTags: [{ type: 'OrderStatus', id: `order-status` }],
        query: (id) => ({
          url: `/client/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      orderStatusList: build.query<GenericResponseType<unknown[]>, null | undefined>({
        providesTags: [{ type: 'OrderStatus', id: `orders-status` }],
        query: () => ({
          url: '/client/list',
          method: 'Get',
        }),
      }),
      saveOrderStatus: build.mutation<GenericResponseType<number>, CreateOrderStatusRequest>({
        query: (payload) => ({
          url: '/OrderStatus',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'OrderStatus', id: `orders-status` }],
      }),
      updateOrderStatus: build.mutation<GenericResponseType<number>, UpdateOrderStatusRequest>({
        query: (payload) => ({
          url: '/OrderStatus',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'OrderStatus', id: `orders-status` },
          { type: 'OrderStatus', id: `order-status` },
        ],
      }),
      deleteOrderStatus: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/OrderStatus/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Client', id: `orders-status` }],
      }),
      viewOrderStatus: build.query<GenericResponseType<unknown>, null | undefined>({
        providesTags: [{ type: 'OrderStatus', id: `view-status` }],
        query: () => ({
          url: '/view-order-status',
          method: 'Get',
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['OrderStatus'],
  });

export const {
  useOrderStatusByIdQuery,
  useOrderStatusListQuery,
  useSaveOrderStatusMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderStatusMutation,
  useViewOrderStatusQuery,
} = orderStatusApi;
