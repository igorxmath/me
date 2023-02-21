import Image from 'next/image'
import styles from '@/styles/brands.module.css'
import type { Link } from '@/types/link.types'

export default function SocialButton({ href, brand, description }: Link) {
  return (
    <div className={styles.link}>
      <a
        href={href}
        className={styles[brand]}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Image
          src={`/icons/${brand}.svg`}
          alt={brand}
          className={styles.icon}
          width={20}
          height={20}
          priority
        />
        {description}
      </a>
    </div>
  )
}
