import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { OrderInstructionsRequest } from './order-types';

const orderApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      orderById: build.query<GenericResponseType<unknown>, number | null | undefined>({
        providesTags: [{ type: 'Order', id: `order` }],
        query: (id) => ({
          url: `/order/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      orderList: build.query<GenericResponseType<unknown[]>, null | undefined>({
        providesTags: [{ type: 'Order', id: `orders` }],
        query: () => ({
          url: '/order/list',
          method: 'Get',
        }),
      }),
      saveOrder: build.mutation<GenericResponseType<number>, unknown>({
        query: (payload) => ({
          url: '/order',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Order', id: `orders` }],
      }),
      updateOrder: build.mutation<GenericResponseType<number>, unknown>({
        query: (payload) => ({
          url: '/order',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'Order', id: `orders` },
          { type: 'Order', id: `order` },
        ],
      }),
      saveOrderInstructions: build.mutation<GenericResponseType<number>, OrderInstructionsRequest>({
        query: (payload) => ({
          url: '/orderinstructions',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Order', id: `orders` }],
      }),
      deleteOrder: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/order/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Order', id: `orders` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Order'],
  });

export const {
  useOrderByIdQuery,
  useOrderListQuery,
  useSaveOrderMutation,
  useUpdateOrderMutation,
  useSaveOrderInstructionsMutation,
  useDeleteOrderMutation,
} = orderApi;
