import Image from 'next/image'
import styles from '@/styles/brands.module.css'

export default function SocialButton({
  href,
  brand,
  description,
}: {
  href: string
  brand: string
  description: string
}) {
  return (
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
  )
}
