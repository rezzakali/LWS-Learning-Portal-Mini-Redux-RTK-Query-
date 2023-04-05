import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myArr: [],
  quizResult: {
    modal: false,
    arr: null,
  },
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizAnswer: (state, action) => {
      const myArrIndex = state.myArr.findIndex(
        (optionItem) => optionItem.id === action.payload.id
      );
      if (myArrIndex !== -1) {
        state.myArr[myArrIndex] = action.payload;
      } else {
        state.myArr.push(action.payload);
      }
    },
  },
});

export const { addQuizAnswer, loadQuizResult } = quizSlice.actions;
export default quizSlice.reducer;
