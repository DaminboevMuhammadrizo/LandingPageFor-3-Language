import { NextRequest, NextResponse } from 'next/server';

const locales = ['uz', 'ru', 'en'];
const defaultLocale = 'uz';

export function middleware(request: NextRequest) {
  // Path dan locale ni tekshirish
  const { pathname } = request.nextUrl;

  // Agar path locale bilan boshlanmasa, default locale ga yo'naltirish
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Agar foydalanuvchi root path ga kirsa, default locale ga yo'naltirish
    if (pathname === '/') {
      return NextResponse.redirect(
        new URL(`/${defaultLocale}`, request.url)
      );
    }

    // Boshqa barcha path lar uchun default locale qo'shish
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    /*
     * Quyidagi path lardan tashqari barcha path larni match qilish:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
