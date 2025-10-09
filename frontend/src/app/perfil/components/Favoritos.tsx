"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      nombre: "El Principito",
      precio: 120,
      imagen:
        "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    },
    {
      id: 2,
      nombre: "Don Quijote de la Mancha",
      precio: 90,
      imagen:
        "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    },
  ]);

  const quitarFavorito = (id: number) => {
    setFavoritos(favoritos.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        ❤️ Tus productos favoritos
      </h2>

      {favoritos.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No tienes productos guardados como favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritos.map((producto) => (
            <Card
              key={producto.id}
              className="p-4 space-y-3 flex flex-col items-center text-center shadow-sm"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-24 h-24 object-contain"
              />
              <h3 className="font-semibold text-gray-800 text-sm">
                {producto.nombre}
              </h3>
              <p className="text-green-600 font-medium text-sm">
                Q{producto.precio}
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => quitarFavorito(producto.id)}
                >
                  <Heart className="h-4 w-4 text-red-500" />
                </Button>
                <Button size="sm">
                  <ShoppingCart className="h-4 w-4 mr-1" /> Agregar al carrito
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
