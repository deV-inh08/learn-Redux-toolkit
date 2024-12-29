import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './page/blog.reducer'


export const store = configureStore({
    reducer: {
        'MyBlog': blogReducer
    }
});

// Declare the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
