import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlayTrack: {},
  playing: false,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentPlayTrack = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
  },
});

export const { setCurrentTrack, setPlaying } = songSlice.actions;

export const selectCurrentPlayTrack = (state) => state.song.currentPlayTrack;
export const selectPlaying = (state) => state.song.playing;

export default songSlice.reducer;
