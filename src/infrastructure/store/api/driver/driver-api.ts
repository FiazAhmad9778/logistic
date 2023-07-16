import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateDriverRequest, DriverResponse, UpdateDriverRequest } from './driver-types';

const driverApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
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
        invalidatesTags: () => [{ type: 'Driver', id: `drivers` }],
      }),
      deleteDriver: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/driver/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Driver', id: `drivers` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Driver'],
  });

export const { useDriversListQuery, useSaveDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation } =
  driverApi;
