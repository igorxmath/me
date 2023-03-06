import { ChatGPTMessage, OpenAIStreamPayload } from '@/types/chat.types'
import { OpenAIStream } from '@/utils/OpenAIStream'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_ENDPOINT) {
    return new NextResponse('Server error', { status: 500 })
  }

  const { messages }: { messages: ChatGPTMessage[] } = await request.json()

  if (!messages || messages.length === 0) {
    return new NextResponse('No messages provided', { status: 400 })
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  }

  const stream = await OpenAIStream(payload)
  return new NextResponse(stream)
}
