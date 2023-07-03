import { appApi } from './../index';

const fileApi = appApi
  .injectEndpoints({
    endpoints: (builder) => ({
      uploadFile: builder.mutation<void, File[]>({
        query: (files) => {
          console.log('filess<>>>>>>>>>>>>>>>>>');
          const formData = new FormData();
          files.forEach((file, i) => {
            formData.append('file' + i, file);
          });

          return {
            url: '/document',
            method: 'POST',
            body: formData,
          };
        },
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['File'],
  });

export const { useUploadFileMutation } = fileApi;
