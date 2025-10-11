"use client";
import { useEffect, useState } from "react";
import { useFacturas } from "@/hooks/useFacturas";
import { useEstadoFactura } from "@/hooks/useEstadoFactura";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEstadoEnvio } from "@/hooks/useEstadoEnvio";

export default function FacturasPanel() {
  const { todos: todosFacturas } = useFacturas();
  const { traerPorFactura, estadoCrear } = useEstadoFactura();
  const { todos: obtenerEstadosEnvio } = useEstadoEnvio();
  
  const [facturas, setFacturas] = useState<any[]>([]);
  const [estadosDisponibles, setEstadosDisponibles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cambiandoEstado, setCambiandoEstado] = useState<number | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      
      try {
        const estadosData = await obtenerEstadosEnvio();
        if (estadosData && !estadosData.message) {
          setEstadosDisponibles(estadosData);
        }

        const facturasData = await todosFacturas();
        
        if (facturasData) {
          const facturasConEstado = await Promise.all(
            facturasData.map(async (factura: any) => {
              const estadoActual = await traerPorFactura(factura.IdFactura);
              
              return {
                ...factura,
                estadoActual: estadoActual?.[0]?.EstadoEnvio || null,
              };
            })
          );
          setFacturas(facturasConEstado);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const obtenerSiguienteEstado = (estadoActualId: number) => {
    const estadoActualIndex = estadosDisponibles.findIndex(estado => estado.IdEstadoEnvio === estadoActualId);
    if (estadoActualIndex === -1 || estadoActualIndex >= estadosDisponibles.length - 1) {
      return null;
    }
    return estadosDisponibles[estadoActualIndex + 1];
  };

  const handleAvanzarEstado = async (facturaId: number, estadoActualId: number) => {
    const siguienteEstado = obtenerSiguienteEstado(estadoActualId);
    if (!siguienteEstado) return;

    setCambiandoEstado(facturaId);
    await estadoCrear({ IdFactura: facturaId, IdEstadoEnvio: siguienteEstado.IdEstadoEnvio });
    
    const facturaActualizada = await traerPorFactura(facturaId);
    setFacturas(prev =>
      prev.map(f =>
        f.IdFactura === facturaId
          ? { ...f, estadoActual: facturaActualizada?.[0]?.EstadoEnvio || null }
          : f
      )
    );
    setCambiandoEstado(null);
  };

  // Colores vibrantes para cada estado
  const getEstadoColors = (estadoId: number, isCompleted: boolean, isCurrent: boolean, isNext: boolean) => {
    if (isCompleted) {
      return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-500 shadow-sm';
    }
    
    if (isCurrent) {
      const currentColors = {
        1: 'bg-gradient-to-r from-purple-400 to-purple-500 text-white border-purple-500 shadow-sm',
        2: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-500 shadow-sm',
        3: 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-500 shadow-sm',
        4: 'bg-gradient-to-r from-green-400 to-green-500 text-white border-green-500 shadow-sm',
      };
      return currentColors[estadoId as keyof typeof currentColors] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
    
    if (isNext) {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-yellow-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer';
    }
    
    return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 border-gray-400';
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-40">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-purple-600 font-medium">Cargando facturas...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Panel de Facturas
        </h2>
        <p className="text-gray-500 mt-2">Gestiona el estado de envío de tus pedidos</p>
      </div>
      
      {facturas.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-blue-100">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-lg">No hay facturas registradas</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {facturas.map(factura => {
            const estadoActualId = factura.estadoActual?.IdEstadoEnvio;
            const siguienteEstado = obtenerSiguienteEstado(estadoActualId);
            const puedeAvanzar = siguienteEstado !== null;

            return (
              <Card key={factura.IdFactura} className="p-6 border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                      <p className="text-sm font-semibold text-gray-500">Factura #{factura.IdFactura}</p>
                    </div>
                    
                    {/* Timeline de estados */}
                    <div className="flex flex-wrap items-center gap-3">
                      {estadosDisponibles.map((estado, index) => {
                        const isCompleted = estado.IdEstadoEnvio < estadoActualId;
                        const isCurrent = estado.IdEstadoEnvio === estadoActualId;
                        const isNext = estado.IdEstadoEnvio === siguienteEstado?.IdEstadoEnvio;
                        
                        return (
                          <div key={estado.IdEstadoEnvio} className="flex items-center">
                            <div
                              className={`
                                px-4 py-2 rounded-full text-sm font-bold border-2 transition-all duration-300
                                ${getEstadoColors(estado.IdEstadoEnvio, isCompleted, isCurrent, isNext)}
                                ${isNext && puedeAvanzar ? 'hover:scale-110 hover:shadow-xl animate-pulse' : ''}
                              `}
                              onClick={() => isNext && puedeAvanzar && handleAvanzarEstado(factura.IdFactura, estadoActualId)}
                            >
                              <span className="flex items-center gap-2">
                                {estado.NombreEstado}
                                {isCompleted && ' ✅'}
                                {isCurrent && ' ⭐'}
                              </span>
                            </div>
                            
                            {/* Línea conectora */}
                            {index < estadosDisponibles.length - 1 && (
                              <div className={`
                                w-6 h-1 mx-2 transition-all duration-300
                                ${isCompleted 
                                  ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                                  : 'bg-gradient-to-r from-gray-300 to-gray-300'
                                }
                              `} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Botón para avanzar estado */}
                  {puedeAvanzar && (
                    <Button
                      onClick={() => handleAvanzarEstado(factura.IdFactura, estadoActualId)}
                      disabled={cambiandoEstado === factura.IdFactura}
                      className={`
                        text-sm font-bold py-3 px-6 rounded-xl border-2 transition-all duration-300
                        bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-500
                        hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg hover:scale-105
                        disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                        shadow-md
                      `}
                    >
                      {cambiandoEstado === factura.IdFactura ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Avanzando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 cursor-pointer">
                          🚀 Avanzar a {siguienteEstado.NombreEstado}
                        </span>
                      )}
                    </Button>
                  )}

                  {!puedeAvanzar && (
                    <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-bold shadow-lg">
                      🎉 Pedido Completado
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}