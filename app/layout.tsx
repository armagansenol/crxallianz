import "./globals.css"

export async function generateMetadata() {
  return {
    title: "City's Residences X Allianz",
    description: "City's Residences Hayatına Hoş Geldiniz",
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        { url: "/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  }
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
