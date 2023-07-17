import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateDriverRequest, DriverResponse, MileageRequest, UpdateDriverRequest } from './driver-types';

const driverApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      driverById: build.query<GenericResponseType<DriverResponse>, number | null | undefined>({
        providesTags: [{ type: 'Driver', id: `driver` }],
        query: (id) => ({
          url: `/driver/get?id=${id}`,
          method: 'Get',
        }),
      }),
      driversList: build.query<GenericResponseType<DriverResponse[]>, null | undefined>({
        providesTags: [{ type: 'Driver', id: `drivers` }],
        query: () => ({
          url: '/driver/list',
          method: 'Get',
        }),
      }),
      saveDriver: build.mutation<GenericResponseType<number>, CreateDriverRequest>({
        query: (payload) => ({
          url: '/driver/save',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Driver', id: `drivers` }],
      }),
      updateDriver: build.mutation<GenericResponseType<number>, UpdateDriverRequest>({
        query: (payload) => ({
          url: '/driver',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'Driver', id: `drivers` },
          { type: 'Driver', id: `driver` },
        ],
      }),
      deleteDriver: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/driver/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Driver', id: `drivers` }],
      }),
      updateMileage: build.mutation<GenericResponseType<unknown>, MileageRequest | undefined>({
        query: (payload) => ({
          url: `/mileage`,
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Driver', id: `drivers` }],
      }),
      viewSafetyCheck: build.query<GenericResponseType<unknown>, number | null | undefined>({
        providesTags: [{ type: 'Driver', id: `view-safety-check` }],
        query: () => ({
          url: '/view-safety-check',
          method: 'Get',
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Driver'],
  });

export const {
  useDriverByIdQuery,
  useDriversListQuery,
  useSaveDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
  useUpdateMileageMutation,
  useViewSafetyCheckQuery,
} = driverApi;
