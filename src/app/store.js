import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import songReducer from "../features/songSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
  },
});
