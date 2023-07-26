import { appApi } from '../index';
import { GenericResponseType } from '../../../../types/common/http-types';
import { AutomatedEmailRequest, AutomatedEmailResponse } from './automated-email-types';

const automatedEmailApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      automatedEmailById: build.query<GenericResponseType<AutomatedEmailResponse>, number | null | undefined>({
        providesTags: [{ type: 'AutomatedEmail', id: `automated-email` }],
        query: (id) => ({
          url: `/automatedemail/get?Id=${id}`,
          method: 'Get',
        }),
      }),
      automatedEmailList: build.query<GenericResponseType<AutomatedEmailResponse[]>, null | undefined>({
        providesTags: [{ type: 'AutomatedEmail', id: `automated-emails` }],
        query: () => ({
          url: '/automatedemail/list',
          method: 'Get',
        }),
      }),
      saveAutomatedEmail: build.mutation<GenericResponseType<number>, AutomatedEmailRequest>({
        query: (payload) => ({
          url: '/automatedemail',
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'AutomatedEmail', id: `automated-emails` }],
      }),
      updateAutomatedEmail: build.mutation<GenericResponseType<number>, AutomatedEmailRequest>({
        query: (payload) => ({
          url: '/automatedemail',
          method: 'Put',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'AutomatedEmail', id: `automated-emails` },
          { type: 'AutomatedEmail', id: `automated-email` },
        ],
      }),
      deleteAutomatedEmail: build.mutation<GenericResponseType<number>, number | undefined>({
        query: (id) => ({
          url: `/automatedemail?Id=${id}`,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'AutomatedEmail', id: `automated-emails` }],
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['AutomatedEmail'],
  });

export const {
  useAutomatedEmailByIdQuery,
  useAutomatedEmailListQuery,
  useSaveAutomatedEmailMutation,
  useUpdateAutomatedEmailMutation,
  useDeleteAutomatedEmailMutation,
} = automatedEmailApi;
