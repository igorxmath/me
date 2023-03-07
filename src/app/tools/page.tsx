import SearchCard from '@/components/Tools'
import { get } from '@vercel/edge-config'

export const dynamic = 'force-dynamic',
  runtime = 'experimental-edge'

export default async function SearchPage() {
  const suggestions: string[] = (await get('suggestions')) as string[]

  return <SearchCard suggestions={suggestions} />
}
