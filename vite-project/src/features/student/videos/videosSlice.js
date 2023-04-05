import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedVideo: [],
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
  },
});

export const { loadVideos, setSelectedVideo, setSelectedSingleVideo } =
  videosSlice.actions;
export default videosSlice.reducer;
