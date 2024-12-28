import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "types/blog.type"
import { initalPostList } from "constants/blog"

interface InitialStateType {
  postList: Post[]
  editingPost: Post | null
}

const initialState: InitialStateType = {
  postList: initalPostList,
  editingPost: null
}

const blogSlice = createSlice({
  name: 'BLOG',
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundIndex = state.postList.findIndex((post) => post.id === postId)
      if(foundIndex !== -1) {
        state.postList.splice(foundIndex, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const foundPost = state.postList.find((post) => post.id === postId) as Post
      state.editingPost = foundPost
    },
    cancelEditingPost: (state, action: PayloadAction) => {
      state.editingPost = null
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if(post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    },

    // If use prepare Callback
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload
        state.postList.push(post)
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log(current(state))
        }
      )
  },
})

export const { addPost, cancelEditingPost, deletePost, finishEditingPost, startEditingPost } = blogSlice.actions
const blogReducer = blogSlice.reducer

export default blogReducer


