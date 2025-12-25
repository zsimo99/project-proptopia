"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard 
          key={post._id} 
          post={post} 
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])
  const [loading, setLoading] = useState(true)

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i")
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await fetch("/api/prompt")
      const data = await res.json()
      setAllPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, username, or content"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
        {searchText && (
          <button
            type="button"
            onClick={() => {
              setSearchText("")
              setSearchedResults([])
            }}
            className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {loading ? (
        <div className="mt-16 text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-500">Loading prompts...</p>
        </div>
      ) : (
        <>
          {searchText ? (
            searchedResults.length > 0 ? (
              <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
            ) : (
              <div className="mt-16 text-center py-10">
                <p className="text-gray-500">No results found for "{searchText}"</p>
              </div>
            )
          ) : (
            <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
          )}
        </>
      )}
    </section>
  )
}

export default Feed