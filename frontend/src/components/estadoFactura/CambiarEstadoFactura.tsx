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

  if (loading) return (
    <div className="flex justify-center items-center min-h-40">
      <p className="text-gray-500">Cargando facturas...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4 p-4">
      <h2 className="text-xl font-light text-gray-700 mb-6">Facturas</h2>
      
      {facturas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No hay facturas registradas.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {facturas.map(factura => {
            const estadoActualId = factura.estadoActual?.IdEstadoEnvio;
            const siguienteEstado = obtenerSiguienteEstado(estadoActualId);
            const puedeAvanzar = siguienteEstado !== null;

            return (
              <Card key={factura.IdFactura} className="p-4 border border-gray-100 shadow-none">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Factura #{factura.IdFactura}</p>
                    
                    {/* Badges de estados */}
                    <div className="flex flex-wrap gap-2">
                      {estadosDisponibles.map((estado, index) => {
                        const isCompleted = estado.IdEstadoEnvio < estadoActualId;
                        const isCurrent = estado.IdEstadoEnvio === estadoActualId;
                        const isNext = estado.IdEstadoEnvio === siguienteEstado?.IdEstadoEnvio;
                        
                        return (
                          <div
                            key={estado.IdEstadoEnvio}
                            className={`
                              px-3 py-1 rounded-full text-xs font-medium border
                              ${isCompleted 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : isCurrent
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : isNext && puedeAvanzar
                                ? 'bg-gray-50 text-gray-600 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors'
                                : 'bg-gray-50 text-gray-400 border-gray-200'
                              }
                            `}
                            onClick={() => isNext && puedeAvanzar && handleAvanzarEstado(factura.IdFactura, estadoActualId)}
                          >
                            {estado.NombreEstado}
                            {isCompleted && ' ✓'}
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
                      variant="outline"
                      size="sm"
                      className="text-xs cursor-pointer"
                    >
                      {cambiandoEstado === factura.IdFactura ? "..." : `Avanzar a ${siguienteEstado.NombreEstado}`}
                    </Button>
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