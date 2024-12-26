import React from 'react'
import { Post } from '../../../types/blog.type'


interface Props {
    item: Post
    onDeletePost: (id: string) => void
    onEditPost: (id: string) => void
}

const PostItem = ({ item, onDeletePost, onEditPost }: Props) => {
    return (
        <div className='flex flex-col items-center overflow-hidden rounded-lg border md:flex-row'>
            <div className='group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48'>
                <img
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
                    src={item.featuredImage}
                />
            </div>
            <div className='flex flex-col gap-2 p-4 lg:p-6'>
                <span className='text-sm text-gray-400'>{item.publishDate}</span>
                <h2 className='text-xl font-bold text-gray-800'>{item.title}</h2>
                <p className='text-gray-500'>{item.description}</p>
                <div>
                    <div className='inline-flex rounded-md shadow-sm' role='group'>
                        <button
                            type='button'
                            className='rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
                            onClick={() => onEditPost(item.id)}
                        >
                            Edit
                        </button>
                        <button
                            type='button'
                            className='rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
                            onClick={() => onDeletePost(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem