"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Pedidos() {
  const [pedidos] = useState([
    {
      id: "ORD-001",
      fecha: "2025-10-05",
      estado: "Entregado",
      total: 275,
      productos: [
        { nombre: "El Quijote", cantidad: 1, precio: 75 },
        { nombre: "Cien Años de Soledad", cantidad: 1, precio: 200 },
      ],
    },
    {
      id: "ORD-002",
      fecha: "2025-09-22",
      estado: "En tránsito",
      total: 150,
      productos: [
        { nombre: "Don Juan Tenorio", cantidad: 1, precio: 80 },
        { nombre: "Hamlet", cantidad: 1, precio: 70 },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        🧾 Mis pedidos recientes
      </h2>

      {pedidos.map((pedido) => (
        <Card key={pedido.id} className="p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">ID del pedido</p>
              <p className="font-semibold">{pedido.id}</p>
            </div>
            <Badge
              variant={
                pedido.estado === "Entregado"
                  ? "default"
                  : pedido.estado === "En tránsito"
                  ? "secondary"
                  : "outline"
              }
            >
              {pedido.estado}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            {pedido.productos.map((producto, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm text-gray-700"
              >
                <p>
                  {producto.nombre}{" "}
                  <span className="text-gray-500">
                    (x{producto.cantidad})
                  </span>
                </p>
                <p>Q{producto.precio}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">
              Total pagado:{" "}
              <span className="text-green-600 font-semibold">
                Q{pedido.total}
              </span>
            </p>
            <Button variant="outline" size="sm">
              Ver detalles
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
