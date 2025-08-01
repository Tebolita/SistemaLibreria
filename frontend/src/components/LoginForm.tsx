"use client"

import { Button } from "@/components/ui/button"
import {CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {

    return (
    <>
        <CardHeader>
            <CardTitle> Iniciar sesion con una cuenta creada</CardTitle>
            <CardDescription>
            Escribe tu correo y contraseña para iniciar sesion
            </CardDescription>
            <CardAction>
            <Button variant="link" className="cursor-pointer">Crear Cuenta</Button>
            </CardAction>
        </CardHeader>
        <CardContent>
            <form>
            <div className="flex flex-col gap-6 ">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="Correo"
                    type="Correo"
                    placeholder="m@example.com"
                    required
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                        Olvide mi contraseña
                    </a>
                </div>
                <Input id="password" type="password" required />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
                Iniciar Sesion
            </Button>
        </CardFooter>     
    </>  
    );
}