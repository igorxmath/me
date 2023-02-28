import '@/styles/globals.css'
import { AnalyticsWrapper } from '@/components/analytics'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'My personal website',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className={inter.className}
    >
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
