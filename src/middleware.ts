import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intl = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const cookie = req.cookies.get('educrm_access')?.value;

  // Let "/" be handled by app/page.tsx (it will redirect to /<defaultLocale>)
  // So no redirect here for "/"

  // Protect app area: add routes you want guarded
  const localePattern = `(${routing.locales.join('|')})`;
  const protectedPattern = new RegExp(`^/${localePattern}/(students|teachers|courses|groups|branches)(/.*)?$`, 'i');

  if (protectedPattern.test(pathname) && !cookie) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, url));
  }

  return intl(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
