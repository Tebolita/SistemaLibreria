"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <div className="max-w-xs mx-auto p-3 space-y-5"> {/* Aumenté space-y-6 para más separación */}
      <h1 className="text-xl font-semibold text-center">
        Iniciar Sesión
      </h1>

      <div className="space-y-4"> {/* Más espacio entre grupos */}
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="usuario1@gmail.com"
            className="h-9 pex-6" /* Asegura ancho completo */
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            className="h-9 px-6"
          />
          <div className="flex center pt-1"> 
            <button className="text-xs text-gray-600 hover:text-gray-800 hover:underline">
              ¿Olvidó su contraseña?
            </button>
          </div>
        </div>
      </div>

      <div className="border-t my-3"></div> {/* Divisor con más espacio */}

      <div className="flex space-x-3 justify-center">
        <Button variant="outline" className="h-9 px-6">
          Cancelar
        </Button>
        <Button className="h-9 px-6 bg-blue-900 hover:bg-blue-800 text-white">
          Ingresar
        </Button>
      </div>
    </div>
  )
}