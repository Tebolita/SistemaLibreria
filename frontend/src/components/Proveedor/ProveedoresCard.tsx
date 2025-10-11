'use client';
import * as React from "react"
import { Building, Phone, Mail, User, Power, Edit3, Plus } from "lucide-react"
import useProveedores from "@/hooks/useProveedores"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import ModalActualizarProveedor from '../Proveedor/ProveedorActualizar';
import { useState, useEffect } from "react";

// Paleta de colores para proveedores
const colorSchemes = [
  {
    gradient: "from-blue-500/10 to-blue-600/10",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    button: "bg-blue-600 hover:bg-blue-700"
  },
  {
    gradient: "from-emerald-500/10 to-emerald-600/10",
    border: "border-emerald-200",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    button: "bg-emerald-600 hover:bg-emerald-700"
  },
  {
    gradient: "from-violet-500/10 to-violet-600/10",
    border: "border-violet-200",
    text: "text-violet-700",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    button: "bg-violet-600 hover:bg-violet-700"
  },
  {
    gradient: "from-amber-500/10 to-amber-600/10",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    button: "bg-amber-600 hover:bg-amber-700"
  },
  {
    gradient: "from-rose-500/10 to-rose-600/10",
    border: "border-rose-200",
    text: "text-rose-700",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    button: "bg-rose-600 hover:bg-rose-700"
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

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export function ProveedoresList() { 
  const { proveedoresTodos, proveedoresCambiarEstado } = useProveedores();
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [modalActual, setModalActual] = useState<any>(null);
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  const handleCambiarEstado = async (id: number) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    try {
      const response = await proveedoresCambiarEstado(id);
      setRefresh(!refresh);
      console.log(response);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleModal = (proveedor: any) => {
    setModalActual(proveedor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalActual(null);
  };

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await proveedoresTodos();
        setProveedores(response);
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
      }
    };
    fetchProveedores();
  }, [showModal, refresh]);

  const ProveedorCard = ({ proveedor, index }: { proveedor: any; index: number }) => {
    const colors = getColorScheme(proveedor.IdProveedor);
    const initials = getInitials(proveedor.NombreEmpresa);

    return (
      <Card 
        className={`group relative overflow-hidden border-2 ${colors.border} bg-gradient-to-br ${colors.gradient} transition-all duration-300 hover:shadow-xl hover:scale-105`}
      >
        {/* Efecto de fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative z-10 pb-3">
          {/* Header con Avatar y Estado */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className={`border-2 ${colors.border} shadow-lg`}>
                <AvatarImage src={`https://github.com/evilrabbit.png`} className="grayscale" />
                <AvatarFallback className={`${colors.text} font-bold`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <Badge 
                  className={`${colors.badge} border transition-all duration-300 ${
                    proveedor.Estado == 1 ? 'shadow-lg shadow-green-200/50' : 'shadow-lg shadow-red-200/50'
                  }`}
                >
                  <div className={`size-2 rounded-full mr-1 ${
                    proveedor.Estado == 1 ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  {proveedor.Estado == 1 ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Información de la Empresa */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building className={`size-4 ${colors.text}`} />
              <h3 className={`font-bold text-lg ${colors.text}`}>
                {proveedor.NombreEmpresa}
              </h3>
            </div>
            
            {proveedor.Contacto && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="size-3" />
                <span>{proveedor.Contacto}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-3 pb-3">
          {/* Información de Contacto */}
          <div className="space-y-2">
            {proveedor.Telefono && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-3 text-gray-500" />
                <span className="text-gray-700">{proveedor.Telefono}</span>
              </div>
            )}
            
            {proveedor.Correo && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-3 text-gray-500" />
                <span className="text-gray-700 truncate">{proveedor.Correo}</span>
              </div>
            )}
          </div>

          {/* ID del Proveedor */}
          <div className="text-xs text-gray-500 font-mono">
            ID: {proveedor.IdProveedor}
          </div>
        </CardContent>

        <CardFooter className="relative z-10 flex gap-2 pt-3 border-t border-gray-200/50">
          <Button
            onClick={() => handleModal(proveedor)}
            size="sm"
            className={`flex-1 ${colors.button} text-white transition-all duration-300 hover:shadow-lg`}
          >
            <Edit3 className="size-3 mr-1" />
            Editar
          </Button>
          
          <Button
            onClick={() => handleCambiarEstado(proveedor.IdProveedor)}
            variant={proveedor.Estado == 1 ? "destructive" : "default"}
            size="sm"
            className="flex-1 transition-all duration-300 hover:shadow-lg"
            disabled={loadingStates[proveedor.IdProveedor]}
          >
            <Power className={`size-3 mr-1 ${loadingStates[proveedor.IdProveedor] ? 'animate-spin' : ''}`} />
            {loadingStates[proveedor.IdProveedor] ? "..." : proveedor.Estado == 1 ? "Desactivar" : "Activar"}
          </Button>
        </CardFooter>

        {/* Efecto de borde animado */}
        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
      </Card>
    );
  };

  return (
    <div className="p-6">
      {/* Modal */}
      {showModal && modalActual && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in-0"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="animate-in zoom-in-95 duration-200 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalActualizarProveedor 
                showModal={closeModal}
                id={modalActual.IdProveedor}
                NombreEmpresa={modalActual.NombreEmpresa}
                contacto={modalActual.Contacto}
                Telefono={modalActual.Telefono}
                Correo={modalActual.Correo}
              />
            </div>
          </div>
        </>
      )}

      {/* Grid de Proveedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {proveedores.map((proveedor, index) => (
          <ProveedorCard 
            key={proveedor.IdProveedor} 
            proveedor={proveedor} 
            index={index}
          />
        ))}
      </div>

      {/* Estado vacío */}
      {proveedores.length === 0 && !showModal && (
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay proveedores registrados
          </h3>
          <p className="text-gray-600 mb-4">
            Comienza agregando tu primer proveedor al sistema
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Proveedor
          </Button>
        </div>
      )}
    </div>
  );
}