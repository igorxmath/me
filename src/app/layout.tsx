import '@/styles/globals.css'
import { AnalyticsWrapper } from '@/components/analytics'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const runtime = 'experimental-edge'

export const metadata: Metadata = {
  title: 'Igor Matheus',
  description: 'My personal website',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  category: 'profile',
  openGraph: {
    type: 'profile',
    siteName: 'Igor Matheus',
    url: 'https://igormatheus.com.br/',
    title: 'Igor Matheus',
    description: 'My personal website',
    images: [
      {
        url: 'https://igormatheus.com.br/favicon.svg',
        width: 800,
        height: 600,
        alt: 'Igor Matheus',
      },
    ],
    locale: 'pt-BR',
    countryName: 'Brazil',
    phoneNumbers: ['+55 85 9 9968 1736'],
    emails: ['pessoal@igormatheus.com.br'],
    firstName: 'Igor Matheus',
    lastName: 'Cruz de Oliveira',
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
