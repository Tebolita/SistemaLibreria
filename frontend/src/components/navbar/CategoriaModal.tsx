"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Book, Newspaper, PenTool, Highlighter, Baby, Laptop } from "lucide-react";

interface CategoriaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categorias = [
  { nombre: "Libros", icono: <Book size={28} />, color: "bg-blue-100 text-blue-600" },
  { nombre: "Revistas", icono: <Newspaper size={28} />, color: "bg-yellow-100 text-yellow-600" },
  { nombre: "Papelería", icono: <PenTool size={28} />, color: "bg-green-100 text-green-600" },
  { nombre: "Marcadores", icono: <Highlighter size={28} />, color: "bg-orange-100 text-orange-600" },
  { nombre: "Libros Infantiles", icono: <Baby size={28} />, color: "bg-pink-100 text-pink-600" },
  { nombre: "Tecnología", icono: <Laptop size={28} />, color: "bg-indigo-100 text-indigo-600" },
];

export default function CategoriaModal({ isOpen, onClose }: CategoriaModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel lateral */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[350px] bg-white z-50 shadow-lg p-6 rounded-r-2xl overflow-y-auto"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700">Categorías</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categorias.map((cat) => (
                <div
                  key={cat.nombre}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer shadow-sm hover:shadow-md hover:scale-105 transition-transform ${cat.color}`}
                  onClick={() => console.log(`Seleccionaste ${cat.nombre}`)}
                >
                  <div className="mb-2">{cat.icono}</div>
                  <span className="text-sm font-semibold">{cat.nombre}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
