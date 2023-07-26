import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { DeliveryRecipientRequest, DeliveryRecipientResponse } from './delivery-recipient-types';

const deliveryRecipientApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      deliveryRecipientById: build.query<GenericResponseType<DeliveryRecipientResponse>, number | null | undefined>({
        providesTags: [{ type: 'DeliveryRecipient', id: `delivery-recipient` }],
        query: (id) => ({
          url: `/deliveryrecipient/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      deliveryRecipientList: build.query<GenericResponseType<DeliveryRecipientResponse[]>, null | undefined>({
        providesTags: [{ type: 'DeliveryRecipient', id: `delivery-recipients` }],
        query: () => ({
          url: '/deliveryrecipient/list',
          method: 'Get',
        }),
      }),
      saveDeliveryRecipient: build.mutation<GenericResponseType<number>, DeliveryRecipientRequest>({
        query: (payload) => ({
          url: '/deliveryrecipient',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'DeliveryRecipient', id: `delivery-recipients` }],
      }),
      updateDeliveryRecipient: build.mutation<GenericResponseType<number>, DeliveryRecipientRequest>({
        query: (payload) => ({
          url: '/deliveryrecipient',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'DeliveryRecipient', id: `delivery-recipients` },
          { type: 'DeliveryRecipient', id: `delivery-recipient` },
        ],
      }),
      deleteDeliveryRecipient: build.mutation<GenericResponseType<number>, number | undefined>({
        query: (id) => ({
          url: `/deliveryrecipient?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'DeliveryRecipient', id: `delivery-recipients` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['DeliveryRecipient'],
  });

export const {
  useDeliveryRecipientByIdQuery,
  useDeliveryRecipientListQuery,
  useSaveDeliveryRecipientMutation,
  useUpdateDeliveryRecipientMutation,
  useDeleteDeliveryRecipientMutation,
} = deliveryRecipientApi;
