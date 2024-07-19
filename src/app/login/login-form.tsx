"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { setCookie } from 'nookies';


export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar campos vacíos
        if (username === "" || password === "") {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Todos los campos son obligatorios",
            });
            return;
        }

        // Simulación de validación de credenciales
        const storedUser = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (username === storedUser && password === storedPassword) {
            // Simulamos inicio de sesión exitoso

            setCookie(null, 'isLoggedIn', 'true', {
                maxAge: 30 * 24 * 60 * 60, // 30 días
                path: '/',
            });
            toast({
                title: "Éxito",
                description: "Inicio de sesión exitoso",
            });
            router.push("/dashboard");
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Credenciales incorrectas",
            });
        }
    };


    return (
        <Card className="mx-auto bg-transparent flex flex-col items-center justify-center border-transparent">
            <CardHeader>
                <CardTitle className="text-4xl">Iniciar Sesión</CardTitle>
                <CardDescription className="text-white">Ingrese sus credenciales para acceder al dashboard</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="w-full max-w-sm">
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
                    <CardFooter className="flex flex-col items-center justify-center mt-4">
                        <Button className="font-bold w-full" type="submit">Iniciar Sesión</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
