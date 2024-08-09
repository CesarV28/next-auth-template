import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authConfig from "@/auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)

import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_LOGIN_URL
} from '@/routes';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggeIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if( isApiAuthRoute ) {
        return
    }

    if( isAuthRoute ) {
        if( isLoggeIn ) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if(!isLoggeIn && !isPublicRoute ) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_URL, nextUrl))
    }

    return
})

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     // return NextResponse.redirect(new URL('/home', request.url))
// }


// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}