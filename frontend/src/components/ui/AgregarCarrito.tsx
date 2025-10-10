"use client";

import React, { JSX } from "react";
import { addToCart } from "./cartCookie";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { Button } from "./button";

interface Props {
  producto: {
    idProducto: number;
    nombre: string;
    precio: number;
    imagen?: string;
  };
}

export default function AgregarCarrito({ producto }: Props): JSX.Element {
  const agregar = () => {
    addToCart({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      imagen: producto.imagen,
    });

    toast.success(`🛒 "${producto.nombre}" agregado al carrito`);
  };

  return (
    <Button
      onClick={agregar}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
    >
      <ShoppingCart className="w-4 h-4" />
      Agregar
    </Button>
  );
}
