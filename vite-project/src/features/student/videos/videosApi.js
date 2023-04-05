import { apiSlice } from '../../api/apiSlice';

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: `/videos`,
        method: 'GET',
      }),
    }),

    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery } = videosApi;
