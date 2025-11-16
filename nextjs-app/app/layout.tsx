import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import TheFooter from '@/components/TheFooter'
import '@/styles/main.scss'
import '@/public/fonts/fonts.css'

export const metadata: Metadata = {
  title: 'Pavel Buramensky',
  description: 'Creative front-end developer who cares about user experience and tries to make the world a better place',
  metadataBase: new URL('https://paulbu.com'),
  formatDetection: {
    telephone: false
  },
  robots: 'all',
  openGraph: {
    type: 'website',
    siteName: 'My personal page',
    url: 'https://paulbu.com',
    title: "Hi! I'm Pavel Buramensky and that's my page",
    description: "I'm front-end developer who cares about user experience and tries to make the world a better place",
    images: [
      {
        url: 'https://paulbu.com/pics/portrait-1-og.jpg',
        width: 968,
        height: 504
      }
    ],
    locale: 'en'
  },
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <ThemeProvider>
          <section className="main-content">
            {children}
          </section>
          <TheFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
