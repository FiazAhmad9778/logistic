import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateCustomerRequest, CustomerResponse, UpdateCustomerRequest } from './customer-types';

const customerApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      customerById: build.query<GenericResponseType<CustomerResponse>, number | null | undefined>({
        providesTags: [{ type: 'Customer', id: `customer` }],
        query: (id) => ({
          url: `/customer/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      customerList: build.query<GenericResponseType<CustomerResponse[]>, null | undefined>({
        providesTags: [{ type: 'Customer', id: `customers` }],
        query: () => ({
          url: '/customer/list',
          method: 'Get',
        }),
      }),
      saveCustomer: build.mutation<GenericResponseType<number>, CreateCustomerRequest>({
        query: (payload) => ({
          url: '/customer',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Customer', id: `customers` }],
      }),
      updateCustomer: build.mutation<GenericResponseType<number>, UpdateCustomerRequest>({
        query: (payload) => ({
          url: '/customer',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'Customer', id: `customers` },
          { type: 'Customer', id: `customer` },
        ],
      }),
      deleteCustomer: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/customer/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Customer', id: `customers` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Customer'],
  });

export const {
  useCustomerByIdQuery,
  useCustomerListQuery,
  useSaveCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
