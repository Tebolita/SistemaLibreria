"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { addToCart } from "@/components/ui/cartCookie";
import { useProductos } from "@/hooks/useProductos";
import Link from "next/link";

export default function DetalleProductoPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<any>(null);
  const [relacionados, setRelacionados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { obtenerUnico, ProductosPorCategoria } = useProductos();

  // 🔹 Traer producto individual
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await obtenerUnico(Number(id));
        setProducto(data);

        // 🔸 Una vez que lo tengamos, traemos sus relacionados
        if (data?.IdCategoria) {
          const similares = await ProductosPorCategoria(data.IdCategoria);
          const filtrados = similares.filter(
            (p: any) => p.IdProducto !== data.IdProducto
          );
          setRelacionados(filtrados);
        }
      } catch (error) {
        toast.error("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    addToCart({
      idProducto: producto.IdProducto,
      nombre: producto.Nombre,
      precio: producto.Precio,
      cantidad: 1,
      imagen: producto.Imagen,
    });
    toast.success(`"${producto.Nombre}" agregado al carrito 🛒`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Producto no encontrado 😢
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-24 p-6">
      {/* 📦 Detalle principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Imagen */}
        <div className="flex justify-center items-center">
          <img
            src={
              producto.Imagen ||
              "https://cdn-icons-png.flaticon.com/512/29/29302.png"
            }
            alt={producto.Nombre}
            className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Descripción */}
        <div className="flex flex-col justify-center space-y-5">
          <h1 className="text-3xl font-bold text-indigo-700">
            {producto.Nombre}
          </h1>
          <p className="text-gray-700 leading-relaxed">
            {producto.Descripcion || "Sin descripción disponible"}
          </p>
          <p className="text-2xl font-semibold text-green-600">
            Q{producto.Precio}
          </p>

          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-1/2 md:w-1/3"
            onClick={agregarAlCarrito}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>

      {/* 🧩 Productos relacionados */}
      {relacionados.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relacionados.map((item) => (
              <div
                key={item.IdProducto}
                className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center hover:shadow-lg transition"
              >
                <img
                  src={
                    item.Imagen ||
                    "https://cdn-icons-png.flaticon.com/512/29/29302.png"
                  }
                  alt={item.Nombre}
                  className="h-36 object-contain mb-2"
                />
                <h3 className="font-medium text-center text-sm mb-1">
                  {item.Nombre}
                </h3>
                <p className="text-indigo-600 font-bold mb-2">
                  Q{item.Precio}
                </p>
                <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link href={`/producto/${item.IdProducto}`}>Ver detalle</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
