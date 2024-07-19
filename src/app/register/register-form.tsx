"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";


export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      // Guardar credenciales en localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      toast({
        title: "Éxito",
        description: "Registro exitoso",
      });
      router.push("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Todos los campos son obligatorios",
      });
      setError("Todos los campos son obligatorios");
    }
  };

  return (
    <Card className="mx-auto bg-transparent flex flex-col items-center justify-center border-transparent">
      <CardHeader>
        <CardTitle className="text-4xl">Registro</CardTitle>
        <CardDescription className="text-white">Ingrese sus credenciales para iniciar sesión</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">USUARIO</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">CONTRASEÑA</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <CardFooter className="flex flex-col items-center justify-center mt-4">
            <Button className="font-bold w-full" type="submit">Registrarse</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
