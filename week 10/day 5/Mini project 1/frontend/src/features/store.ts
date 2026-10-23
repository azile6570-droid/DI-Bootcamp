import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import storiesReducer from "./stories/storiesSlice";

export const store = configureStore({
  reducer: { auth: authReducer, stories: storiesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
