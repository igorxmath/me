import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return new NextResponse('Hello world')
}
