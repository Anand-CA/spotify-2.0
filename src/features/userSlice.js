import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { set_user, set_playlists, set_instance } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
