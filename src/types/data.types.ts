import { ButtonProps } from '@ui/Button'

export type Profile = {
  id: number
  name: string
  email: string
  description: string
  avatar: string
  links: Social[]
}

export type Social = {
  href: string
  brand: ButtonProps['brand']
  title: string
}
