import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types/blog.type";
import http from "utils/http";

interface initialStateType {
  postList: Post[]
  editPost: Post | null
}

const initialState: initialStateType = {
  postList: [],
  editPost: null
}

// Cach 1
export const getPostListSuccess = createAction<Post[]>('/blog/getPostListSuccess')


// Cach 2
export const getPostList = createAsyncThunk(
  'blog/getPostList',
  async (_, thunkApi) => {
    const res = await http.get<Post[]>('posts', {
      signal: thunkApi.signal
    })
    return res.data
  }
)


export const addPost = createAsyncThunk(
  'blog/addPost',
  async (post: Post, thunkApi) => {
    const response = await http.post<Post>('posts', post, {
      signal: thunkApi.signal
    })
    return response.data
  }
)

export const editPost = createAsyncThunk(
  'blog/editPost',
  async (id: string, thunkApi) => {
    const res = await http.get<Post>(`posts/${id}`,{
      signal: thunkApi.signal
    })
    return res.data
  }
)

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async(post: Post, thunkApi) => {
    const response = await http.patch<Post>(`posts/${post.id}`, post, {
      signal: thunkApi.signal
    })
    return response.data
  }
)


export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id: string, thunkApi) => {
    const response = await http.delete<Post>(`posts/${id}`, {
      signal: thunkApi.signal
    })
    return response.data
  }
)


const blogSlice = createSlice({
  initialState,
  name: 'blog',
  reducers: {},


  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.editPost = action.payload
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.some((post, index) => {
          if(post.id === action.payload.id) {
            state.postList[index] = action.payload
          }
        })
        state.editPost = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const findIndexPost = state.postList.findIndex((post) => post.id === action.payload.id)
        if(findIndexPost !== -1) {
          state.postList.splice(findIndexPost, 1)
        }
      })
  }
})


export const blogReducer = blogSlice.reducer;
