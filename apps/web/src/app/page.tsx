"use client"

import Loader from "@/components/Loader/Loader"
import OnBoarding from "@/components/OnBoarding/OnBoarding"
import { useEffect, useState } from "react"

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [showOnBoarding, setShowOnBoarding] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 250)

    const onBoardingDone = localStorage.getItem('onBoardingDone')
    setShowOnBoarding(!onBoardingDone)
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('onBoardingDone', 'true')
    setShowOnBoarding(false)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      {showOnBoarding ? (
        <OnBoarding onBoardingComplete={handleOnboardingComplete} />
      ) : (
        <>
        <h1>Home</h1>
        </>
      )}
    </div>
  )
}
