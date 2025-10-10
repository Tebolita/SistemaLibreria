"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { addToCart } from "@/components/ui/cartCookie";
import { useCategoria } from "@/hooks/useCategorias";
import { useProductos } from "@/hooks/useProductos";

/* Fondo visual por categoría */
const fondosPorCategoria: Record<string, string> = {
  Libros: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
  Papeleria: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
  Marcadores: "https://plus.unsplash.com/premium_photo-1724153088296-f2c46f792ce1?q=80&w=1171&auto=format",
  LibrosInfantiles: "https://images.unsplash.com/photo-1574165425193-609abebe225c?q=80&w=1170",
  default: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
};

function obtenerFondoPorCategoria(nombreCategoria: string): string {
  if (!nombreCategoria) return fondosPorCategoria.default;
  
  const textoLimpio = nombreCategoria.toLowerCase().trim();
  console.log("Buscando fondo para:", textoLimpio); // Para debug
  
  // Patrones para cada categoría - CORREGIDOS
  if (/\b(libros infantiles|infantil|niñ[oa]s?|kids|children|cuento infantil)\b/.test(textoLimpio)) {
    return fondosPorCategoria.LibrosInfantiles;
  }


  if (/\b(libros?|lectura|novela|cuento|revistas?)\b/.test(textoLimpio)) {
    return fondosPorCategoria.Libros;
  }
  
  if (/\b(papeler[ií]a|cuaderno|lápices?|lapices?|bol[ií]grafos?)\b/.test(textoLimpio)) {
    return fondosPorCategoria.Papeleria;
  }
  
  if (/\b(marcadores?|resaltadores?|highlighters?)\b/.test(textoLimpio)) {
    return fondosPorCategoria.Marcadores;
  }
  
  return fondosPorCategoria.default;
}

/* Modal simple sin dependencias externas */
function SimpleModal({ open, onClose, producto }: { open: boolean; onClose: () => void; producto?: any }) {
  if (!open || !producto) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-[90%] relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={producto.Imagen || "https://cdn-icons-png.flaticon.com/512/29/29302.png"}
          alt={producto.Nombre}
          className="w-full h-56 object-contain rounded-lg mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{producto.Nombre}</h2>
        <p className="text-gray-700 mb-4">
          {producto.Descripcion || "Sin descripción disponible."}
        </p>
        <p className="text-green-600 text-xl font-bold mb-4">Q{producto.Precio}</p>
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => {
            addToCart({
              idProducto: producto.IdProducto,
              nombre: producto.Nombre,
              precio: producto.Precio,
              cantidad: 1,
              imagen: producto.Imagen,
            });
            toast.success(`"${producto.Nombre}" agregado al carrito 🛒`);
            onClose();
          }}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

export default function CategoriaPage() {
  const { nombre } = useParams();
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);
  const [nombreCategoria, setNombreCategoria] = useState("");

  const { categoriasActivas } = useCategoria();
  const { ProductosPorCategoria } = useProductos();

  /* 🔹 Cargar productos solo una vez por categoría */
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const categorias = await categoriasActivas();
        const categoria = categorias.find(
          (c: any) => c.Nombre.toLowerCase() === String(nombre).toLowerCase().replace(/\+|%20/g, " ")
        );
        
        if (!categoria) {
          setProductos([]);
          setNombreCategoria(""); // Resetear nombre si no hay categoría
          return;
        }
        
        const productosData = await ProductosPorCategoria(categoria.IdCategoria);
        setNombreCategoria(categoria.Nombre);
        setProductos(Array.isArray(productosData) ? productosData : []);
      } catch (error) {
        console.error("Error cargando productos:", error);
        toast.error("Error al cargar los productos");
        setNombreCategoria(""); // Resetear en caso de error
      } finally {
        setLoading(false);
      }
    };
    
    if (nombre) fetchProductos();
  }, [nombre]);

  // ✅ Calcular el fondo SOLO cuando nombreCategoria cambie
  const fondo = obtenerFondoPorCategoria(nombreCategoria);

  return (
    <div className="min-h-screen">
      {/* 🖼️ Banner superior - solo mostrar si hay nombreCategoria */}
      {nombreCategoria && (
        <div
          className="relative h-60 w-full bg-cover bg-center flex flex-col items-center justify-center text-white"
          style={{ backgroundImage: `url(${fondo})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <h1 className="relative z-10 text-4xl font-bold capitalize">{nombreCategoria}</h1>
          <p className="relative z-10 text-gray-200">
            Explora nuestros productos de la categoría {nombreCategoria}.
          </p>
        </div>
      )}

      {/* 🛍️ Productos */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : productos.length > 0 ? (
          productos.map((item) => (
            <div
              key={item.IdProducto}
              className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center hover:shadow-xl transition"
            >
              <img
                src={item.Imagen || "https://cdn-icons-png.flaticon.com/512/29/29302.png"}
                alt={item.Nombre}
                className="h-40 object-contain mb-2"
              />
              <h3 className="font-medium text-center text-sm mb-1">{item.Nombre}</h3>
              <p className="text-gray-500 text-xs text-center mb-2">
                {item.Descripcion || "Sin descripción"}
              </p>
              <p className="text-indigo-600 font-bold mb-3">Q{item.Precio}</p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                  onClick={() => {
                    setProductoSeleccionado(item);
                    setModalOpen(true);
                  }}
                >
                  Ver descripción
                </Button>

                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => {
                    addToCart({
                      idProducto: item.IdProducto,
                      nombre: item.Nombre,
                      precio: item.Precio,
                      cantidad: 1,
                      imagen: item.Imagen,
                    });
                    toast.success(`"${item.Nombre}" agregado al carrito 🛒`);
                  }}
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No hay productos en esta categoría 😅
          </p>
        )}
      </div>

      {/* Modal de detalle */}
      <SimpleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        producto={productoSeleccionado}
      />
    </div>
  );
}