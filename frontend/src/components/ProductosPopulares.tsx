"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AgregarCarrito from "@/components/ui/AgregarCarrito";
import { useProductos } from "@/hooks/useProductos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  filtro?: string;
  isLoading?: boolean;
}

export function ProductosPopulares({ filtro = "Todos", isLoading = false }: Props) {
  const { ObtenerActivos } = useProductos();
  const [productos, setProductos] = useState<any[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const lista = await ObtenerActivos();
        const filtrados =
          filtro === "Todos"
            ? lista
            : lista.filter((p: any) =>
                p.Categoria?.toLowerCase().includes(filtro.toLowerCase())
              );
        setProductos(filtrados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }
    cargarProductos();
  }, [filtro]);

  return (
    <ProtectedRoute allowedRoles={["guest", "Cliente", "Administrador"]}>
      <div className="w-full space-y-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            [...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))
          ) : productos.length > 0 ? (
            <motion.div
              key={filtro}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {productos.map((producto) => (
                <motion.div
                  key={producto.IdProducto}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center transition-all duration-300 border border-gray-100"
                >
                  <div className="relative w-full h-40 flex justify-center items-center overflow-hidden rounded-lg mb-3">
                    <img
                      src={producto.Imagen}
                      alt={producto.Nombre}
                      className="h-full object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-center text-base text-gray-800 line-clamp-2">
                    {producto.Nombre}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-1 text-sm">
                    Q{Number(producto.Precio).toFixed(2)}
                  </p>

                  <div className="flex flex-col gap-2 mt-3 w-full">
                    <AgregarCarrito
                      producto={{
                        idProducto: producto.IdProducto,
                        nombre: producto.Nombre,
                        precio: Number(producto.Precio),
                        imagen: producto.Imagen,
                      }}
                    />
                    <Button
                      variant="outline"
                      className="w-full border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                      onClick={() => setProductoSeleccionado(producto)}
                    >
                      Ver más detalles
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-gray-500 text-center py-10"
            >
              No se encontraron productos en esta categoría.
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL DE DETALLES */}
        {productoSeleccionado && (
          <Dialog open={true} onOpenChange={() => setProductoSeleccionado(null)}>
            <DialogContent className="max-w-lg rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-indigo-700 font-bold">
                  {productoSeleccionado.Nombre}
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={productoSeleccionado.Imagen}
                  alt={productoSeleccionado.Nombre}
                  className="h-48 object-contain rounded-lg"
                />
                <p className="text-gray-600 text-sm">
                  {productoSeleccionado.Descripcion || "Sin descripción disponible."}
                </p>
                <p className="text-indigo-600 font-bold text-lg">
                  Q{Number(productoSeleccionado.Precio).toFixed(2)}
                </p>

                <AgregarCarrito
                  producto={{
                    idProducto: productoSeleccionado.IdProducto,
                    nombre: productoSeleccionado.Nombre,
                    precio: Number(productoSeleccionado.Precio),
                    imagen: productoSeleccionado.Imagen,
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ProtectedRoute>
  );
}
