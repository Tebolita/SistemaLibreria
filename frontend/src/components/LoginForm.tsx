"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { login, GetEmail } from "@/Apis/login.api";
import { useLogin } from "@/context/loginContext";
import { useUserRole } from "@/hooks/UserRole";

export function LoginForm() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    showLoginForm,
    setshowLoginForm,
    nombreUsuario,
    setNombreUsuario,
    setCorreoUsuario,
    setIdUsuario,
    setNombre,
    setIdCliente,
  } = useLogin();

  const router = useRouter();


  const toggleLogin = () => {
    setshowLoginForm(!showLoginForm);
  };
  const { setRole } = useUserRole()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({
        Correo: email,
        Usuario: usuario,
        Contrasena: password,
      });

      if (res.access_token) {
        const userEmail = await GetEmail();

        // ✅ Guardamos en el contexto global
        setNombreUsuario(userEmail.username);
        setCorreoUsuario(userEmail.correo);
        setIdUsuario(userEmail.idUser)
        setRole(userEmail.role)
        setNombre(userEmail.nombreUsuario)  
        setIdCliente(userEmail.idCliente)
        if (userEmail.role === "Administrador") {
          router.push("/producto");
        }

        toast.success("Inicio de sesión exitoso", { duration: 3000 });
        setshowLoginForm(false);
      } else if (res.message) {
        toast.error(res.message || "Credenciales incorrectas", {
          duration: 3000,
        });
      }
    } catch (error: any) {
      toast.error(error?.message || "Error al iniciar sesión", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const miUsuario = () => {router.push("/perfil"); setshowLoginForm(!showLoginForm);};
  const Redireccionar = () => {
    Cookies.remove("authToken");
    setNombreUsuario("");
    setCorreoUsuario("");
    setRole("guest")
    router.push("/");
  };

  return (
    <>
      {nombreUsuario == "" || nombreUsuario == undefined ? (
        <div
          className="relative w-full max-w-sm ml-auto mr-[15%] absolute"
          style={{ zIndex: 100 }}
        >
          <Card className="w-full max-w-sm ml-auto mr-[15%] absolute">
            <form
              className="w-full mx-auto p-3 space-y-5"
              onSubmit={handleSubmit}
            >
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
                    onChange={(e) => setUsuario(e.target.value)}
                    className="h-9 px-6"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 px-6"
                  />
                </div>

                <div className="space-y-3 w-full">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-9 px-6"
                  />
                  <div className="flex center pt-1">
                    <button
                      type="button"
                      className="text-xs text-gray-600 hover:text-gray-800 hover:underline"
                    >
                      ¿Olvidó su contraseña?
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t my-3"></div>

              <div className="flex space-x-3 justify-center">
                <Button
                  variant="outline"
                  className="h-9 px-6 cursor-pointer"
                  type="button"
                  onClick={toggleLogin}
                >
                  Cancelar
                </Button>
                <Button
                  className="h-9 px-6 bg-blue-900 hover:bg-blue-800 text-white cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      ) : (
        <div
          className="relative w-full max-w-sm ml-auto mr-[15%] absolute"
          style={{ zIndex: 100 }}
        >
          <Card className="w-full max-w-sm ml-auto mr-[15%] absolute">
            <div className="flex space-x-3 justify-center py-5">
              <Button onClick={miUsuario} variant="outline" className="h-9 px-6 cursor-pointer">
                Mi Usuario
              </Button>
              <Button
                className="h-9 px-6 bg-blue-900 hover:bg-blue-800 text-white cursor-pointer"
                disabled={loading}
                onClick={() => Redireccionar()}
              >
                {loading ? "Cerrando sesión..." : "Cerrar sesión"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
