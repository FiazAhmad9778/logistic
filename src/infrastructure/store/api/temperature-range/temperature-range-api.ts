import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { TemperatureRangeRequest, TemperatureRangeResponse } from './temperature-range-types';

const temperatureRangeApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      temperatureRangeById: build.query<GenericResponseType<TemperatureRangeResponse>, number | null | undefined>({
        providesTags: [{ type: 'TemperatureRange', id: `temperature-range` }],
        query: (id) => ({
          url: `/temperaturerange/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      temperatureRangeList: build.query<GenericResponseType<TemperatureRangeResponse[]>, null | undefined>({
        providesTags: [{ type: 'TemperatureRange', id: `temperature-ranges` }],
        query: () => ({
          url: '/temperaturerange/list',
          method: 'Get',
        }),
      }),
      saveTemperatureRange: build.mutation<GenericResponseType<number>, TemperatureRangeRequest>({
        query: (payload) => ({
          url: '/temperaturerange',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'TemperatureRange', id: `temperature-ranges` }],
      }),
      updateTemperatureRange: build.mutation<GenericResponseType<number>, TemperatureRangeRequest>({
        query: (payload) => ({
          url: '/temperaturerange',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'TemperatureRange', id: `temperature-ranges` },
          { type: 'TemperatureRange', id: `temperature-range` },
        ],
      }),
      deleteTemperatureRange: build.mutation<GenericResponseType<number>, number | undefined>({
        query: (id) => ({
          url: `/temperaturerange?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'TemperatureRange', id: `temperature-ranges` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['TemperatureRange'],
  });

export const {
  useTemperatureRangeByIdQuery,
  useTemperatureRangeListQuery,
  useSaveTemperatureRangeMutation,
  useUpdateTemperatureRangeMutation,
  useDeleteTemperatureRangeMutation,
} = temperatureRangeApi;
