import { getAllPostsMeta, getPostBySlug } from '@/utils/posts'
import Image from 'next/image'

type Params = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params: { slug } }: Params) {
  const post = await getPostBySlug(slug)
  return {
    title: post.meta?.title,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPostsMeta()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params: { slug } }: Params) {
  const post = await getPostBySlug(slug)

  return (
    <section>
      <div className='mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl'>
          <h1 className='mb-4 text-4xl font-bold'>{post.meta.title}</h1>
          <p className='mb-4 text-zinc-300'>Published on {post.meta.publishDate}</p>
          <Image
            src={post.meta.thumbnail}
            alt={post.meta.title}
            className='mb-8 rounded-lg shadow-lg'
            width={800}
            height={400}
            priority={true}
          />
          <article className='prose dark:prose-invert'>{post.content}</article>
        </div>
      </div>
    </section>
  )
}
