import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    studentRegister: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    // common for student and admin
    Login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    studentLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },

    adminLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { studentRegister, studentLoggedOut, Login, adminLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
