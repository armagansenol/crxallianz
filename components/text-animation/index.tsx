"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useRef, ReactNode } from "react"

// Register SplitText plugin
gsap.registerPlugin(SplitText)

interface SplitTextElement extends HTMLDivElement {
  isSplit?: boolean
}

export interface TextAnimationProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function TextAnimation(props: TextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<SplitTextElement>(null)

  useGSAP(
    () => {
      if (!textRef.current) return

      // Create split text instance
      const splitText = new SplitText(textRef.current, {
        type: "chars, words",
        charsClass: "char",
      })

      const chars = splitText.chars

      // Animate from transformed state to normal
      gsap.from(chars, {
        duration: 2,
        opacity: 0,
        scale: 0.5,
        y: 10,
        rotationX: -135,
        transformOrigin: "0% -50% 50",
        ease: "back",
        stagger: 0.005,
        onComplete: () => {
          splitText.revert()
        },
      })

      // Cleanup function
      return () => {
        splitText.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={props.className || ""} style={props.style}>
      <div
        ref={textRef}
        style={{
          display: "inline-block",
          willChange: "transform",
          opacity: 1,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
