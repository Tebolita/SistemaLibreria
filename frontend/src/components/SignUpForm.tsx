"use client"

import { Button } from "@/components/ui/button"
import {Card, CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBagIcon, LucidePackageSearch, Package, ClipboardClockIcon } from "lucide-react"

export function SignUpForm() {

    return (
<div className="min-h-screen flex items-center justify-center">
  <Card className="w-full max-w-4xl p-6 shadow-xl bg-white">
    <CardHeader>
      <CardTitle className="text-center text-2xl">Libreria SPD</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x">
        {/* Primera Columna */}
        <div className="p-6 flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-center mb-5 text-lg">
              Regístrate para aprovechar todos los beneficios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Label className="flex items-center gap-2">
              <ShoppingBagIcon size={40} color="red" /> Haz tu compra más rápida y sencilla.
            </Label>
            <Label className="flex items-center gap-2">
              <LucidePackageSearch size={40} color="red" /> Revisa el estado e historial de tus pedidos.
            </Label>
            <Label className="flex items-center gap-2">
              <Package size={40} color="red" /> Realiza tus pedidos de tus útiles favoritos.
            </Label>
            <Label className="flex items-center gap-2">
              <ClipboardClockIcon size={40} color="red" /> Impresiones de investigaciones de tus tareas.
            </Label>
          </CardContent>
        </div>

        {/* Segunda Columna */}
        <div className="p-6 flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Ingresa tus datos</CardTitle>
          </CardHeader>
          <CardContent>
            <form >
                <Label htmlFor="email">Email</Label>
                <Input id="Correo" type="Correo" placeholder="m@example.com" required />

                <Label htmlFor="Nombre" className="mt-5">Nombre</Label>
                <Input id="Nombre" type="text" placeholder="..." required />
                
                <Label htmlFor="Contraseña" className="mt-5">Contraseña</Label>
                <Input id="Contraseña" type="password" placeholder="****" required />

                <Label htmlFor="RepetirContraseña" className="mt-5">Repetir Contraseña</Label>
                <Input id="RepetirContraseña" type="password" placeholder="****" required />      

                <div className="grid w-full max-w-sm items-center gap-3 mt-5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" />
                </div>

                <Button type="submit" className="w-full mt-5"> Crear Cuenta </Button>       
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
    );
}