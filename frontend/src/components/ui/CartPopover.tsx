"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./button";
import { getCart, removeFromCart, saveCart } from "./cartCookie";
import { Minus, Plus, Trash2, X } from "lucide-react";

type Props = {
  onClose?: () => void;
};

type Item = {
  idProducto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
};

export default function CartPopover({ onClose }: Props) {
  const [carrito, setCarrito] = useState<Item[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Cargar carrito al abrir y refrescar mientras esté visible
  useEffect(() => {
    const load = () => setCarrito(getCart() as Item[]);
    load();
    const id = setInterval(load, 800);
    return () => clearInterval(id);
  }, []);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose?.();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const cambiar = (id: number, delta: number) => {
    const nuevo = carrito.map((p) =>
      p.idProducto === id
        ? { ...p, cantidad: Math.max(1, p.cantidad + delta) }
        : p
    );
    saveCart(nuevo);
    setCarrito(nuevo);
  };

  const eliminar = (id: number) => {
    removeFromCart(id);
    setCarrito(getCart() as Item[]);
  };

  const total = carrito.reduce((a, p) => a + p.precio * p.cantidad, 0);

  return (
    <div
      ref={ref}
      className="w-80 bg-white border shadow-xl rounded-xl p-3 z-50"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Tu carrito</h3>
        <button onClick={onClose} aria-label="Cerrar" className="p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {carrito.length === 0 ? (
        <p className="text-sm text-zinc-500">Carrito vacío</p>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto pr-1 space-y-2">
            {carrito.map((p) => (
              <div
                key={p.idProducto}
                className="grid grid-cols-[48px,1fr,auto] items-center gap-2 border-b pb-2"
              >
                <img
                  src={p.imagen || "/placeholder.png"}
                  alt={p.nombre}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{p.nombre}</div>
                  <div className="text-xs text-zinc-500">
                    Q{p.precio.toFixed(2)}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1">
                    <button
                      className="h-6 w-6 border rounded flex items-center justify-center"
                      onClick={() => cambiar(p.idProducto, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-6 text-center">{p.cantidad}</span>
                    <button
                      className="h-6 w-6 border rounded flex items-center justify-center"
                      onClick={() => cambiar(p.idProducto, +1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    Q{(p.precio * p.cantidad).toFixed(2)}
                  </div>
                  <button
                    className="text-zinc-500 hover:text-red-600 inline-flex items-center gap-1 mt-1"
                    onClick={() => eliminar(p.idProducto)}
                  >
                    <Trash2 className="w-4 h-4" /> <span className="text-xs">Quitar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="font-semibold">Total</span>
            <span className="font-bold">Q{total.toFixed(2)}</span>
          </div>

          <div className="flex gap-2 mt-3">
            <Button asChild variant="outline" className="w-1/2" onClick={onClose}>
              <Link href="/carrito">Ver carrito</Link>
            </Button>
            <Button asChild className="w-1/2" onClick={onClose}>
              <Link href="/checkout">Comprar</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
