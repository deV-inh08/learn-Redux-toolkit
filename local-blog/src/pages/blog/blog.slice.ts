import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types/blog.type";
import { initalPostList } from "constants/blog";


interface initialStateType {
  postList: Post[]
}

const initialState: initialStateType = {
  postList: initalPostList
} 

const blogSlice = createSlice({
  name: 'blog',
  initialState,
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
    }
  }
})

export const { addPost } = blogSlice.actions


const reducer = blogSlice.reducer
export default reducer

