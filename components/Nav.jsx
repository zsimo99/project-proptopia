"use client"

import Link from "next/link"
import Image from "next/image"
import { useState,useEffect } from "react"
import {signIn,signOut,useSession,getProviders} from "next-auth/react"

const Nav = () => {
  const {data:session}=useSession()

  const [providers,setProviders]=useState(null)
  const [toggleDropDown,setToggledropDown]=useState(false)
  useEffect(()=>{
    const setUpProviders=async()=>{
      const res=await getProviders()
      setProviders(res)
    }
    setUpProviders()
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center" >
        <Image src="/assets/images/logo.svg" alt="promptopia-logo" className="object-contain" width={30} height={30}/>
        <span className="logo_text">Promptobia</span>
      </Link>
      {/* desktop navigation  */}
      <div className="hidden sm:flex">
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">Create Post</Link>
          <button onClick={()=>signOut()} className="outline_btn">Sign Out</button>
          <Link href="/profile" >
            <Image src={session?.user.image} className="rounded-full" alt="profile" width={37} height={37}/>
          </Link>
        </div> 
        ) : (
        <>
          {providers && Object.values(providers).map(provider=>(
            <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className="black_btn">Sign In</button>
          ))}
        </>)}
      </div>
      {/* mobile navigation  */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user.image} className="rounded-full" alt="profile" width={37} height={37} onClick={()=>{setToggledropDown((prev)=>!prev)}}/>
            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={()=>setToggledropDown(false)}>My Profile</Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={()=>setToggledropDown(false)}>Create Prompt</Link>
                <button className="mt-4 w-full black_btn" type="button" onClick={()=>{
                  setToggledropDown(false)
                  signOut()
                }}>Sign Out</button>
              </div>
            )}
          </div>
        ):
        (
          <>
            {providers && Object.values(providers).map(provider=>(
              <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className="black_btn">Sign In</button>
            ))}
          </>)}
      </div>
    </nav>
  )
}

export default Nav