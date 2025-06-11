import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"
import { LanguageProvider } from "@/contexts/language-context"

// import { Nunito } from 'next/font/google' // Or Poppins

// const nunito = Nunito({ // Or poppins
//   subsets: ["latin"],
//   display: 'swap',
//   variable: '--font-nunito', // Or --font-poppins
//   weight: ["300", "400", "500", "600", "700", "800"],
// })

import { Outfit } from "next/font/google"

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ssello - Expand into LATAM with one click",
  description: "The complete e-commerce solution for ambitious brands. Expand your reach across 15+ marketplaces, manage operations seamlessly, and accelerate growth in Latin America's fastest-growing markets.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-background text-foreground ${outfit.className}`}>
        <LanguageProvider>
          <LandingHeader />
          <main>{children}</main>
          <LandingFooter />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
