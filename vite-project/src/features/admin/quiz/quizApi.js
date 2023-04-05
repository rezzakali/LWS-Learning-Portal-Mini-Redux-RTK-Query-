import { apiSlice } from '../../api/apiSlice';

const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: `/quizzes`,
        method: 'GET',
      }),
    }),

    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: 'POST',
        body: {
          question: data.question,
          video_id: data.findRelatedVideoId,
          video_title: data.relatedVideo,
          options: [
            {
              id: 1,
              option: data.options[0].option1,
              isCorrect: data.options[0].isCorrect,
            },
            {
              id: 2,
              option: data.options[1].option2,
              isCorrect: data.options[1].isCorrect,
            },
            {
              id: 3,
              option: data.options[2].option3,
              isCorrect: data.options[2].isCorrect,
            },
            {
              id: 4,
              option: data.options[3].option4,
              isCorrect: data.options[3].isCorrect,
            },
          ],
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
              draft.push(response.data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        body: {
          question: data.question,
          video_id: data.findRelatedVideoId,
          video_title: data.relatedVideo,
          options: [
            {
              id: 1,
              option: data.options[0].option1,
              isCorrect: data.options[0].isCorrect,
            },
            {
              id: 2,
              option: data.options[1].option2,
              isCorrect: data.options[1].isCorrect,
            },
            {
              id: 3,
              option: data.options[2].option3,
              isCorrect: data.options[2].isCorrect,
            },
            {
              id: 4,
              option: data.options[3].option4,
              isCorrect: data.options[3].isCorrect,
            },
          ],
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
              const quiz = draft.find((q) => q.id === arg.id);
              if (quiz) {
                const findIndex = draft.indexOf(quiz);
                draft[findIndex] = response.data;
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
            const quiz = draft.find((q) => q.id === arg);
            const quizIndex = draft.indexOf(quiz);
            if (quizIndex !== -1) {
              draft.splice(quizIndex, 1);
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
  useGetQuizzesQuery,
  useAddQuizMutation,
  useDeleteQuizMutation,
  useEditQuizMutation,
} = quizApi;
