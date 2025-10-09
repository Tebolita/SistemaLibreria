"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User, Heart, MapPin, ShoppingBag } from "lucide-react";
import { useLogin } from "@/context/loginContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface SidebarPerfilProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function SidebarPerfil({ activeTab, setActiveTab }: SidebarPerfilProps) {
  const router = useRouter();
  const { setNombreUsuario, setCorreoUsuario } = useLogin();

  const menuItems = [
    {
      id: "perfil",
      label: "Perfil y contraseña",
      icon: <User className="h-4 w-4" />,
    },
    { id: "pedidos", label: "Pedidos", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "favoritos", label: "Favoritos", icon: <Heart className="h-4 w-4" /> },
    { id: "direcciones", label: "Direcciones", icon: <MapPin className="h-4 w-4" /> },
  ];

  const handleLogout = () => {
    Cookies.remove("authToken");
    setNombreUsuario("");
    setCorreoUsuario("");
    router.push("/");
  };

  return (
    <div className="w-full md:w-1/4 bg-white border rounded-lg p-4 space-y-2 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Mi cuenta</h2>

      {/* Menú de secciones */}
      {menuItems.map((item) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "default" : "ghost"}
          className="w-full justify-start flex items-center gap-2 text-sm"
          onClick={() => setActiveTab(item.id)}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}

      <hr className="my-3" />

      {/* Cerrar sesión */}
      <Button
        variant="destructive"
        className="w-full flex items-center gap-2 text-sm"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  );
}
