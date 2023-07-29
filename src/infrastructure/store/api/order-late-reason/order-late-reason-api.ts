import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateLateReasonRequest, LateReasonResponse, UpdateLateReasonRequest } from './order-late-reason-types';

const orderLateReasonApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      orderLateReasonById: build.query<GenericResponseType<LateReasonResponse>, number | null | undefined>({
        providesTags: [{ type: 'OrderLateReason', id: `order-late-reason` }],
        query: (id) => ({
          url: `/reasonforlate/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      orderLateReasonList: build.query<GenericResponseType<LateReasonResponse[]>, null | undefined>({
        providesTags: [{ type: 'OrderLateReason', id: `order-late-reasons` }],
        query: () => ({
          url: '/reasonforlate/list',
          method: 'Get',
        }),
      }),
      saveOrderLateReason: build.mutation<GenericResponseType<number>, CreateLateReasonRequest>({
        query: (payload) => ({
          url: '/reasonforlate',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'OrderLateReason', id: `order-late-reasons` }],
      }),
      updateOrderLateReason: build.mutation<GenericResponseType<number>, UpdateLateReasonRequest>({
        query: (payload) => ({
          url: '/reasonforlate',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'OrderLateReason', id: `order-late-reasons` },
          { type: 'OrderLateReason', id: `order-late-reason` },
        ],
      }),
      deleteOrderLateReason: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/reasonforlate?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'OrderLateReason', id: `order-late-reasons` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['OrderLateReason'],
  });

export const {
  useOrderLateReasonByIdQuery,
  useOrderLateReasonListQuery,
  useSaveOrderLateReasonMutation,
  useUpdateOrderLateReasonMutation,
  useDeleteOrderLateReasonMutation,
} = orderLateReasonApi;
