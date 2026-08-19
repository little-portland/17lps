import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PRIVATE_ROUTES = [
  '/access',
  '/test',
  '/nocturn-test',
  '/projects',
  '/thetent-test',
  '/theclub-test',
  '/studio-test',
  '/thetentradio',
  '/concept',
  '/concept-v2',
  '/dining-test',
  '/chefstudio-test',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPrivatePage = PRIVATE_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  // Everything not in the list remains public
  if (!isPrivatePage) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');

  if (authHeader?.startsWith('Basic ')) {
    try {
      const encodedCredentials = authHeader.substring(6);
      const decodedCredentials = atob(encodedCredentials);

      const separatorIndex = decodedCredentials.indexOf(':');

      const username = decodedCredentials.substring(
        0,
        separatorIndex
      );

      const password = decodedCredentials.substring(
        separatorIndex + 1
      );

      if (
        username === process.env.PRIVATE_PREVIEW_USER &&
        password === process.env.PRIVATE_PREVIEW_PASSWORD
      ) {
        return NextResponse.next();
      }
    } catch {
      // Invalid credentials
    }
  }

  return new Response(
    'Private preview — authentication required.',
    {
      status: 401,
      headers: {
        'WWW-Authenticate':
          'Basic realm="17 Little Portland Street Preview"',
        'Cache-Control': 'no-store',
      },
    }
  );
}
