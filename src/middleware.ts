import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('token')?.value || ''
  const sessionToken = request.cookies.get('next-auth.session-token')?.value || ''
  // console.log(sessionToken) 

  if (isPublicPath && (token || sessionToken)) {
    // If the user is on a public path and has a token, redirect to /profile
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if (!isPublicPath && (!token || !sessionToken)) {
    // If the user is on a non-public path and doesn't have both tokens, redirect to /login
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // If none of the above conditions are met, allow the request to proceed
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/',
    // '/profile/:path*',
    // '/login',
    // '/signup',
  ]
}
// export {default} from 'next-auth/middleware'