"use client"

import Form from "@components/Form"
import { useState, useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

const UpdatePromptContent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "", tag: ""
    })
    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!promptId) return alert("prompt ID not found")
        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH", body: JSON.stringify(post)
            })
            if (res.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost(data)
        }
        if (promptId) fetchData()
    }, [promptId])
    return (
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    )
}

const UpdatePromptPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePromptContent />
        </Suspense>
    )
}

export default UpdatePromptPage