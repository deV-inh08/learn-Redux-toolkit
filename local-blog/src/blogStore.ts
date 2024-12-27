import { configureStore } from "@reduxjs/toolkit"
import { blogReducer } from "pages/blogReducer";

export const store = configureStore({
  reducer: {
    "Myblog": blogReducer
  }
})

// Type RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch