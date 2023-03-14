import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { ChatGPTRequest, ModerationResponse } from '@/types/chat.types'

export async function OpenAIModeration(input: string | string[]) {
  const res = await fetch(`${process.env.OPENAI_ENDPOINT}/moderations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ input }),
  })

  const moderation: ModerationResponse = await res.json()

  const isFlagged = moderation.results.some((result) => result.flagged)
  return isFlagged
}

export async function OpenAIEmbedding(input: string | string[]) {
  const embeddingResponse = await fetch(`${process.env.OPENAI_ENDPOINT}/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: 'text-embedding-ada-002', input }),
  })
  const embeddingData = await embeddingResponse.json()
  const [{ embedding }] = embeddingData.data

  return embedding
}

export async function OpenAIStream(payload: ChatGPTRequest) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch(`${process.env.OPENAI_ENDPOINT}/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (res.status !== 200) {
    throw new Error('OpenAI API returned an error')
  }

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data

          if (data === '[DONE]') {
            controller.close()
            return
          }

          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
