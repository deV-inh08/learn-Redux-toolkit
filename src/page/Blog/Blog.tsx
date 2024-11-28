import React from 'react'
import CreatPost from '../components/CreatePost';
import PostList from '../components/PostList';

const Blog = () => {
  return (
    <div className='p-5'>
        <CreatPost></CreatPost>
        <PostList></PostList>
    </div>
  )
}

export default Blog;
