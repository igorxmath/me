import Image from 'next/image'
import type { Profile, Link } from '@/types/data.types'
import { Button } from '@ui/Button'

export default function Home({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {/* {w-full lg:w-1/2} max-w-4xl */}
      <main className='flex flex-col items-center justify-center w-full sm:w-1/2 flex-1 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 text-center space-y-4'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Image
            src={profile.avatar}
            className='rounded-full object-cover hover:opacity-80 transition ease-in-out delay-100'
            alt={profile.name}
            width={128}
            height={128}
            style={{ width: 128, height: 128 }}
          />
          <h1 className='text-4xl font-bold'>
            {profile.name}
            <Image
              src='/icons/check-badge.svg'
              alt='Check'
              width={25}
              height={25}
              className='inline-block ml-2 hover:opacity-80 transition ease-in-out delay-100'
            />
          </h1>
          <p className='mt-3 text-base'>{profile.description}</p>
        </div>

        <div className='flex flex-col items-center justify-center w-full space-y-4'>
          {links.map((link) => (
            <div
              key={link.title}
              className='flex flex-col items-center justify-center w-full'
            >
              <a
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='w-full'
              >
                <Button
                  size='large'
                  fullWidth
                  brand={link.brand}
                >
                  <div className='flex items-center justify-center'>
                    <Image
                      src={`/icons/${link.brand}.svg`}
                      className='mr-2'
                      alt={link.title}
                      width={20}
                      height={20}
                      style={{ width: 20, height: 20 }}
                    />
                    {link.title}
                  </div>
                </Button>
              </a>
            </div>
          ))}
        </div>
        <footer>
          <a
            href={`mailto:${profile.email}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {profile.email}
          </a>
        </footer>
      </main>
    </div>
  )
}
