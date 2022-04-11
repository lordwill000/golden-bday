import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware (req) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://')
  })

  if (!session) return NextResponse.rewrite(new URL('/api/auth/signin', req.url))
}
