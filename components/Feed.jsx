"use client"

import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"


const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className="mt-16 prompt_layout">
        {data.map(post=>(
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText]=useState("")
  const [posts,setPosts]=useState([])
  const handleChange=(e)=>{
    setSearchText(e.target.value)
  }

  useEffect(()=>{
    const fetchData=async()=>{
      const res=await fetch("/api/prompt")
      const data=await res.json()
      setPosts(data)
    }
    fetchData()
  },[])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or username" value={searchText} onChange={handleChange} className="search_input peer" />
      </form>
      <PromptCardList data={posts} handleTagClick={()=>{}}/>
    </section>
  )
}

export default Feed