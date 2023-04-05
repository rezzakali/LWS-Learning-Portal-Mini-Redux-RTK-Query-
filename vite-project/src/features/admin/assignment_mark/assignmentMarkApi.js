import { apiSlice } from '../../api/apiSlice';

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMark: builder.query({
      query: () => ({
        url: `/assignmentMark`,
        method: 'GET',
      }),
    }),

    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: 'PATCH',
        body: {
          mark: data.parsedMark,
          status: 'published',
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignmentMark',
              undefined,
              (draft) => {
                const aMark = draft.find((a) => a.id === arg.id);
                if (aMark) {
                  const findIndex = draft.indexOf(aMark);
                  draft[findIndex] = response.data;
                }
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetAssignmentMarkQuery, useEditAssignmentMarkMutation } =
  assignmentMarkApi;
