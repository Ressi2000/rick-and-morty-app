"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter, usePathname } from 'next/navigation';
import { destroyCookie } from 'nookies';
import clsx from 'clsx';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Borrar la información del localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("characters");
    localStorage.removeItem("episodes");

    // Borrar las cookies
    destroyCookie(null, 'isLoggedIn', { path: '/' });

    // Redirigir al usuario a la página de login
    router.push('/login');
  };

  const links = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/dashboard/personajes", label: "Personajes" },
    { href: "/dashboard/episodios", label: "Episodios" }
  ];

  return (
    <aside className="bg-slate-800 w-full md:w-60 lg:w-80 xl:w-96 p-4 bg-opacity-40 backdrop-blur-md">
      <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-800 text-white border border-y-rose-50">
        <Link
          className="mb-4 flex h-20 items-center justify-center md:justify-start rounded-md bg-gray-800 p-4"
          href="/dashboard"
        >
          <Image
            src="/customers/ram-logo.png"
            alt="Rick and Morty Logo"
            width={450}
            height={150}
            className="object-contain mb-4"
          />
        </Link>
        <div className="flex flex-col grow justify-between space-y-4">
          <nav className="flex flex-col space-y-2">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex h-[48px] w-full items-center justify-center md:justify-start gap-2 rounded-md text-white p-3 text-sm font-medium",
                  pathname === link.href ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-sky-100 hover:text-blue-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button onClick={handleLogout} className="w-full mt-4">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </aside>
  );
}
