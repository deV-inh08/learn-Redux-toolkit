import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (build) => ({
    // query --> get
    // mutation --> post, put, patch, delete

    // Generic type<responseData, argument>
    getPosts: build.query<Post[], void>({
      query: () => 'posts', // not arguments

      providesTags(result) {
        if(result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }

        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),

    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        return {
          url: 'posts',
          method: 'POST',
          body
        }
      },
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),

    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`
    }),

    updatePost: build.mutation<Post, { id: string, body: Post }>({
      query(data) {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data
        }
      },
      // update local state
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),

    deletePost: build.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
    })
  })
})


export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } = blogApi