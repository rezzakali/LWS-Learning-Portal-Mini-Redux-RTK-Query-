import { apiSlice } from '../../api/apiSlice';

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: ({ studentId }) => ({
        url: `/assignmentMark?student_id=${studentId}`,
        method: 'GET',
      }),

      // check the assignment is already submitted or not by the logged in user
      checkAssignmentSubmitted: builder.query({
        query: ({ studentId, assignmentId }) => ({
          url: `/assignmentMark?student_id=${studentId}&assignment_id=${assignmentId}`,
          method: 'GET',
        }),
      }),
    }),
  }),
});

export const { useGetAssignmentMarksQuery, useCheckAssignmentSubmittedQuery } =
  assignmentMarkApi;
