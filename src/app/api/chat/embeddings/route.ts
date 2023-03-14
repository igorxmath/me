import { OpenAIEmbedding } from '@/utils/openAI'
import { supabase } from '@/utils/supabase'
import { NextResponse } from 'next/server'
import { getAllPostsMeta, getPostBySlug } from '@/utils/posts'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (key !== process.env.API_ACCESS_KEY) {
    return new NextResponse('Not Authorized', { status: 401 })
  }

  const posts = await getAllPostsMeta()
  const documents: { post_id: string; title: string; content: string }[] = []

  for (const post of posts) {
    const { fileContent } = await getPostBySlug(post.slug as string)
    const regex = /^---\s[\s\S]*?\s---\n/
    const cleanText = fileContent.replace(regex, '')

    let start = 0
    while (start < cleanText.length) {
      const end = start + 3000
      const chunk = cleanText.slice(start, end)
      documents.push({ post_id: post.id, title: post.title, content: chunk })
      start = end
    }
  }

  for (const { post_id, title, content } of documents) {
    const input = content.replace(/\n/g, ' ')

    const embedding = await OpenAIEmbedding(input)
    const { error } = await supabase.from('documents').insert({
      post_id,
      title,
      content: input,
      embedding,
    })
    if (error) {
      return new NextResponse(error.message, { status: 500 })
    }
  }

  return new NextResponse('Done!')
}
