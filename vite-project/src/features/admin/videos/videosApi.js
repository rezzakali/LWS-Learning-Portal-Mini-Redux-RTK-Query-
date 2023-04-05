import { apiSlice } from '../../api/apiSlice';

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: `/videos`,
        method: 'GET',
      }),
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: 'POST',
        body: {
          title: data.title,
          description: data.description,
          url: data.url,
          views: data.views,
          duration: data.duration,
          createdAt: new Date().toISOString(),
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
              draft.push(response.data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: {
          title: data.title,
          description: data.description,
          url: data.url,
          views: data.views,
          duration: data.duration,
          createdAt: new Date().toISOString(),
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
              const video = draft.find((v) => v.id === arg.id);
              if (video) {
                const findIndex = draft.indexOf(video);
                draft[findIndex] = response.data;
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
            const video = draft.find((v) => v.id === arg);
            const videoIndex = draft.indexOf(video);
            if (videoIndex !== -1) {
              draft.splice(videoIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          result.undo();
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
