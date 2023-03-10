import SearchCard from '@/components/Tools'
import { get } from '@vercel/edge-config'

export default async function SearchPage() {
  const suggestions: string[] = (await get('suggestions')) as string[]

  return <SearchCard suggestions={suggestions} />
}
