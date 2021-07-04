import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  playlists: [],
  spotify: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload;
    },
    set_playlists: (state, action) => {
      state.playlist = action.payload;
    },
    set_instance: (state, action) => {
      state.s = action.payload;
    },
  },
});

export const { set_user, set_playlists, set_instance } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectPlaylists = (state) => state.user.playlists;
export const selectInstance = (state) => state.user.spotify;

export default userSlice.reducer;
