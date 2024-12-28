import React, { useContext } from 'react'
import PostItem from '../PostItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { deletePost, editPost } from '../../blog.reducer';
import { AppContext } from '../../../contexts/app.context';

const PostList = () => {
  const blogs = useSelector((state: RootState) => state.blog.postList);
  const {  setIsEdit } = useContext(AppContext);

  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePost = (id: string) => {
      dispatch(deletePost(id))
  };
  
  const handleEditPost = (id: string) => {
    dispatch(editPost(id))
    setIsEdit(true)
  };
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
    <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
      <div className='mb-10 md:mb-16'>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Được Dev Blog</h2>
        <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
          Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
        </p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
        {blogs.length && blogs.map((item) => {
          return (
            <PostItem onEditPost={handleEditPost} onDeletePost={handleDeletePost} key={item.id} item={item}></PostItem>
          )
        })}
      </div>
    </div>
  </div>
  )
}

export default PostList;