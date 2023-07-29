import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import {
  CreateMobileNotificationRequest,
  MobileNotificationResponse,
  UpdateMobileNotificationRequest,
} from './mobile-notification-types';

const mobileNotificationApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      mobileNotificationById: build.query<GenericResponseType<MobileNotificationResponse>, number | null | undefined>({
        providesTags: [{ type: 'MobileNotification', id: `mobile-notification` }],
        query: (id) => ({
          url: `/pushnotification/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      mobileNotificationList: build.query<GenericResponseType<MobileNotificationResponse[]>, null | undefined>({
        providesTags: [{ type: 'MobileNotification', id: `mobile-notifications` }],
        query: () => ({
          url: '/pushnotification/list',
          method: 'Get',
        }),
      }),
      saveMobileNotification: build.mutation<GenericResponseType<number>, CreateMobileNotificationRequest>({
        query: (payload) => ({
          url: '/pushnotification',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'MobileNotification', id: `mobile-notifications` }],
      }),
      updateMobileNotification: build.mutation<GenericResponseType<number>, UpdateMobileNotificationRequest>({
        query: (payload) => ({
          url: '/pushnotification',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'MobileNotification', id: `mobile-notifications` },
          { type: 'MobileNotification', id: `mobile-notification` },
        ],
      }),
      deleteMobileNotification: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/pushnotification?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'MobileNotification', id: `mobile-notifications` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['MobileNotification'],
  });

export const {
  useMobileNotificationByIdQuery,
  useMobileNotificationListQuery,
  useSaveMobileNotificationMutation,
  useUpdateMobileNotificationMutation,
  useDeleteMobileNotificationMutation,
} = mobileNotificationApi;
