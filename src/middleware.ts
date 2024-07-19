import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Obtener las cookies desde la cabecera de la solicitud
  const cookies = req.cookies;
  const isLoggedIn = cookies.get('isLoggedIn');

  // Definir las rutas que quieres proteger
  const protectedRoutes = ['/dashboard', '/dashboard/episodios', '/dashboard/personajes', '/dashboard/episodios/create', '/dashboard/personajes/create', '/dashboard/personajes/edit/1', '/dashboard/episodios/edit/1'];

  // Verificar si la ruta actual está protegida
  if (protectedRoutes.includes(req.nextUrl.pathname) && !isLoggedIn) {
    // Si no está autenticado, redirigir a la página de login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Definir las rutas donde se aplicará el middleware
export const config = {
  matcher: ['/dashboard/:path*'],
};
