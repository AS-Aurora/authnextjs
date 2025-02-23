import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

// This is the logic part
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
// This is the part that configures the middleware to run on specific routes
export const config = {
  matcher: ['/profile', '/', '/login', '/signup', '/verifyemail'],
}