import { ContactForm } from "@/components/form-contact"
import { IconAllianz, Logo } from "@/components/icons"
import { Video } from "@/components/utility/video"
import { colors } from "@/styles/config.mjs"

export default function Home() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between py-4 px-8 absolute top-0 left-0 right-0 z-50 bg-white">
        <div className="w-28 h-28">
          <Logo fill={colors["bricky-brick"]} />
        </div>
        <div className="w-10 h-10">X</div>
        <div className="h-4">
          <IconAllianz />
        </div>
      </div>
      <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden">
        <Video
          primaryVideoUrl={
            "https://player.vimeo.com/progressive_redirect/playback/1096833227/rendition/1080p/file.mp4?loc=external&log_user=0&signature=e0ad4624c50728e0a3625c1c69c5f6a1459202f6b91fae8b5678201fd7181b5d"
          }
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </section>
      <ContactForm />
    </div>
  )
}
