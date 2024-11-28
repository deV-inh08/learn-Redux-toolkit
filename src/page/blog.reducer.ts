import { createAction, createReducer, current } from "@reduxjs/toolkit"
import { Post } from "../types/blog.type"
import { initalPostList } from "../constants/blog"

interface intialStateType {
    postList: Post[]
};

const intialState: intialStateType = {
    postList: initalPostList
};

// addPost
export const addPost = createAction<Post>('/myBlog/addPost');



export const blogReducer = createReducer(intialState, builder => {
    builder
        .addCase(addPost, (state, action) => {
            const post = action.payload
            state.postList.push(post)
        })
})