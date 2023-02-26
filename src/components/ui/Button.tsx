import { cva, type VariantProps } from 'class-variance-authority'

export const buttonStyles = cva(
  'font-bold rounded-md hover:opacity-80 transition ease-in-out delay-100',
  {
    variants: {
      brand: {
        default: 'bg-zinc-900',
        github: 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-900',
        linkedin: 'bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900',
        twitter: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
        instagram: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
        whatsapp: 'bg-gradient-to-r from-green-500 via-green-600 to-green-700',
        telegram: 'bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800',
        youtube: 'bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-900',
        twitch: 'bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900',
        discord: 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700',
        spotify: 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800',
        soundcloud: 'bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800',
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        small: ['text-sm', 'px-8', 'py-1'],
        medium: ['text-base', 'px-10', 'py-2'],
        large: ['text-lg', 'px-12', 'py-3'],
      },
    },
    defaultVariants: {
      brand: 'default',
      size: 'medium',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export function Button({ children, brand, size, fullWidth, ...props }: ButtonProps) {
  return (
    <button
      className={buttonStyles({ brand, size, fullWidth })}
      {...props}
    >
      {children}
    </button>
  )
}
