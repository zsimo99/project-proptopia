"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setUpProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg" 
          alt="promptopia-logo" 
          className="object-contain" 
          width={32} 
          height={32}
        />
        <span className="logo_text">Promptopia</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 items-center">
            <Link href="/create-prompt" className="black_btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Post
            </Link>
            <button onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image 
                src={session?.user.image} 
                className="rounded-full ring-2 ring-gray-100 hover:ring-orange-300 transition-all duration-300" 
                alt="profile" 
                width={40} 
                height={40}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map(provider => (
              <button 
                type="button" 
                key={provider.name} 
                onClick={() => signIn(provider.id)} 
                className="black_btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image} 
              className="rounded-full ring-2 ring-gray-100 cursor-pointer" 
              alt="profile" 
              width={40} 
              height={40} 
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown animate-fadeIn">
                <Link 
                  href="/profile" 
                  className="dropdown_link" 
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  href="/create-prompt" 
                  className="dropdown_link" 
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button 
                  className="mt-4 w-full black_btn" 
                  type="button" 
                  onClick={() => {
                    setToggleDropDown(false)
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map(provider => (
              <button 
                type="button" 
                key={provider.name} 
                onClick={() => signIn(provider.id)} 
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav