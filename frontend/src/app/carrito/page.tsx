"use client";

import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeFromCart, clearCart } from "@/components/ui/cartCookie";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CarritoPage() {
  const router = useRouter();
  const [carrito, setCarrito] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = getCart();
    setCarrito(items);
    calcularTotal(items);
  }, []);

  const calcularTotal = (items: any[]) => {
    const totalCalc = items.reduce(
      (acc: number, p: any) => acc + p.precio * p.cantidad,
      0
    );
    setTotal(totalCalc);
  };

  const cambiarCantidad = (id: number, cantidad: number) => {
    updateCartItem(id, cantidad);
    const actualizado = getCart();
    setCarrito(actualizado);
    calcularTotal(actualizado);
  };

  const eliminarProducto = (id: number) => {
    removeFromCart(id);
    const actualizado = getCart();
    setCarrito(actualizado);
    calcularTotal(actualizado);
  };

  const vaciar = () => {
    clearCart();
    setCarrito([]);
    setTotal(0);
  };

  if (carrito.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          Tu carrito está vacío 😔
        </h2>
        <Button
          className="bg-indigo-600 text-white"
          onClick={() => router.push("/")}
        >
          Volver a la tienda
        </Button>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">🛒 Tu carrito</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-indigo-700">
            <th className="p-3">Producto</th>
            <th className="p-3 text-center">Cantidad</th>
            <th className="p-3 text-center">Precio</th>
            <th className="p-3 text-center">Subtotal</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((p) => (
            <tr key={p.idProducto} className="border-b hover:bg-gray-50">
              <td className="p-3 flex items-center gap-3">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{p.nombre}</span>
              </td>
              <td className="p-3 text-center">
                <input
                  type="number"
                  value={p.cantidad}
                  min={1}
                  onChange={(e) =>
                    cambiarCantidad(p.idProducto, parseInt(e.target.value))
                  }
                  className="w-16 text-center border rounded"
                />
              </td>
              <td className="p-3 text-center">Q{p.precio.toFixed(2)}</td>
              <td className="p-3 text-center font-semibold text-indigo-700">
                Q{(p.precio * p.cantidad).toFixed(2)}
              </td>
              <td className="p-3 text-center">
                <Button
                  variant="destructive"
                  onClick={() => eliminarProducto(p.idProducto)}
                >
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

            <div className="flex justify-between items-center mt-8 border-t pt-4">
        <Button
          variant="outline"
          className="border-gray-400 text-gray-700 hover:bg-gray-100"
          onClick={vaciar}
        >
          Vaciar carrito
        </Button>

        <div className="text-right">
          <p className="text-xl font-semibold text-indigo-700">
            Total: Q{total.toFixed(2)}
          </p>
          <Button
            className="mt-3 bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg text-base font-medium"
            onClick={() => router.push("/checkout")}
          >
            Proceder al pago →
          </Button>
        </div>
      </div>

    </div>
  );
}
