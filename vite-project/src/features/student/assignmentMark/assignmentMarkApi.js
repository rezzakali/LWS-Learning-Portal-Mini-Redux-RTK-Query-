import { apiSlice } from '../../api/apiSlice';

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: ({ studentId }) => ({
        url: `/assignmentMark?student_id=${studentId}`,
        method: 'GET',
      }),
    }),

    getAssignmentMarkStudent: builder.query({
      query: (id, student_name, assignmentId) => ({
        url: `/assignmentMark?student_id=${id}&student_name=${student_name}&assignment_id=${assignmentId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAssignmentMarksQuery, useGetAssignmentMarkStudentQuery } =
  assignmentMarkApi;
