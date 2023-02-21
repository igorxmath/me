import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/page.module.css'
import SocialButton from '@/components/socialButton'

const inter = Inter({ subsets: ['latin'] })

type Link = {
  href: string
  brand: string
  description: string
}

async function getLinks(): Promise<Link[]> {
  const res = await fetch(process.env.LINKS_URL as string, { next: { revalidate: 10 * 60 } })
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  const links = await res.json()
  return links
}

export default async function Home() {
  const links = await getLinks()

  return (
    <main className={inter.className}>
      <div className={styles.container}>
        <div className={styles.column}>
          <Image
            src='/memoji.png'
            alt='Logo'
            className={styles.avatar}
            width={128}
            height={128}
            priority
          />

          <h1 className={styles.title}>Igor Matheus</h1>

          <p className={styles.description}>
            Aqui é um lugar onde você pode conectar-se comigo! Sou estudante de programação e
            infraestrutura, amo jogos competitivos e hardware.
          </p>
          <div className={styles.links}>
            {links.map(({ href, brand, description }) => (
              <>
                <SocialButton
                  key={brand}
                  href={href}
                  brand={brand}
                  description={description}
                />
                <br />
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
