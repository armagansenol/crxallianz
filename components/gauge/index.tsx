"use client"

import { useGSAP } from "@gsap/react"
import NumberFlow from "@number-flow/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export interface GaugeProps {
  value?: number // 0 to 100
  duration?: number // animation duration in ms
}

// Helper function to animate number from 0 to target in specified parts
const animateNumber = (
  targetValue: number,
  onUpdate: (value: number) => void,
  parts: number = 6,
  delay: number = 150
) => {
  onUpdate(0)

  for (let i = 1; i <= parts; i++) {
    const progress = i / parts
    const currentValue = Math.floor(targetValue * progress)

    setTimeout(() => onUpdate(currentValue), delay * i)
  }
}

export function Gauge({ value = 50 }: GaugeProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [strokeDasharray, setStrokeDasharray] = useState(0)
  const [strokeDashoffset, setStrokeDashoffset] = useState(0)
  const [displayValue, setDisplayValue] = useState(0)

  useGSAP(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none pause",
        once: true,
        onEnter: () => {
          // Animate number
          animateNumber(value, setDisplayValue)

          // Animate SVG circle fill independently
          if (pathRef.current) {
            const pathLength = pathRef.current.getTotalLength()
            gsap.to(pathRef.current, {
              strokeDashoffset: pathLength - (pathLength * value) / 100,
              duration: 4,
              ease: "expo.out",
            })
          }
        },
      },
    })
  }, [value])

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength()
      setStrokeDasharray(pathLength)
      setStrokeDashoffset(pathLength) // Start with empty circle
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2">
      <div className="relative w-92 h-92">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <span className="relative text-7xl text-[var(--bricky-brick)] font-medium">
            <span className="text-5xl absolute bottom-2.5 left-0 -translate-x-full">%</span>
            <span>
              <NumberFlow
                value={displayValue}
                trend={1}
                format={{ notation: "compact" }}
                transformTiming={{
                  duration: 500,
                  easing: "ease-out",
                }}
                spinTiming={{ duration: 2000, easing: "ease-out" }}
                opacityTiming={{ duration: 1000, easing: "ease-out" }}
              />
            </span>
            <span className="text-4xl absolute top-0 right-0 translate-x-1/2">*</span>
          </span>
        </span>
        <svg
          style={{ transform: "rotate(95deg)" }}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          fill="none"
          color="#B73D25"
        >
          <defs>
            <linearGradient id="spinner-secondHalf">
              <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
              <stop offset="50%" stopOpacity="0.3" stopColor="currentColor" />
            </linearGradient>
            <linearGradient id="spinner-firstHalf" x1="0%" y1="0%" x2="45%" y2="120%">
              <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
              <stop offset="100%" stopOpacity="0.2" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <g strokeWidth="14">
            <path
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeLinecap="round"
              d="M 180 100 A 80 80 0 1 1 20 100 A 80 80 0 1 1 180 100"
            />
            <path
              ref={pathRef}
              stroke="url(#spinner-firstHalf)"
              strokeLinecap="round"
              d="M 180 100 A 80 80 0 1 1 20 100 A 80 80 0 1 1 180 100"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            />
          </g>
        </svg>
      </div>
      <span className="block text-2xl text-center">
        *İlk %<span>{value}</span> Rezerve Edildi
      </span>
    </div>
  )
}
