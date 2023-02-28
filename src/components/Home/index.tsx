import Image from 'next/image'
import type { Profile, Link } from '@/types/data.types'
import { Button } from '@ui/Button'

export default function Home({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      {/* {w-full lg:w-1/2} max-w-4xl */}
      <main className='flex w-full flex-1 flex-col items-center justify-center space-y-4 px-4 text-center sm:w-1/2 sm:px-8 md:px-16 lg:px-32 xl:px-64'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Image
            src={profile.avatar}
            className='rounded-full object-cover transition delay-100 ease-in-out hover:opacity-80'
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
              className='ml-2 inline-block transition delay-100 ease-in-out hover:opacity-80'
            />
          </h1>
          <p className='mt-3 text-base'>{profile.description}</p>
        </div>

        <div className='flex w-full flex-col items-center justify-center space-y-4'>
          {links.map((link) => (
            <div
              key={link.title}
              className='flex w-full flex-col items-center justify-center'
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
