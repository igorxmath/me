import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'
import { OpenAIModeration, OpenAIStream } from '@/utils/OpenAIStream'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_ENDPOINT) {
    return new NextResponse('Server error', { status: 500 })
  }

  const { messages }: { messages: ChatGPTMessage[] } = await request.json()
  if (!messages || messages.length === 0) {
    return new NextResponse('No messages provided', { status: 400 })
  }

  const isFlagged = await OpenAIModeration(messages)
  if (isFlagged) {
    return new NextResponse('Message rejected', { status: 400 })
  }

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  }

  const stream = await OpenAIStream(payload)

  return new NextResponse(stream)
}
