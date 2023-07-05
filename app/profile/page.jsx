"use client"

import {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Profile from '@components/Profile'

const MyProfile = () => {
  const router=useRouter()
    const {data:session}=useSession()
    const [posts,setPosts]=useState([])
    useEffect(()=>{
      const fetchPosts=async()=>{
        const res=await fetch(`/api/users/${session?.user.id}/posts`)
        const data=await res.json()
        console.log(data)
        setPosts(data)
      }
      if(session?.user.id) fetchPosts()
    },[])
    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete=async(post)=>{
      const hasConfiremed=confirm("are u sure u want to delete this prompt")
      if(hasConfiremed){
        try {
          await fetch(`/api/prompt/${post._id}`,{method:"DELETE"})
          const filterPosts=posts.filter(p=>p._id!==post._id)
          setPosts(filterPosts)
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <>
      <Profile 
        name="my"
        desc="welcome tp your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    </>
  )
}

export default MyProfile