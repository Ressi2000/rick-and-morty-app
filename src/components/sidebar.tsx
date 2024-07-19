"use cliente";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

export default function Sidebar() {
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
    <aside className="bg-slate-800 w-120 p-4 bg-opacity-40 backdrop-blur-md">
      <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-800 text-white border border-y-rose-50">
        <Link
          className="mb-2 w-60 flex h-20 items-end justify-start rounded-md bg-gray-800 p-4 md:h-40"
          href="/dashboard"
        >
          <div>
            <Image
              src="/customers/ram-logo.png"
              alt="Rick and Morty Logo"
              width={450}
              height={150}
              className="object-contain mb-4"
            />

          </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">

          <nav className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-900 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              Inicio
            </Link>
            <Link
              href="/dashboard/personajes"
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-900 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              Personajes
            </Link>
            <Link
              href="/dashboard/episodios"
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-900 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              Episodios
            </Link>
          </nav>
          <Button onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </aside>
  );
}
