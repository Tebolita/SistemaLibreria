"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/context/loginContext";
import { useFacturas } from "@/hooks/useFacturas";
import {ClipboardList,ShoppingCart,Truck,MapPin,ArrowRight, Stars} from "lucide-react";
import { useEstadoFactura } from "@/hooks/useEstadoFactura";


export default function Pedidos() {
  const [pedidos, setPedidos] = useState<any>([]);
  const { Detalle } = useFacturas();
  const { idCliente } = useLogin()
  const { traerPorFactura } = useEstadoFactura()

async function devolverEstadoFactura(idFactura: number) {
  const estado = await traerPorFactura(idFactura);
  if (!estado?.[0]?.EstadoEnvio) return { nombre: null, descripcion: "" };
  return {
    nombre: estado[0].EstadoEnvio.NombreEstado,
    descripcion: estado[0].EstadoEnvio.Descripcion,
  };
} 

  useEffect(() => {
    const cargarPedidosyEstados = async () => {
      const data = await Detalle(parseInt(idCliente));
      if (!data?.facturaDetalle) return;

      // Para cada pedido, obtenemos su estado más reciente
      const pedidosConEstado = await Promise.all(
        data.facturaDetalle.map(async (pedido: any) => {
          const estadoActual = await devolverEstadoFactura(pedido.IdFactura);
          return { ...pedido, estadoActual };
        })
      );


      setPedidos({ facturaDetalle: pedidosConEstado });
      console.log(pedidosConEstado)
    };
    cargarPedidosyEstados();
  }, [idCliente]);
  
  return (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-800">🧾 Mis pedidos recientes</h2>

    {/* Validación de array vacío */}
    {(!pedidos?.facturaDetalle || pedidos.facturaDetalle.length === 0) ? (
      <p className="text-gray-500">Aún no tienes pedidos registrados.</p>
    ) : (
      pedidos.facturaDetalle.map((pedido: any, index: number) => (
        <Card key={index} className="p-6 shadow-sm space-y-4">
          {/* Encabezado de la factura */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Factura</p>
              <p className="font-semibold">#{pedido.IdFactura}</p>
            </div>

            <div className="flex items-center justify-center gap-8 mt-4">
              {[
                { nombre: "Pedido recibido", color: "bg-yellow-400", icono: ClipboardList },
                { nombre: "Preparando", color: "bg-orange-400", icono: ShoppingCart },
                { nombre: "En camino", color: "bg-amber-500", icono: Truck },
                { nombre: "Entregado", color: "bg-green-500", icono: MapPin },
              ].map((etapa, i, arr) => {
                const Icon = etapa.icono;
                const etapaActivaIndex = arr.findIndex(
                  e => e.nombre === pedido.estadoActual.nombre
                );
                const activo = i <= etapaActivaIndex; // Colorear todas las etapas anteriores y la actual

                return (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`w-15 h-15 flex items-center justify-center rounded-full text-white shadow-md transition-colors duration-300 
                        ${activo ? etapa.color : "bg-gray-300"} cursor-pointer`}
                    >
                      <abbr title={etapa.nombre}>
                        <Icon size={25} />
                      </abbr>
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight
                        className={`${
                          activo ? "text-gray-600" : "text-gray-300"
                        } transition-colors duration-300`}
                        size={22}
                      />
                    )}
                  </div>
                );
                
              })}
              
            </div>
          </div>

          {pedido.estadoActual?.descripcion && (
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-700 font-semibold">
                <span>Estado Actual:</span>
                <Stars className="text-sky-600" />
              </div>
              <h3 className="mt-1 text-gray-800 text-lg font-medium">
                {pedido.estadoActual.nombre}
              </h3>
              <p className="mt-1 text-gray-600 text-sm">
                {pedido.estadoActual.descripcion}
              </p>
            </div>
          )}


          
          <Separator />

          {/* Si la factura no tiene detalles */}
          {pedido.DetalleFactura.length === 0 ? (
            <p className="text-gray-500 text-sm">Esta factura no contiene productos registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Imagen</th>
                    <th className="px-4 py-2 text-left">Producto</th>
                    <th className="px-4 py-2 text-center">Cantidad</th>
                    <th className="px-4 py-2 text-center">Precio Unitario</th>
                    <th className="px-4 py-2 text-center">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.DetalleFactura.map((detalle: any, i: number) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2">
                        <img
                          src={detalle.Productos.Imagen}
                          alt={detalle.Productos.Nombre}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">{detalle.Productos.Nombre}</td>
                      <td className="px-4 py-2 text-center">{detalle.Cantidad}</td>
                      <td className="px-4 py-2 text-center">
                        Q{parseFloat(detalle.PrecioUnitario).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center font-medium">
                        Q{parseFloat(detalle.Subtotal).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total general */}
              <div className="flex justify-end mt-4">
                <p className="font-semibold text-gray-800">
                  Total: Q
                  {pedido.DetalleFactura
                    .reduce(
                      (acc: number, item: any) => acc + parseFloat(item.Subtotal),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <Separator />
        </Card>
      ))
    )}
  </div>

  );
}
