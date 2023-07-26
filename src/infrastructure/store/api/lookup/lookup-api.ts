import { GenericResponseType } from 'src/types/common/http-types';
import { appApi } from '..';
import { SectionResponse } from './lookup-types';

const lookupApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      sectionList: build.query<GenericResponseType<SectionResponse[]>, null | undefined>({
        providesTags: [{ type: 'Lookup', id: `section-list` }],
        query: () => ({
          url: `/lookup/section/list`,
          method: 'Get',
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Lookup'],
  });

export const { useSectionListQuery } = lookupApi;
