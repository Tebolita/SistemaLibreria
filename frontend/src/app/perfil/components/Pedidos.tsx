"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDetalleFactura } from "@/hooks/useDetalleFactura";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const { todos } = useDetalleFactura();

  useEffect(() => {
    const cargarPedidos = async () => {
      const data = await todos();
      setPedidos(data);
    };
    cargarPedidos();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">🧾 Mis pedidos recientes</h2>

      {pedidos.length === 0 ? (
        <p className="text-gray-500">Aún no tienes pedidos registrados.</p>
      ) : (
        pedidos.map((pedido: any, index) => (
          <Card key={index} className="p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Factura</p>
                <p className="font-semibold">#{pedido.IdFactura}</p>
              </div>
              <Badge variant="secondary">Completado</Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                Producto ID: {pedido.IdProducto} — Cantidad: {pedido.Cantidad}
              </p>
              <p className="text-sm text-gray-700">
                Subtotal: Q{ parseFloat(pedido.Subtotal).toFixed(2)}
              </p>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button size="sm" variant="outline">
                Ver detalles
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
