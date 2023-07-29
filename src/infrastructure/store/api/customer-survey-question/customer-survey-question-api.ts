import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import {
  CreateSurveyQuestionRequest,
  SurveyQuestionResponse,
  UpdateSurveyQuestionRequest,
} from './customer-survey-question-types';

const surveyQuestionApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      surveyQuestionById: build.query<GenericResponseType<SurveyQuestionResponse>, number | null | undefined>({
        providesTags: [{ type: 'SurveyQuestion', id: `survey-question` }],
        query: (id) => ({
          url: `/customersurveyquestion/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      surveyQuestionList: build.query<GenericResponseType<SurveyQuestionResponse[]>, null | undefined>({
        providesTags: [{ type: 'SurveyQuestion', id: `survey-questions` }],
        query: () => ({
          url: '/customersurveyquestion/list',
          method: 'Get',
        }),
      }),
      saveSurveyQuestion: build.mutation<GenericResponseType<number>, CreateSurveyQuestionRequest>({
        query: (payload) => ({
          url: '/customersurveyquestion',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'SurveyQuestion', id: `survey-questions` }],
      }),
      updateSurveyQuestion: build.mutation<GenericResponseType<number>, UpdateSurveyQuestionRequest>({
        query: (payload) => ({
          url: '/customersurveyquestion',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'SurveyQuestion', id: `survey-questions` },
          { type: 'SurveyQuestion', id: `survey-question` },
        ],
      }),
      deleteSurveyQuestion: build.mutation<GenericResponseType<unknown>, number | undefined>({
        query: (id) => ({
          url: `/customersurveyquestion?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'SurveyQuestion', id: `survey-questions` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['SurveyQuestion'],
  });

export const {
  useSurveyQuestionByIdQuery,
  useSurveyQuestionListQuery,
  useSaveSurveyQuestionMutation,
  useUpdateSurveyQuestionMutation,
  useDeleteSurveyQuestionMutation,
} = surveyQuestionApi;
