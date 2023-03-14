import { ChatGPTMessage, ChatGPTRequest } from '@/types/chat.types'
import { OpenAIModeration, OpenAIEmbedding, OpenAIStream } from '@/utils/openAI'
import { NextResponse } from 'next/server'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { supabase } from '@/utils/supabase'

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

  const embedding = await OpenAIEmbedding(query)
  const { data: documents, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    similarity_threshold: 0.78,
    match_count: 10,
  })
  if (error) {
    return new NextResponse('Server error', { status: 500 })
  }
  if (documents.length === 0) {
    return new NextResponse('No context found', { status: 404 })
  }

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
  let tokenCount = 0
  let contextText = ''
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i]
    const content = document.content
    const encoded = tokenizer.encode(content)
    tokenCount += encoded.text.length
    if (tokenCount > 1500) {
      break
    }
    contextText += `${content.trim()}\n---\n`
  }

  const systemContent = `You are a helpful nutrition assistant. When given CONTEXT you answer questions using only that information. If you are unsure and the answer is not explicitly written in the CONTEXT provided, you just only say "Sorry, I don't know how to help with that."`

  const userMessage = `CONTEXT:
  ${contextText}
  
  USER QUESTION: 
  ${query}  
  `

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: systemContent,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ]

  const payload: ChatGPTRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 2000,
    stream: true,
  }

  const stream = await OpenAIStream(payload)

  return new NextResponse(stream)
}
