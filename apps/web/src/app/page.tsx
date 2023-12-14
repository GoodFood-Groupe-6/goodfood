"use client"

import Loader from "@/components/Loader/Loader"
import { useState, useEffect } from "react"

export default function Home() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 250)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
