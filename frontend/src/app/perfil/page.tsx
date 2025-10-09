"use client";

import { useState } from "react";
import SidebarPerfil from "./components/SidebarPerfil";
import PerfilYContrasena from "./components/PerfilYContrasena";
import Pedidos from "./components/Pedidos";
import Favoritos from "./components/Favoritos";
import Direcciones from "./components/Direcciones";
import { useLogin } from "@/context/loginContext";

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("perfil");
  const { nombreUsuario, correoUsuario } = useLogin();

  const renderContenido = () => {
    switch (activeTab) {
      case "perfil":
        return <PerfilYContrasena />;
      case "pedidos":
        return <Pedidos />;
      case "favoritos":
        return <Favoritos />;
      case "direcciones":
        return <Direcciones />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <SidebarPerfil activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenido del perfil */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col items-center text-center mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold">
            {nombreUsuario ? nombreUsuario.charAt(0).toUpperCase() : "?"}
          </div>

          <p className="text-gray-500 mt-2">Hola</p>
          <h2 className="text-xl font-semibold capitalize">
            {nombreUsuario || "Invitado"}
          </h2>
          <p className="text-gray-500">{correoUsuario || "Sin correo"}</p>
        </div>

        {/* Contenido dinámico */}
        {renderContenido()}
      </div>
    </div>
  );
}
