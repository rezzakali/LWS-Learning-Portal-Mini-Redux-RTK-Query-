import { apiSlice } from '../../api/apiSlice';

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ role }) => ({
        url: `/users?role=${role}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
