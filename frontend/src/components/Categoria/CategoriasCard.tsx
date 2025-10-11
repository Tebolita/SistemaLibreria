"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Edit3, Power, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCategoria } from "@/hooks/useCategorias"
import { useState } from "react";
import { CategoriaActualizar } from "./CategoriaActualizar";

// Paleta de colores para las categorías
const colorSchemes = [
  {
    gradient: "from-blue-500/10 to-blue-600/10",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700"
  },
  {
    gradient: "from-green-500/10 to-green-600/10",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800 border-green-200",
    button: "bg-green-600 hover:bg-green-700"
  },
  {
    gradient: "from-purple-500/10 to-purple-600/10",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    button: "bg-purple-600 hover:bg-purple-700"
  },
  {
    gradient: "from-orange-500/10 to-orange-600/10",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
    button: "bg-orange-600 hover:bg-orange-700"
  },
  {
    gradient: "from-pink-500/10 to-pink-600/10",
    border: "border-pink-200",
    text: "text-pink-700",
    badge: "bg-pink-100 text-pink-800 border-pink-200",
    button: "bg-pink-600 hover:bg-pink-700"
  },
  {
    gradient: "from-cyan-500/10 to-cyan-600/10",
    border: "border-cyan-200",
    text: "text-cyan-700",
    badge: "bg-cyan-100 text-cyan-800 border-cyan-200",
    button: "bg-cyan-600 hover:bg-cyan-700"
  }
];

const getColorScheme = (id: number) => {
  return colorSchemes[id % colorSchemes.length];
};

export default function CategoriasCard({ idCategoria, Nombre, Descripcion, Estado }: any) {
  const { cambiarEstado } = useCategoria();
  const [estado, setEstado] = useState(Estado);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const colors = getColorScheme(idCategoria);

  async function handleCambiarEstado(id: number) {
    setIsLoading(true);
    try {
      const response = await cambiarEstado(id);
      setEstado(estado == 1 ? 0 : 1);
      console.log(response);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    } finally {
      setIsLoading(false);
    }
  }  

  return (
    <>
      {/* Modal Overlay */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in-0"
          onClick={() => setShowModal(false)}
        />
      )}
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <CategoriaActualizar 
              idCategoria={idCategoria} 
              Nombre={Nombre} 
              Descripcion={Descripcion} 
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {/* Card de Categoría */}
      <Card className={`@container/card group relative overflow-hidden border-2 ${colors.border} bg-gradient-to-br ${colors.gradient} transition-all duration-300 hover:shadow-xl hover:scale-105`}>
        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative z-10">
          {/* Icono y Badge de Estado */}
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-white/50 border ${colors.border}`}>
              <Tag className={`size-5 ${colors.text}`} />
            </div>
            <Badge 
              className={`${colors.badge} border transition-all duration-300 ${estado == 1 ? 'shadow-lg shadow-green-200/50' : 'shadow-lg shadow-red-200/50'}`}
              variant={estado == 1 ? "default" : "secondary"}
            >
              <div className={`size-2 rounded-full mr-1 ${estado == 1 ? 'bg-green-500' : 'bg-red-500'}`} />
              {estado == 1 ? "Activo" : "Inactivo"}
            </Badge>
          </div>

          {/* Contenido */}
          <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-2">
            {Descripcion || "Sin descripción"}
          </CardDescription>
          <CardTitle className={`text-xl font-bold @[250px]/card:text-2xl ${colors.text} transition-colors duration-300`}>
            {Nombre}
          </CardTitle>
          
          <CardAction className="mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ImageIcon className="size-3" />
              <span>ID: {idCategoria}</span>
            </div>
          </CardAction>
        </CardHeader>

        <CardFooter className="relative z-10 flex-col items-stretch gap-3 p-4 pt-0">
          {/* Barra de progreso decorativa */}
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-500 ${
                estado == 1 ? 'bg-green-500 w-3/4' : 'bg-red-400 w-1/4'
              }`}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 w-full">
            <Button
              onClick={() => setShowModal(true)}
              size="sm"
              className={`flex-1 ${colors.button} text-white transition-all duration-300 hover:shadow-lg`}
            >
              <Edit3 className="size-3 mr-1" />
              Editar
            </Button>
            
            <Button
              onClick={() => handleCambiarEstado(idCategoria)}
              variant={estado == 1 ? "destructive" : "default"}
              size="sm"
              className="flex-1 transition-all duration-300 hover:shadow-lg"
              disabled={isLoading}
            >
              <Power className={`size-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? "..." : estado == 1 ? "Desactivar" : "Activar"}
            </Button>
          </div>

          {/* Indicador de estado sutil */}
          <div className={`text-xs text-center font-medium px-2 py-1 rounded-full transition-all duration-300 ${
            estado == 1 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {estado == 1 ? "✅ Categoría disponible" : "⏸️ Categoría pausada"}
          </div>
        </CardFooter>

        {/* Efecto de borde animado */}
        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
      </Card>
    </>
  );
}