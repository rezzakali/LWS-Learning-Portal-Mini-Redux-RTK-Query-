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
          assignment_id: 1,
          title: data.title,
          createdAt: new Date().toISOString(),
          totalMark: 100,
          mark: 0,
          repo_link: data.repo_link,
          status: 'pending',
        },
      }),
    }),
  }),
});

export const { useGetAssignmentQuery, useSubmitAssignmentMutation } =
  assignmentApi;
