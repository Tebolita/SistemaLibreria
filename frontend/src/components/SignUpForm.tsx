"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBagIcon, LucidePackageSearch, Package, ClipboardClockIcon } from "lucide-react"
import { Register } from "@/app/login.api"
import { toast, Toaster } from "sonner"

export function SignUpForm() {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [repetirContrasena, setRepetirContrasena] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (contrasena !== repetirContrasena) {
      toast.error("Las contraseñas no coinciden", { duration: 3000 })
      return
    }
    setLoading(true)
    try {
      const res = await Register({
        Nombre: nombre,
        Correo: correo,
        Contrasena: contrasena,
        Usuario: usuario
      })
      if (res.message) {
        toast.error(res.message, { duration: 3000 })
      } else {
        toast.success("Cuenta creada exitosamente", { duration: 3000 })
        // Puedes redirigir aquí si lo deseas
      }
    } catch (error: any) {
      toast.error(error?.message || "Error al registrar", { duration: 3000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="bottom-left" />
      <Card className="w-full max-w-4xl p-6 shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Crear Cuenta</CardTitle>
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
                <form onSubmit={handleSubmit}>
                  <Label htmlFor="correo">Email</Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={correo}
                    onChange={e => setCorreo(e.target.value)}
                  />

                  <Label htmlFor="nombre" className="mt-5">Nombre</Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="..."
                    required
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                  />

                  <Label htmlFor="usuario" className="mt-5">Usuario</Label>
                  <Input
                    id="usuario"
                    type="text"
                    placeholder="..."
                    required
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                  />

                  <Label htmlFor="contrasena" className="mt-5">Contraseña</Label>
                  <Input
                    id="contrasena"
                    type="password"
                    placeholder="****"
                    required
                    value={contrasena}
                    onChange={e => setContrasena(e.target.value)}
                  />

                  <Label htmlFor="repetirContrasena" className="mt-5">Repetir Contraseña</Label>
                  <Input
                    id="repetirContrasena"
                    type="password"
                    placeholder="****"
                    required
                    value={repetirContrasena}
                    onChange={e => setRepetirContrasena(e.target.value)}
                  />

                  <Button type="submit" className="w-full mt-5" disabled={loading}>
                    {loading ? "Creando..." : "Crear Cuenta"}
                  </Button>
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