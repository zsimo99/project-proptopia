"use client"

import { useState } from 'react'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState("")

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000);
  }

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile")
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  return (
    <div className='prompt_card group'>
      <div className='flex justify-between items-start gap-5'>
        <div 
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image 
            src={post.creator.image} 
            alt='user_image' 
            width={44} 
            height={44} 
            className='rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-orange-200 transition-all duration-300'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            alt='copy' 
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} 
            width={14} 
            height={14}
            className={copied === post.prompt ? "opacity-100" : "opacity-60 hover:opacity-100 transition-opacity"}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700 leading-relaxed'>{post.prompt}</p>
      
      <p 
        className='font-inter text-sm font-medium text-orange-500 hover:text-orange-600 cursor-pointer transition-colors duration-200 inline-block' 
        onClick={() => { handleTagClick && handleTagClick(post.tag) }}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
          <button 
            className='font-inter text-sm font-medium text-green-500 hover:text-green-600 transition-colors duration-200 flex items-center gap-1' 
            onClick={handleEdit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Edit
          </button>
          <button 
            className='font-inter text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200 flex items-center gap-1' 
            onClick={handleDelete}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default PromptCard