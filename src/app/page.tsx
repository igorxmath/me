import { get } from '@vercel/edge-config'
import { notFound } from 'next/navigation'
import Home from '@/components/Home'
import type { Profile, Link } from '@/types/data.types'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const profile = (await get('data')) as Profile
  if (!profile) notFound()

  const { links }: { links: Link[] } = profile

  return (
    <Home
      profile={profile}
      links={links}
    />
  )
}
