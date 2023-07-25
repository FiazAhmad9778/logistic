import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { CreateSafetyCheckRequest, SafetyCheckResponse, UpdateSafetyCheckRequest } from './safety-check-types';

const safetyCheckApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      safetyCheckById: build.query<GenericResponseType<SafetyCheckResponse>, number | null | undefined>({
        providesTags: [{ type: 'SafetyCheck', id: `safety-check` }],
        query: (id) => ({
          url: `/safetycheck/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      safetyCheckList: build.query<GenericResponseType<SafetyCheckResponse[]>, null | undefined>({
        providesTags: [{ type: 'SafetyCheck', id: `safety-checks` }],
        query: () => ({
          url: '/safetycheck/list',
          method: 'Get',
        }),
      }),
      saveSafetyCheck: build.mutation<GenericResponseType<number>, CreateSafetyCheckRequest>({
        query: (payload) => ({
          url: '/safetycheck/save',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'SafetyCheck', id: `safety-checks` }],
      }),
      updateSafetyCheck: build.mutation<GenericResponseType<number>, UpdateSafetyCheckRequest>({
        query: (payload) => ({
          url: '/safetycheck',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'SafetyCheck', id: `safety-checks` },
          { type: 'SafetyCheck', id: `safety-check` },
        ],
      }),
      deleteSafetyCheck: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/safetycheck/delete?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'SafetyCheck', id: `safety-checks` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['SafetyCheck'],
  });

export const {
  useSafetyCheckByIdQuery,
  useSafetyCheckListQuery,
  useSaveSafetyCheckMutation,
  useUpdateSafetyCheckMutation,
  useDeleteSafetyCheckMutation,
} = safetyCheckApi;
