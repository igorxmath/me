import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='sticky top-0 z-40 border-b border-b-zinc-700 bg-transparent backdrop-blur-sm backdrop-saturate-[250%] transition-all duration-150'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='align-center relative flex flex-row justify-between'>
          <div className='flex flex-1 items-center'>
            <Link
              href={'/blog'}
              as={'/blog'}
            >
              <Image
                src={'/favicon.svg'}
                alt={'ACME'}
                className='cursor-pointer hover:opacity-90'
                width={50}
                height={50}
              />
            </Link>
            <nav className='flex flex-1 justify-end space-x-8'>
              <Link
                href={'/'}
                as={'/'}
                className='inline-flex cursor-pointer items-center rounded-md p-1 font-medium leading-6 transition duration-75 ease-in-out'
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  )
}
