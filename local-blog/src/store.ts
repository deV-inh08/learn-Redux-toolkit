import { configureStore } from "@reduxjs/toolkit";
import reducer from "pages/blog/blog.slice";

export const store = configureStore({
  reducer: {
    'Blog': reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
