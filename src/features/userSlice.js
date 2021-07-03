import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  playlists: [],
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
  },
});

export const { set_user, set_playlists } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectPlaylists = (state) => state.user.playlists;

export default userSlice.reducer;
