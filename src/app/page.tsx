import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Logo de Rick y Morty */}
      <div className="glassmorphism p-6 max-w-sm mx-auto text-center">
        <Image
          src="/customers/ram-logo.png"  // Asegúrate de que el logo esté en la carpeta public
          alt="Rick and Morty Logo"
          width={400}  // Ajusta el tamaño según lo necesites
          height={200}
          className="object-contain mb-4"
        />
        <h1 className="text-4xl font-bold text-white mb-4">¡Bienvenidos a la Página de Rick y Morty!</h1>
        <p className="text-white text-lg mb-6">Explora el mundo de Rick y Morty con nosotros. ¡Inicia sesión para comenzar!</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          <a href="/login">Iniciar Sesión</a>
        </button>
      </div>
    </div>
    </div>
  )
}