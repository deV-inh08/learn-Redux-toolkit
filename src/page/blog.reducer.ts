import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { Post } from "../types/blog.type";
import { initalPostList } from "../constants/blog";

export interface BlogState {
    postList: Post[]
    editPost: Post | null
}

const initialPostList: BlogState = {
    postList: initalPostList,
    editPost: null
}

export const addPost = createAction('blog/addPost', function(post: Omit<Post, 'id'>) {
    return {
        payload: {
            ...post,
            id: nanoid()
        }
    }
});

export const deletePost = createAction<string>('blog/deletePost');

export const editPost = createAction<string>('blog/editPost');

export const cancelEditPost = createAction('blog/cancelEditPost');

export const updatePost = createAction<Post>('blog/updatePost');

export const blogReducer = createReducer(initialPostList, (builder) => {
    builder
        .addCase(addPost, (state, action) => {
            const post = action.payload;
            state.postList.push(post)
        })
        .addCase(deletePost, (state, action) => {
            const id = action.payload;
            const foundIndex = state.postList.findIndex((post) => post.id === id);
            if(foundIndex !== -1) {
                state.postList.splice(foundIndex, 1)
            }
        })
        .addCase(editPost, (state, action) => {
            const id = action.payload;
            const findPost = state.postList.find((post) => post.id === id) || null;
            state.editPost = findPost
        })
        .addCase(cancelEditPost, (state, action) => {
            state.editPost = null
        })
        .addCase(updatePost, (state, action) => {
            const id = action.payload.id;
            console.log(action.payload)
            state.postList.some((post, index) => {
                if(post.id === id) {
                    state.postList[index] = action.payload;
                    return true
                }
                return false
            })
        })
})


// export const blogReducer = createReducer(initialPostList,  {
//         [addPost.type]: (state, action) => {
//             const post = action.payload;
//             state.postList.push(post)
//         },
//         deletePost: (state, action) => {
//             const id = action.payload;
//             const foundIndex = state.postList.findIndex((post) => post.id === id);
//             if(foundIndex !== -1) {
//                 state.postList.splice(foundIndex, 1)
//             }
//         },
//         editPost: (state, action) => {
//             const id = action.payload;
//             const findPost = state.postList.find((post) => post.id === id) || null;
//             state.editPost = findPost
//         },
//         cancelEditPost: (state, action) => {
//             state.editPost = null
//         },
//         updatePost: (state, action) => {
//             const id = action.payload.id;
//             console.log(action.payload)
//             state.postList.some((post, index) => {
//                 if(post.id === id) {
//                     state.postList[index] = action.payload;
//                     return true
//                 }
//                 return false
//             })
//         },
// })