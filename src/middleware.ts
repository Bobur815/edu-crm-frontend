import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt, roleToPanel } from '@/lib/api/auth';
import { ACCESS_COOKIE } from './lib/tokens';
import { JwtPayload } from './types';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Protected routes pattern that includes locale prefix
const PROTECTED = /^\/(?:en|uz|ru)\/(?:admin|teacher|student)(?:\/.*)?$/i;
const LOGIN_PATTERN = /^\/(?:en|uz|ru)\/login$/i;

// Create the intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get(ACCESS_COOKIE)?.value;

  // Handle login redirect when user is already authenticated
  if (LOGIN_PATTERN.test(pathname) && token) {
    const role = decodeJwt<JwtPayload>(token)?.role;
    const locale = pathname.split('/')[1]; // Extract locale from path
    return NextResponse.redirect(new URL(`/${locale}/${roleToPanel(role)}`, origin));
  }

  // Handle protected routes
  if (PROTECTED.test(pathname) && !token) {
    const locale = pathname.split('/')[1]; // Extract locale from path
    return NextResponse.redirect(new URL(`/${locale}/login`, origin));
  }

  // Apply internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
