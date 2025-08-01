import { forwardRef } from "react"

import { cn } from "@/lib/utils"

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  className?: string
  primaryVideoUrl: string
  primaryVideoType?: string
  secondaryVideoUrl?: string
  secondaryVideoType?: string
}

const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  const {
    className,
    primaryVideoUrl,
    primaryVideoType = "video/mp4",
    secondaryVideoUrl,
    secondaryVideoType = "video/mp4",
    poster,
    ...rest
  } = props

  const primaryVideoSource = primaryVideoUrl && <source src={primaryVideoUrl} type={primaryVideoType} />
  const secondaryVideoSource = secondaryVideoUrl && <source src={secondaryVideoUrl} type={secondaryVideoType} />

  return (
    <video
      ref={ref}
      className={cn("w-full h-full block object-cover", className)}
      poster={poster}
      aria-hidden
      disableRemotePlayback
      {...rest}
    >
      {primaryVideoSource}
      {secondaryVideoSource}
    </video>
  )
})

Video.displayName = "Video"

export { Video }
