"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-fixed bg-center bg-cover">
      <div className="glassmorphism p-8 max-w-lg mx-auto text-center mb-6">
        <Image
          src="/customers/ram-logo.png"
          alt="Rick and Morty Logo"
          width={450}
          height={150}
          className="object-contain mb-4"
        />
        <RegisterForm />
        <p className="text-white text-sm mt-4">
          ¿Tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-bold text-secondary hover:underline"
          >
            Inicia Sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
