import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateOrderQuestionRequest, OrderQuestionResponse, UpdateOrderQuestionRequest } from './order-question-types';

const orderQuestionApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      orderQuestionById: build.query<GenericResponseType<OrderQuestionResponse>, number | null | undefined>({
        providesTags: [{ type: 'OrderQuestion', id: `order-question` }],
        query: (id) => ({
          url: `/orderquestion/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      orderQuestionList: build.query<GenericResponseType<OrderQuestionResponse[]>, null | undefined>({
        providesTags: [{ type: 'OrderQuestion', id: `order-questions` }],
        query: () => ({
          url: '/orderquestion/list',
          method: 'Get',
        }),
      }),
      saveOrderQuestion: build.mutation<GenericResponseType<number>, CreateOrderQuestionRequest>({
        query: (payload) => ({
          url: '/orderquestion',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'OrderQuestion', id: `order-questions` }],
      }),
      updateOrderQuestion: build.mutation<GenericResponseType<number>, UpdateOrderQuestionRequest>({
        query: (payload) => ({
          url: '/orderquestion',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'OrderQuestion', id: `order-questions` },
          { type: 'OrderQuestion', id: `order-question` },
        ],
      }),
      deleteOrderQuestion: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/orderquestion?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'OrderQuestion', id: `order-questions` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['OrderQuestion'],
  });

export const {
  useOrderQuestionByIdQuery,
  useOrderQuestionListQuery,
  useSaveOrderQuestionMutation,
  useUpdateOrderQuestionMutation,
  useDeleteOrderQuestionMutation,
} = orderQuestionApi;
