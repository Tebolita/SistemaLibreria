"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { Categorias } from "@/Apis/Categorias.api";

// 🎨 Fondo para cada categoría
const fondosPorCategoria: Record<string, string> = {
  Libros:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
  Revistas:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  Papeleria:
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
  Marcadores:
    "https://plus.unsplash.com/premium_photo-1724153088296-f2c46f792ce1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  LibrosInfantiles:
    "https://images.unsplash.com/photo-1574165425193-609abebe225c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

interface CategoriaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: Categorias[];
}

export default function CategoriaDrawer({
  isOpen,
  onClose,
  categorias,
}: CategoriaDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[9998]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer lateral */}
          <motion.div
            className="fixed top-0 left-0 h-screen w-[360px] bg-white z-[9999] shadow-2xl overflow-y-auto rounded-r-2xl"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-indigo-700">Categorías</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lista visual de categorías */}
            <div className="flex flex-col gap-3 p-4">
              {categorias.length > 0 ? (
                categorias.map((cat) => {
                  const fondo =
                    fondosPorCategoria[cat.Nombre] ||
                    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80";

                  return (
                    <Link
                      key={cat.Nombre}
                      href={`/categorias/${cat.Nombre}`}
                      onClick={onClose}
                      className="relative h-[120px] w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] group"
                    >
                      <img
                        src={fondo}
                        alt={cat.Nombre}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 group-hover:from-indigo-800/50 transition-all" />
                      <div className="absolute inset-0 flex flex-col items-start justify-center px-5">
                        <h3 className="text-white text-lg font-bold capitalize drop-shadow-md">
                          {cat.Nombre}
                        </h3>
                        <p className="text-gray-200 text-sm">Ver productos</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">
                  Cargando categorías...
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
