import { NextResponse } from 'next/server'
import { OpenAIStream } from '@/utils/OpenAIStream'
import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'

export const runtime = 'edge'

export async function GET() {
  const messages: ChatGPTMessage[] = [
    { role: 'user', content: 'Who won the world series in 2020?' },
  ]

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  }

  const stream = await OpenAIStream(payload)

  return new NextResponse(stream)
}
