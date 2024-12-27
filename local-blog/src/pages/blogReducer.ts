import { createAction, createReducer, current } from "@reduxjs/toolkit"
import { Post } from "types/blog.type"
import { initalPostList } from "constants/blog"

interface InitialStateType {
  postList: Post[]
}

const initialState: InitialStateType = {
  postList: initalPostList
}

// create Action
// + AddPostAction
export const addPost = createAction<Post>('Myblog/addPost')


export const blogReducer = createReducer(initialState, builder => {
  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload
      state.postList.push(post)
    })
});

