import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (build) => ({
    // query --> get
    // mutation --> post, put, patch, delete

    // generic type<responseData, argument>
    getPost: build.query<Post[], void>({
      query: () => 'posts' // not arguments
    })
  })
})


export const { useGetPostQuery } = blogApi