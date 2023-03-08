import { NextResponse } from 'next/server'
import { OpenAIStream } from '@/utils/OpenAIStream'
import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'

export const runtime = 'edge'

export async function POST(request: Request) {
  const { messages }: { messages: ChatGPTMessage[] } = await request.json()

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  }

  const stream = await OpenAIStream(payload)

  return new NextResponse(stream)
}
