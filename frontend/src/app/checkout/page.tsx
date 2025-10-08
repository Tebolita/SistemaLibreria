"use client";

import { useEffect, useState } from "react";
import { getCart, clearCart } from "@/components/ui/cartCookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useFacturas } from "@/hooks/useFacturas";

export default function CheckoutPage() {
  const router = useRouter();
  const [carrito, setCarrito] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const [pago, setPago] = useState("efectivo");
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  //Consumo de hook personalizado para facturas
  const { crearFactura } = useFacturas()



  // 🧾 Cargar carrito
  useEffect(() => {
    const items = getCart();
    setCarrito(items);
    const totalCalc = items.reduce(
      (acc: number, p: any) => acc + p.precio * p.cantidad,
      0
    );
    setTotal(totalCalc);
  }, []);

  // 🛍️ Confirmar compra
  const confirmarCompra = async () => {
    if (!cliente.nombre || !cliente.direccion || !cliente.telefono) {
      toast.error("Por favor completa todos los campos del cliente.");
      return;
    }

    const datosFactura = {
      "IdCliente": 1,
      "Fecha": Date.now(),
      "Total": total,
      "IdUsuario": 1,
      "IdMetodoPago": 1
    }
    const respuestaFactura = await crearFactura(datosFactura)
    toast.success(respuestaFactura.message)
    console.log(respuestaFactura.data)


    toast.success("Compra confirmada correctamente 🛍️");
    clearCart();
    setCompraFinalizada(true);
  };

  // ✅ Si ya finalizó la compra
  if (compraFinalizada) {
    return (
      <div className="max-w-lg mx-auto mt-16 bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          ¡Gracias por tu compra! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido recibido correctamente.
          <br />
          En breve recibirás información sobre el estado de tu envío.
        </p>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg"
          onClick={() => router.push("/seguimiento")}
        >
          Ver seguimiento de la compra →
        </Button>
      </div>
    );
  }

  // 🧾 Checkout principal
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md mb-10">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Finalizar compra
      </h1>

      {/* 🛒 Resumen del carrito */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Resumen del carrito</h2>
        {carrito.length === 0 ? (
          <p className="text-gray-600">Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map((p) => (
              <div
                key={p.idProducto}
                className="flex justify-between border-b py-2 text-sm"
              >
                <div>
                  <strong>{p.nombre}</strong>
                  <p>
                    {p.cantidad} x Q{p.precio.toFixed(2)}
                  </p>
                </div>
                <span className="text-indigo-700 font-medium">
                  Q{(p.precio * p.cantidad).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="text-right mt-2 font-bold">
              Total: Q{total.toFixed(2)}
            </div>
          </>
        )}
      </section>

      {/* 👤 Datos del cliente */}
      <section className="border-t pt-4 mt-4">
        <h2 className="text-lg font-semibold mb-3">Datos del cliente</h2>
        <div className="space-y-3">
          <Input
            placeholder="Nombre completo"
            value={cliente.nombre}
            onChange={(e) =>
              setCliente({ ...cliente, nombre: e.target.value })
            }
          />
          <Input
            placeholder="Dirección de entrega"
            value={cliente.direccion}
            onChange={(e) =>
              setCliente({ ...cliente, direccion: e.target.value })
            }
          />
          <Input
            placeholder="Teléfono de contacto"
            value={cliente.telefono}
            onChange={(e) =>
              setCliente({ ...cliente, telefono: e.target.value })
            }
          />
        </div>
      </section>

      {/* 💳 Método de pago */}
      <section className="border-t pt-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">Método de pago</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pago"
              value="efectivo"
              checked={pago === "efectivo"}
              onChange={(e) => setPago(e.target.value)}
            />
            <span>Pago en efectivo (al recibir)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pago"
              value="transferencia"
              checked={pago === "transferencia"}
              onChange={(e) => setPago(e.target.value)}
            />
            <span>Transferencia bancaria</span>
          </label>

          {pago === "transferencia" && (
            <div className="mt-3 text-sm bg-gray-50 p-3 rounded-md border">
              <p>
                <strong>Banco:</strong> Banrural
              </p>
              <p>
                <strong>No. de cuenta:</strong> 123-456789-0
              </p>
              <p>
                <strong>Titular:</strong> Librería SPD
              </p>
              <p className="text-gray-500 mt-1">
                Envíe el comprobante al correo:{" "}
                <span className="text-indigo-600">pagos@libreriaspd.com</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ✅ BOTÓN DE CONFIRMAR */}
      <div className="border-t pt-6 mt-6">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition"
          onClick={confirmarCompra}
        >
          Confirmar compra
        </Button>
      </div>
    </div>
  );
}
