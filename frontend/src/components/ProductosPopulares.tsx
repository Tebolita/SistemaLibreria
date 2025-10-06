"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AgregarCarrito from "@/components/ui/AgregarCarrito"; // 🟢 Asegúrate de tener este archivo

const productos = {
  libros: [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: "Q120.00",
      image:
        "https://i.scdn.co/image/ab67616d0000b273f83a664f67dd705a5ef1105e",
    },
    {
      id: 2,
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      price: "Q85.00",
      image:
        "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/681b63dd7d9dbb4c4ce5ae76_WJlUnXLgNrZqh3HN_u7WMEnTVs1tV0qKwtUkvXJ2JTk.jpeg",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: "Q95.00",
      image: "https://silverlibros.com/wp-content/uploads/2023/01/9788418933011-1984.jpg",
    },
    {
      id: 4,
      title: "Harry Potter y la piedra filosofal",
      author: "J.K. Rowling",
      price: "Q150.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_JLp7sY_rogYVXXYtdme2lExtJ0g70tAAQ&s",
    },
    {
      id: 5,
      title: "Los juegos del hambre",
      author: "Suzanne Collins",
      price: "Q110.00",
      image:
        "https://cdn.kemik.gt/2025/01/9788427246003-1200x1200-1.-500x500.jpg",
    },
    {
      id: 6,
      title: "El alquimista",
      author: "Paulo Coelho",
      price: "Q90.00",
      image:
        "https://cdn.kemik.gt/2023/09/9786073194112-1200x1200-1.jpg",
    },
    {
      id: 7,
      title: "Hábitos atómicos",
      author: "James Clear",
      price: "Q130.00",
      image:
        "https://tienda.sophosenlinea.com/imagenes/9786077/978607747671.webp",
    },
    {
      id: 8,
      title: "Crónica de una muerte anunciada",
      author: "Gabriel García Márquez",
      price: "Q75.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStN9soi8eL-hqx_gTdx3Uo0nmO1TBaX1D04A&s",
    },
    {
      id: 9,
      title: "El señor de los anillos",
      author: "J.R.R. Tolkien",
      price: "Q160.00",
      image:
        "https://es.web.img2.acsta.net/c_310_420/medias/nmedia/18/89/67/45/20061512.jpg",
    },
    {
      id: 10,
      title: "Orgullo y prejuicio",
      author: "Jane Austen",
      price: "Q88.00",
      image:
        "https://m.media-amazon.com/images/S/pv-target-images/15a41e61c30b3e9df74d61ac747fe3e1d5dc4ba30cf8ca3ac85a9148344efeba.jpg",
    },
  ],
  utiles: [
    {
      id: 101,
      title: "Lapicero Paper Mate",
      price: "Q75.00",
      image: "https://img.pacifiko.com/PROD/resize/1/500x500/ZWRiOWJkZG.jpg",
    },
    {
      id: 102,
      title: "Bolígrafos Bic Cristal",
      price: "Q18.00",
      image: "https://materiales.com.bo/cdn/shop/products/116_700x.jpg?v=1575422928",
    },
    {
      id: 103,
      title: "Borrador Staedtler",
      price: "Q8.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7-SYPwhSDvcl0DlK5Zo_dP2uwS4sZE1QBg&s",
    },
    {
      id: 104,
      title: "Correctores líquidos",
      price: "Q22.00",
      image:
        "https://dismartgt.com/cdn/shop/products/correctorplumafast_Mesadetrabajo1.png?v=1641591655",
    },
    {
      id: 105,
      title: "Cuaderno Norma",
      price: "Q35.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3K1cDUl4xKlYLHzjSes0MwwPn2A4hvDJg6w&s",
    },
    {
      id: 106,
      title: "Cuaderno Profesional",
      price: "Q55.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6ZErhrCjgxwuh4HTjDBXDWY0m_-fEHoirLw&s",
    },
  ],
};

export function ProductosPopulares({ isLoading = false }) {
  return (
    <ProtectedRoute allowedRoles={["guest", "Cliente", "Administrador"]}>
      <div className="w-full p-5 space-y-10">

        {/* 📚 SECCIÓN LIBROS */}
        <div>
          <h2 className="text-2xl font-bold mb-5 text-center">Libros Populares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {isLoading ? (
              [...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              productos.libros.map((libro) => (
                <div
                  key={libro.id}
                  className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={libro.image}
                    alt={libro.title}
                    className="h-40 object-contain mb-2"
                  />
                  <h3 className="font-semibold text-center text-sm">
                    {libro.title}
                  </h3>
                  <p className="text-indigo-600 font-bold text-sm">
                    {libro.price}
                  </p>

                  {/* 🛒 Botón para agregar al carrito */}
                  <AgregarCarrito
                    producto={{
                      idProducto: libro.id,
                      nombre: libro.title,
                      precio: Number(libro.price.replace("Q", "")),
                      imagen: libro.image,
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* ✏️ SECCIÓN ÚTILES */}
        <div>
          <h2 className="text-2xl font-bold mb-5 text-center">Útiles Escolares</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {isLoading ? (
              [...Array(12)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-32 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              productos.utiles.map((util) => (
                <div
                  key={util.id}
                  className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={util.image}
                    alt={util.title}
                    className="h-32 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-center">{util.title}</h3>
                  <p className="text-indigo-600 font-bold text-sm">
                    {util.price}
                  </p>

                  {/* 🛒 Botón para agregar al carrito */}
                  <AgregarCarrito
                    producto={{
                      idProducto: util.id,
                      nombre: util.title,
                      precio: Number(util.price.replace("Q", "")),
                      imagen: util.image,
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
