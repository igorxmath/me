import { getAllPostsMeta } from '@/utils/posts'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getAllPostsMeta()

  return (
    <div className='mx-5 mb-20 max-w-screen-xl lg:mx-24 2xl:mx-auto'>
      <h2 className='my-10 text-4xl font-bold md:text-5xl'>Latest</h2>
      <div className='grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3'>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
          >
            <div className='ease overflow-hidden rounded-2xl border-2 border-zinc-700 bg-zinc-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-white'>
              <Image
                className='h-64 w-full object-cover'
                src={post.thumbnail}
                alt={post.title}
                width={500}
                height={400}
                loading='lazy'
              />
              <div className='h-36 border-t border-zinc-700 py-8 px-5'>
                <h3 className='text-xl tracking-wide'>{post.title}</h3>
                <p className='text-md my-2 truncate italic'>{post.description}</p>
                <p className='my-2 text-sm'>Published {post.publishDate}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
