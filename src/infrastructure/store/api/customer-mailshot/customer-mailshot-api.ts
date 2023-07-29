import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import {
  CreateCustomerMailshotRequest,
  CustomerMailshotResponse,
  UpdateCustomerMailshotRequest,
} from './customer-mailshot-types';

const customerMailshotApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      customerMailshotById: build.query<GenericResponseType<CustomerMailshotResponse>, number | null | undefined>({
        providesTags: [{ type: 'CustomerMailshot', id: `customer-mailshot` }],
        query: (id) => ({
          url: `/customermailshot/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      customerMailshotList: build.query<GenericResponseType<CustomerMailshotResponse[]>, null | undefined>({
        providesTags: [{ type: 'CustomerMailshot', id: `customer-mailshots` }],
        query: () => ({
          url: '/customermailshot/list',
          method: 'Get',
        }),
      }),
      saveCustomerMailshot: build.mutation<GenericResponseType<number>, CreateCustomerMailshotRequest>({
        query: (payload) => ({
          url: '/customermailshot',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'CustomerMailshot', id: `customer-mailshots` }],
      }),
      updateCustomerMailshot: build.mutation<GenericResponseType<number>, UpdateCustomerMailshotRequest>({
        query: (payload) => ({
          url: '/customermailshot',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'CustomerMailshot', id: `customer-mailshots` },
          { type: 'CustomerMailshot', id: `customer-mailshot` },
        ],
      }),
      deleteCustomerMailshot: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/customermailshot?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'CustomerMailshot', id: `customer-mailshots` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['CustomerMailshot'],
  });

export const {
  useCustomerMailshotByIdQuery,
  useCustomerMailshotListQuery,
  useSaveCustomerMailshotMutation,
  useUpdateCustomerMailshotMutation,
  useDeleteCustomerMailshotMutation,
} = customerMailshotApi;
