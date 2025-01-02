import { configureStore,  } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { blogApi } from "pages/Blog/blog.service";
import { blogReducer } from "pages/Blog/blog.slice";

export const store = configureStore({
  reducer: {
    blog: blogReducer, // reducer from blogSlice (blog.slice.ts)
    [blogApi.reducerPath]: blogApi.reducer // reducer from blogApi (blog.services.ts)
  },
  // add api middleware for enable feature 'caching', 'invalidation, 'polling' of RTK query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

// Optional 
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch