import { apiSlice } from '../../../features/api/apiSlice';

const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => ({
        url: '/assignments',
        method: 'GET',
      }),
    }),

    addAssignment: builder.mutation({
      query: (data) => ({
        url: '/assignments',
        method: 'POST',
        body: {
          title: `Assignment ${data.length + 1} - ${data.title}`,
          video_title: data.videoTitle,
          totalMark: data.total,
          video_id: data.videoId,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignments',
              undefined,
              (draft) => {
                draft.push(response.data);
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: {
          title: data.title,
          video_title: data.videoTitle,
          totalMark: data.total,
          video_id: data.videoId,
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignments',
              undefined,
              (draft) => {
                const assignment = draft.find((a) => a.id === arg.id);
                if (assignment) {
                  const findIndex = draft.indexOf(assignment);
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

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData(
            'getAssignments',
            undefined,
            (draft) => {
              const assignment = draft.find((a) => a.id === arg);
              const assignmentIndex = draft.indexOf(assignment);
              if (assignmentIndex !== -1) {
                draft.splice(assignmentIndex, 1);
              }
            }
          )
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
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
