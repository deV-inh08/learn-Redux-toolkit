import { createAction, createReducer, current, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../types/blog.type'
import { initalPostList } from '../constants/blog'

interface initialStateType {
    postList: Post[] 
    editPost: Post | null
}

const initialState: initialStateType = {
    postList: initalPostList,
    editPost: null
}

// prepare callback
export const addPost = createAction('blog/addPost', (post: Post) => {
    return {
        payload: {
            ...post,
            id: new Date().toISOString()
        }
    }
});

export const deletePost = createAction<string>('blog/deletePost');

export const editPost = createAction<Post>('blog/editPost');

export const updatePost = createAction<Post>('blog/updatePost');

export const cancelUpdatePost = createAction('blog/cancelUpdatePost');


// builder callback
const blogReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addPost, (state, action) => {
            const post = action.payload;
            state.postList.push(post)

        })
        .addCase(deletePost, (state, action) => {
            const postID = action.payload;
            const findIndexPost = state.postList.findIndex((post) => post.id === postID);
            console.log(findIndexPost)
            if(findIndexPost !== -1) {
                state.postList.splice(findIndexPost, 1)
            }
        })
        .addCase(editPost, (state, action) => {
            const postID = action.payload.id;
            const findIndexPost = state.postList.findIndex((post) => post.id === postID);
            if(findIndexPost !== -1) {
                state.editPost = action.payload
            }
        })
        .addCase(updatePost, (state, action) => {
            const postID = action.payload.id;
            state.postList.some((post, index) => {
                if(post.id === postID) {
                    state.postList[index] = action.payload;
                }
                return false
            });
        })
        .addCase(cancelUpdatePost, (state) => {
            state.editPost = null
        })
        .addMatcher((action) => (action.type as string).includes('cancel') , (state, action) => {
            console.log(current(state))
        })
})


// Map Object ==> 
// const blogReducer = createReducer(initialState, {
//         [addPost.type]: (state, action: PayloadAction) => {
//             const post = action.payload;
//             state.postList.push(post)
//         },

//         [deletePost.type]: (state, action) => {
//             const postID = action.payload;
//             const findIndexPost = state.postList.findIndex((post) => post.id === postID);
//             console.log(findIndexPost)
//             if(findIndexPost !== -1) {
//                 state.postList.splice(findIndexPost, 1)
//             }
//         },

//         [editPost.type]: (state, action) => {
//             const postID = action.payload.id;
//             const findIndexPost = state.postList.findIndex((post) => post.id === postID);
//             if(findIndexPost !== -1) {
//                 state.editPost = action.payload
//             }
//         },
//         [updatePost.type]: (state, action) => {
//             const postID = action.payload.id;
//             state.postList.some((post, index) => {
//                 if(post.id === postID) {
//                     state.postList[index] = action.payload;
//                 }
//                 return false
//             });
//         },
//         [cancelUpdatePost.type]: (state) => {
//             state.editPost = null
//         }
//     },
//     [
//         {
//             matcher: ((action: any) => action.type.includes('cancel')) as any,
//             reducer(state, action) {
//                 console.log(current(state))
//             }
//         }
//     ],
//     (state) => {
//         console.log('state')
//     }
// );

export default blogReducer;