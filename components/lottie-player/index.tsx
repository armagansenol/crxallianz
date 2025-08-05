"use client"

import Lottie from "lottie-react"

interface LottiePlayerProps {
  animationData: unknown
}

export function LottiePlayer({ animationData }: LottiePlayerProps) {
  return (
    <div className="w-96 h-96">
      <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
