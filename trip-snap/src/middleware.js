'use client'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {
  const accessToken = cookies().get('access-token')
  if (request.nextUrl.pathname === '/') {
    if (!!accessToken) {
      return NextResponse.redirect(new URL('/home', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (
    ['/find', '/join', '/login'].filter((path) =>
      request.nextUrl.pathname.startsWith(path)
    ).length > 0
  ) {
    if (!!accessToken) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  } else {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
