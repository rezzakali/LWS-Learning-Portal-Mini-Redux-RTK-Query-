import { apiSlice } from '../../api/apiSlice';

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: ({ studentId }) => ({
        url: `/assignmentMark?student_id=${studentId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAssignmentMarksQuery } = assignmentMarkApi;
