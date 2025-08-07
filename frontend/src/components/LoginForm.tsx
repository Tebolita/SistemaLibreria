"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/app/login.api"
import { toast, Toaster } from "sonner"


export function LoginForm() {
  const [usuario, setUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await login({
        Correo: email,
        Usuario: usuario,
        Contrasena: password
      })
      if (res.access_token) {
        toast.success("Inicio de sesión exitoso", { duration: 3000 })
      } else if (res.message) {
        toast.error(res.message || "Credenciales incorrectas", { duration: 3000 })
      }
    } catch (error: any) {
      toast.error(error?.message || "Error al iniciar sesión",{ duration: 3000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <><Toaster position="bottom-left" />
    <form className="w-full mx-auto p-3 space-y-5" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold text-center">
        Iniciar Sesión
      </h1>

      <div className="space-y-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="usuario">Usuario</Label>
          <Input
            id="usuario"
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            className="h-9 px-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="h-9 px-6"
          />
        </div>

        <div className="space-y-3 w-full">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="h-9 px-6"
          />
          <div className="flex center pt-1">
            <button type="button" className="text-xs text-gray-600 hover:text-gray-800 hover:underline">
              ¿Olvidó su contraseña?
            </button>
          </div>
        </div>
      </div>

      <div className="border-t my-3"></div>

      <div className="flex space-x-3 justify-center">
        <Button variant="outline" className="h-9 px-6 cursor-pointer" type="button">
          Cancelar
        </Button>
        <Button className="h-9 px-6 bg-blue-900 hover:bg-blue-800 text-white cursor-pointer" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </div>
    </form>
    </>
  )
}