"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useLogin } from "@/context/loginContext";

export default function PerfilYContrasena() {
  // 🧠 Obtenemos los datos del contexto global (login real)
  const { nombreUsuario, correoUsuario, setNombreUsuario, setCorreoUsuario } = useLogin();

  const [modoEdicion, setModoEdicion] = useState(false);
  const [tempData, setTempData] = useState({
    nombre: nombreUsuario || "",
    correo: correoUsuario || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    setNombreUsuario(tempData.nombre);
    setCorreoUsuario(tempData.correo);
    setModoEdicion(false);
  };

  return (
    <div className="space-y-6">
      {/* 🧩 Encabezado estilo Kemik */}
      <Card className="flex items-center justify-between p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold">
            {nombreUsuario ? nombreUsuario.charAt(0).toUpperCase() : "?"}
          </div>

          {/* Datos del usuario */}
          <div>
            <p className="text-gray-500 text-sm">Hola</p>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {nombreUsuario || "Invitado"}
            </h2>
            <p className="text-gray-500 text-sm">
              {correoUsuario || "Sin correo"}
            </p>
          </div>
        </div>

        {/* Botón editar */}
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full bg-red-500 hover:bg-red-600 text-white"
          onClick={() => setModoEdicion(!modoEdicion)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </Card>

      {/* ✏️ Modo edición */}
      {modoEdicion && (
        <Card className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <Input
              type="text"
              name="nombre"
              value={tempData.nombre}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <Input
              type="email"
              name="correo"
              value={tempData.correo}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setModoEdicion(false)}>
              Cancelar
            </Button>
            <Button onClick={guardarCambios}>Guardar cambios</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
