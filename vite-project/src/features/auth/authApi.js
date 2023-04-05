import { apiSlice } from '../api/apiSlice';
import { Login, studentRegister } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
          role: 'student',
          name: data.name,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: response?.data?.accessToken,
              user: response?.data?.user,
            })
          );

          dispatch(
            studentRegister({
              accessToken: response?.data?.accessToken,
              user: response?.data?.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: response?.data?.accessToken,
              user: response?.data?.user,
            })
          );

          dispatch(
            Login({
              accessToken: response?.data?.accessToken,
              user: response?.data?.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
