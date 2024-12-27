import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "pages/blog.slice"

const store = configureStore({
  reducer: {
    "BLOG": blogReducer
  }
})

// Type RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store