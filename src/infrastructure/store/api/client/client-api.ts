import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { ClientResponse, CreateClientRequest, UpdateClientRequest } from './client-types';

const clientGroupApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      clientList: build.query<GenericResponseType<ClientResponse[]>, null | undefined>({
        providesTags: [{ type: 'Client', id: `clients` }],
        query: () => ({
          url: '/client/list',
          method: 'Get',
        }),
      }),
      saveClient: build.mutation<GenericResponseType<number>, CreateClientRequest>({
        query: (payload) => ({
          url: '/client',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Client', id: `clients` }],
      }),
      updateClient: build.mutation<GenericResponseType<number>, UpdateClientRequest>({
        query: (payload) => ({
          url: '/client',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Client', id: `clients` }],
      }),
      deleteClient: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/client/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Client', id: `clients` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Client'],
  });

export const { useClientListQuery, useSaveClientMutation, useUpdateClientMutation, useDeleteClientMutation } =
  clientGroupApi;
