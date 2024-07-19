"use client";
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { destroyCookie } from 'nookies';
import { ModeToggle } from './theme-toggle-button';


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Borrar la información del localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    // Borrar las cookies
    destroyCookie(null, 'isLoggedIn', { path: '/' });

    // Redirigir al usuario a la página de login
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto ">
        {/* Logo de Rick y Morty */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/customers/pestaña.png"
              alt="Rick and Morty Logo"
              width={100}
              height={25}
              className="object-contain cursor-pointer"
            />
          </Link>
          {/* Mensaje de bienvenida para escritorio */}
          <h1 className="text-white text-2xl font-bold hidden md:block">¡Bienvenidos!</h1>
        </div>
        {/* Botones y opciones */}
        <div className="flex items-center space-x-4">
          {pathname === "/" && (
            <Button>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}
          {pathname === "/login" && (
            <Button>
              <Link href="/register">Registrarse</Link>
            </Button>
          )}
          {pathname === "/register" && (
            <Button>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}
          {pathname.startsWith("/dashboard") && (
            <Button onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          )}
          {/* Toggle de modo oscuro */}
          <ModeToggle />
        </div>
      </div>
      {/* Mensaje de bienvenida para móviles */}
      <h1 className="text-white text-2xl font-bold block md:hidden text-center mt-4">¡Bienvenidos!</h1>
    </nav>
  );
}
