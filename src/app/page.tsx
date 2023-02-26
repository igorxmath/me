import Image from 'next/image'
import { get } from '@vercel/edge-config'
import { notFound } from 'next/navigation'
import styles from '@/styles/page.module.css'
import SocialButton from '@/components/socialButton'
import type { Profile, Link } from '@/types/data.types'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const profile = (await get('data')) as Profile
  if (!profile) notFound()

  const { links }: { links: Link[] } = profile

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.column}>
          <Image
            src={profile.avatar || '/avatar.png'}
            alt='Logo'
            className={styles.avatar}
            width={128}
            height={128}
            priority
          />

          <h1 className={styles.name}>
            {profile.name}
            <Image
              src='/icons/check-badge.svg'
              alt='Check'
              width={25}
              height={25}
              className={styles.check}
            />
          </h1>

          <p className={styles.description}>{profile.description}</p>
          {links.map((link) => (
            <SocialButton
              key={link.href}
              {...link}
            />
          ))}
        </div>
        <p>
          <a
            className={styles.mailto}
            href={'mailto:' + profile.email}
          >
            {profile.email}
          </a>
        </p>
      </div>
    </main>
  )
}
