import { configureStore } from '@reduxjs/toolkit';
import assignmentMarkReducer from '../features/admin/assignment_mark/assignmentMarkSlice';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import quizReducer from '../features/student/quiz/quizSlice';
import videosReducer from '../features/student/videos/videosSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    marks: assignmentMarkReducer,
    videos: videosReducer,
    quiz: quizReducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
