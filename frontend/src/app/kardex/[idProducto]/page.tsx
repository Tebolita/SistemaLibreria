"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useKardex } from "@/hooks/useKardex";
import { Skeleton } from "@/components/ui/skeleton";

export default function KardexProductoPage() {
  const { idProducto } = useParams();
  const { obtenerPorProducto } = useKardex();
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerPorProducto(Number(idProducto));
      setMovimientos(data);
      setLoading(false);
    };
    cargar();
  }, [idProducto]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Kardex del Producto #{idProducto}
      </h1>

      {loading ? (
        <Skeleton className="h-20 w-full" />
      ) : movimientos.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-2">Fecha</th>
                <th className="p-2">Movimiento</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Precio Unitario</th>
                <th className="p-2">Stock Anterior</th>
                <th className="p-2">Stock Actual</th>
                <th className="p-2">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((m, i) => (
                <tr
                  key={i}
                  className={`border-b ${
                    m.TipoMovimiento === "Salida"
                      ? "bg-red-50"
                      : m.TipoMovimiento === "Entrada"
                      ? "bg-green-50"
                      : "bg-yellow-50"
                  }`}
                >
                  <td className="p-2">{new Date(m.Fecha).toLocaleDateString()}</td>
                  <td className="p-2 font-semibold">{m.TipoMovimiento}</td>
                  <td className="p-2">{m.Cantidad}</td>
                  <td className="p-2">Q{m.PrecioUnitario?.toFixed(2)}</td>
                  <td className="p-2">{m.StockAnterior}</td>
                  <td className="p-2">{m.StockActual}</td>
                  <td className="p-2">{m.Descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No hay movimientos registrados en este producto 📦
        </p>
      )}
    </div>
  );
}
