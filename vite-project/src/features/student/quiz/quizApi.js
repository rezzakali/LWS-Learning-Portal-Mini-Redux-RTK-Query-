import { apiSlice } from '../../api/apiSlice';

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes?video_id=${id}`,
        method: 'GET',
      }),
    }),

    // quiz marks endpoint
    getLoggedInUserQuizMark: builder.query({
      query: ({ studentId }) => ({
        url: `/quizMark?student_id=${studentId}`,
        method: 'GET',
      }),
    }),

    // for all users
    getAllUsersQuizMark: builder.query({
      query: (id) => ({
        url: `/quizMark?student_id=${id}`,
        method: 'GET',
      }),
    }),

    // submit quiz
    submitQuiz: builder.mutation({
      query: (data) => ({
        url: `quizMark`,
        method: 'POST',
        body: {
          student_id: data.id,
          student_name: data.name,
          video_id: data.videoId,
          video_title: data.videoTitle,
          totalQuiz: data.totalQuiz,
          totalCorrect: data.totalCorrect,
          totalWrong: data.totalWrong,
          totalMark: data.totalMark,
          mark: data.mark,
        },
      }),
    }),

    // api for checking that the user already perticipated in quiz or not
    findUserInQuizMark: builder.query({
      query: ({ studentId, videoId }) => ({
        url: `quizMark?student_id=${studentId}&video_id=${videoId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetQuizQuery,
  useGetLoggedInUserQuizMarkQuery,
  useGetAllUsersQuizMarkQuery,
  useSubmitQuizMutation,
  useFindUserInQuizMarkQuery,
} = quizzesApi;
