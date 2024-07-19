"use client";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <div className="glassmorphism p-8 max-w-lg mx-auto text-center mb-6">
        <div className="mb-4">
          <Image
            src="/customers/ram-logo.png"
            alt="Rick and Morty Logo"
            width={450}
            height={150}
            className="object-contain mb-4"
          />
        </div>
        <LoginForm />
        <p className="text-white text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-blue-950 font-bold text-secondary hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}