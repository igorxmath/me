import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

type PostMeta = {
  id: string
  title: string
  author: string
  description: string
  thumbnail: string
  publishDate: string
  slug?: string
}

type Post = {
  meta: PostMeta
  content: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
  fileContent: string
}

const rootDirectory = path.join(process.cwd(), 'src', 'posts')

export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { frontmatter, content }: { frontmatter: PostMeta; content: Post['content'] } =
    await compileMDX({
      source: fileContent,
      options: { parseFrontmatter: true },
    })

  return { meta: { ...frontmatter, slug: realSlug }, content, fileContent }
}

export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(rootDirectory)

  const posts: PostMeta[] = []

  for (const file of files) {
    const { meta } = await getPostBySlug(file)
    posts.push(meta as PostMeta)
  }

  return posts
}
