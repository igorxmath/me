import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'
import { OpenAIModeration, OpenAIStream } from '@/utils/openAI'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_ENDPOINT) {
    return new NextResponse('Server error', { status: 500 })
  }

  const { query }: { query: ChatGPTMessage['content'] } = await request.json()
  if (!query) {
    return new NextResponse('No query provided', { status: 400 })
  }

  const isFlagged = await OpenAIModeration(query)
  if (isFlagged) {
    return new NextResponse('Message rejected', { status: 400 })
  }

  const messages: ChatGPTMessage[] = [
    {
      role: 'user',
      content: query,
    },
  ]

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo-0301',
    messages,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)

  return new NextResponse(stream)
}
