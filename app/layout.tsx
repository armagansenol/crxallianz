import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CITY'S RESIDENCES X ALLIANZ",
  description: "CITY’S RESIDENCES HAYATINA HOŞ GELDİNİZ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zao2pgo.css" />
      </head>
      <body className={`antialiased`} style={{ fontFamily: "Futura" }}>
        {children}
      </body>
    </html>
  )
}
