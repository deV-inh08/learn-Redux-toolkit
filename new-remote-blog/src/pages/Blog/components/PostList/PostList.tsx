import { useDeletePostMutation, useGetPostsQuery } from 'pages/Blog/blog.service'
import PostItem from '../PostItem'
import { useDispatch } from 'react-redux'
import { startEditPost } from 'pages/Blog/blog.slice'

// Gọi API trong useEffect()
// Nếu gọi thành công thì dispatch action type: "blog/getPostListSuccess"
// Nếu gọi thất bại thì dispatch action type: "blog/getPostListFailed"

// xxxxx: Dispatch action type "blog/getPostList"

export default function PostList() {
  const { data, isLoading, isFetching } = useGetPostsQuery()
  // isLoading: fetch lan dau
  // isFetch: update trang thai moi lan fetch
  const dispatch = useDispatch();

  const [deletePost] = useDeletePostMutation()

  const startEdit = (id: string) => {
    dispatch(startEditPost(id))
  }

  const handledeletePost = (id: string) => {
    deletePost(id)
  }

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
          <>
            {!isFetching && data && data.map((post) => {
              return (
                <PostItem post={post} startEdit={startEdit} handledeletePost={handledeletePost}></PostItem>
              )
            })}
          </>
        </div>
      </div>
    </div>
  )
}
