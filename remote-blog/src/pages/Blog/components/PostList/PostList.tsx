import { Fragment, useEffect } from 'react'
import PostItem from '../PostItem'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { getPostList } from 'pages/Blog/blog.slice'
import SkeletonPost from '../SkeletonPost'
// import SkeletonPost from '../SkeletonPost'

// Gọi API trong useEffect()
// Nếu gọi thành công thì dispatch action type: "blog/getPostListSuccess"
// Nếu gọi thất bại thì dispatch action type: "blog/getPostListFailed"

// xxxxx: Dispatch action type "blog/getPostList"

export default function PostList() {

  // const dispatch = useDispatch()
  const dispatch = useAppDispatch()
  const postList = useSelector((state: RootState) => state.postList)
  const loading = useSelector((state: RootState) => state.loading)

  // cach 1
  // useEffect(() => {
  //   const controller = new AbortController()
  //   http.get('posts', {
  //     signal: controller.signal
  //   })
  //     .then((res) => {
  //       dispatch(getPostListSuccess(res.data))
  //     })
  //     .catch((err) => {
  //       if(err.code !== 'ERR_CODE') {
  //         dispatch({
  //           type: '/blog/getPostListFailed',
  //           payload: err
  //         })
  //       }
  //     })
  //     return () => {
  //       controller.abort()
  //     }
  // })

  useEffect(() => {
    const promise = dispatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

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
          {loading && (
            <Fragment>
              <SkeletonPost></SkeletonPost>
              <SkeletonPost></SkeletonPost>
            </Fragment>
          )}
          {!loading && postList && postList.map((post, index) => {
            return (
             <PostItem key={index} post={post}></PostItem>          
            )
          })}
         
        </div>
      </div>
    </div>
  )
}
