import { compileMDX } from 'next-mdx-remote/rsc'

export default async function Content({ message }: { message: string }) {
  const { content } = await compileMDX<{ title: string }>({
    source: message,
    options: { parseFrontmatter: true },
  })
  return <article className='prose dark:prose-invert'>{content}</article>
}
