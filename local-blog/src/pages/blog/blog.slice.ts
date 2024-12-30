import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types/blog.type";
import { initalPostList } from "constants/blog";


interface initialStateType {
  postList: Post[]
  editPost: Post | null
}

const initialState: initialStateType = {
  postList: initalPostList,
  editPost: null
} 

const blogSlice = createSlice({
  name: 'blog',
  initialState,

  // genera action
  reducers: {
    // addPost: (state, action: PayloadAction<Post>) => {
    //   const post = action.payload
    //   state.postList.push(post)
    // }

    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload
        state.postList.push(post)
      },
      prepare: (post: Post) => (
        {
          payload: {
            ...post,
            id: new Date().toISOString()
          }
        }
      )
    },

    editPost: (state, action: PayloadAction<Post>) => {
      const post = action.payload
      state.editPost = post
    },

    updatePost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if(post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
    },

    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const findIndex = state.postList.findIndex((post) => post.id === postId)
      if(findIndex !== -1) {
        state.postList.splice(findIndex, 1)
      }
    }
  },

  // Don't genera action
  // asycnThunk
  extraReducers: {

  }
})

export const { addPost, editPost, updatePost, deletePost } = blogSlice.actions


const reducer = blogSlice.reducer
export default reducer

