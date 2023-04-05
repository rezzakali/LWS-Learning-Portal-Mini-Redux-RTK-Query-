import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  marks: [],
};

const assignmentMarkSlice = createSlice({
  name: 'marks',
  initialState,
  reducers: {
    initializedAssignmentMark: (state, action) => {
      state.marks = action.payload;
    },
  },
});

export const { initializedAssignmentMark } = assignmentMarkSlice.actions;
export default assignmentMarkSlice.reducer;
