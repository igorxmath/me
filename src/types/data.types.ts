export type Profile = {
  id: number
  name: string
  email: string
  description: string
  avatar: string
  links: Link[]
}

export type Link = {
  href: string
  brand: string
  title: string
}
