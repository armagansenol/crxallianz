import { ContactForm } from "@/components/form-contact"
import { IconAllianz, IconCoil, IconCollab, IconGift, IconTrophy, Logo } from "@/components/icons"
import { Video } from "@/components/utility/video"
import { colors } from "@/styles/config.mjs"
import { ChevronDown } from "lucide-react"

export default function Home() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between py-3 px-10 absolute top-0 left-0 right-0 z-50 bg-white/80 ">
        <div className="w-28">
          <Logo fill={colors["bricky-brick"]} />
        </div>
        <div className="w-28">
          <IconAllianz />
        </div>
        <div className="w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-light">
          <IconCollab />
        </div>
      </div>
      <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden">
        <Video
          primaryVideoUrl={
            "https://batterseapowerstation.co.uk/content/uploads/2024/03/bps_uber_boat_clips_final-1080p.mp4"
          }
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50">
          <div className="flex items-center justify-center h-full">
            <h1
              className="text-center text-white text-4xl font-medium leading-normal tracking-wider"
              style={{ fontFamily: "Futura" }}
            >
              CITY’S RESIDENCES <br /> HAYATINA <br /> HOŞ GELDİNİZ
            </h1>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-white text-sm font-light">Keşfetmek için kaydırın</span>
            <ChevronDown className="w-6 h-6 text-white/50" />
          </div>
        </div>
      </section>
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-6 relative">
                <IconGift />
              </div>
              <h3 className="text-black text-4xl leading-snug font-bold">
                Özel <br />
                Komşu İndirimi
              </h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-8 relative">
                <IconTrophy />
              </div>
              <h3 className="text-black text-4xl leading-snug font-bold">
                Öncelikli Daire <br />
                Seçme Fırsatı
              </h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-auto mb-8 relative">
                <IconCoil />
              </div>
              <h3 className="text-black text-4xl leading-snug font-bold">
                Komşumuza <br />
                Ödeme Planlarında <br />
                Ekstra Esneklik
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 mb-5">
        <p className="text-left text-black text-lg font-regular">
          Ekibimizin sizinle iletişime geçebilmesi için lütfen aşağıdaki kayıt formunu doldurunuz.
        </p>
      </section>
      <section className="mb-12">
        <ContactForm />
      </section>
      <div className="mx-4 py-4 text-black text-sm font-regular border-t border-b-slate-300">
        2025 © City’s İstanbul Residences - Tüm hakları saklıdır.
      </div>
    </div>
  )
}
