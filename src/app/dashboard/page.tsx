"use client";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <Sidebar />
      <main className="flex-grow p-4 bg-slate-800 bg-opacity-40 backdrop-blur-md">
        <div className="flex flex-col items-center w-full h-full px-3 py-4 md:px-2 bg-gray-800 bg-opacity-50 text-white border border-y-rose-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl text-purple-500 font-bold mb-4">Portal Interdimensional</h1>
            <p className="text-green-600 text-5xl font-semibold">¡Bienvenido, viajero de realidades!</p>
            <Image
              src="/customers/portal-rick-and-morty.gif"
              alt="Rick and Morty Portal"
              width={600}
              height={25}
              className="mx-auto mt-6"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
