import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "./page/blog.reducer";

export const blogStore = configureStore({
    reducer: { blog: blogReducer }
});

export type RootState = ReturnType<typeof blogStore.getState> 
export type AppDispatch = typeof blogStore.dispatch;