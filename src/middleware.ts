import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();
  
  // Add security headers to help with QUIC protocol and COOP issues
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  
  // Disable HTTP/3 (QUIC) for certain paths if needed
  if (request.nextUrl.pathname.startsWith('/_next/static') ||
      request.nextUrl.pathname.includes('api.js')) {
    response.headers.set('Alt-Svc', '');  // Disable HTTP/3 negotiation
  }
  
  return response;
}

export const config = {
  matcher: [
    // Match all request paths except for the ones we don't want to run middleware on
    // Also exclude webpack-hmr WebSocket path to avoid interfering with HMR
    '/((?!api/|_next/static|_next/image|favicon.ico|_next/webpack-hmr).*)',
  ],
};
