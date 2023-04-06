import { apiSlice } from '../../api/apiSlice';

const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments?video_id=${id}`,
        method: 'GET',
      }),
    }),

    // submit assignment
    submitAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: '/assignmentMark',
        method: 'POST',
        body: {
          student_id: id,
          student_name: data.student_name,
          assignment_id: data.assignmentId,
          title: data.title,
          createdAt: new Date().toISOString(),
          totalMark: 100,
          mark: 0,
          repo_link: data.repo_link,
          status: 'pending',
        },
      }),
    }),

    async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      try {
        const response = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData(
            'getAssignment',
            arg.data.finalId,
            (draft) => {
              draft.push(response.data);
            }
          )
        );
      } catch (error) {
        console.log(error);
      }
    },

    // check the assignment is already submitted or not by the logged in user
    checkAssignmentSubmitted: builder.query({
      query: ({ studentId, assignmentId, studentName }) => ({
        url: `/assignmentMark?student_id=${studentId}&assignment_id=${assignmentId}&student_name=${studentName}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useSubmitAssignmentMutation,
  useCheckAssignmentSubmittedQuery,
} = assignmentApi;
