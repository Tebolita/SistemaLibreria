import { Skeleton } from "@/components/ui/skeleton"

export function ProductosPopulares() {
  return (
    <div className="flex flex-row flex-wrap space-x-3 w-full justify-center p-5 -z-1">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="mb-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl bg-indigo-400" />
          <div className="space-y-3 mt-2">
            <Skeleton className="h-4 w-[250px] bg-indigo-400" />
            <Skeleton className="h-4 w-[200px] bg-indigo-400" />
          </div>
        </div>
      ))}
const productos = {
  libros: [
    // Libros clásicos
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: "Q120.00",
      image: "https://i.scdn.co/image/ab67616d0000b273f83a664f67dd705a5ef1105e"
    },
    {
      id: 2,
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      price: "Q85.00",
      image: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/681b63dd7d9dbb4c4ce5ae76_WJlUnXLgNrZqh3HN_u7WMEnTVs1tV0qKwtUkvXJ2JTk.jpeg"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: "Q95.00",
      image: "https://silverlibros.com/wp-content/uploads/2023/01/9788418933011-1984.jpg"
    },
    // Libros juveniles
    {
      id: 4,
      title: "Harry Potter y la piedra filosofal",
      author: "J.K. Rowling",
      price: "Q150.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_JLp7sY_rogYVXXYtdme2lExtJ0g70tAAQ&s"
    },
    {
      id: 5,
      title: "Los juegos del hambre",
      author: "Suzanne Collins",
      price: "Q110.00",
      image: "https://cdn.kemik.gt/2025/01/9788427246003-1200x1200-1.-500x500.jpg"
    },
    // Libros de autoayuda
    {
      id: 6,
      title: "El alquimista",
      author: "Paulo Coelho",
      price: "Q90.00",
      image: "https://cdn.kemik.gt/2023/09/9786073194112-1200x1200-1.jpg"
    },
    {
      id: 7,
      title: "Hábitos atómicos",
      author: "James Clear",
      price: "Q130.00",
      image: "https://tienda.sophosenlinea.com/imagenes/9786077/978607747671.webp"
    },
    // Más libros
    {
      id: 8,
      title: "Crónica de una muerte anunciada",
      author: "Gabriel García Márquez",
      price: "Q75.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStN9soi8eL-hqx_gTdx3Uo0nmO1TBaX1D04A&s"
    },
    {
      id: 9,
      title: "El señor de los anillos",
      author: "J.R.R. Tolkien",
      price: "Q160.00",
      image: "https://es.web.img2.acsta.net/c_310_420/medias/nmedia/18/89/67/45/20061512.jpg"
    },
    {
      id: 10,
      title: "Orgullo y prejuicio",
      author: "Jane Austen",
      price: "Q88.00",
      image: "https://m.media-amazon.com/images/S/pv-target-images/15a41e61c30b3e9df74d61ac747fe3e1d5dc4ba30cf8ca3ac85a9148344efeba.jpg"
    }
  ],
  utiles: [
    // Escritura
    {
      id: 101,
      title: "Lapicero Paper Mate",
      description: "Paquete de 20 unidades - Punta fina",
      price: "Q75.00",
      image: "https://img.pacifiko.com/PROD/resize/1/500x500/ZWRiOWJkZG.jpg"
    },
    {
      id: 102,
      title: "Bolígrafos Bic Cristal",
      description: "Pack x 12 - Azul, negro y rojo",
      price: "Q18.00",
      image: "https://materiales.com.bo/cdn/shop/products/116_700x.jpg?v=1575422928"
    },
    // Corrección
    {
      id: 103,
      title: "Borrador Staedtler",
      description: "Blanco premium - Sin manchas",
      price: "Q8.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7-SYPwhSDvcl0DlK5Zo_dP2uwS4sZE1QBg&s"
    },
    {
      id: 104,
      title: "Correctores líquidos",
      description: "Pack x 3 - Punta pincel",
      price: "Q22.00",
      image: "https://dismartgt.com/cdn/shop/products/correctorplumafast_Mesadetrabajo1.png?v=1641591655"
    },
    // Cuadernos
    {
      id: 105,
      title: "Cuaderno Norma",
      description: "100 hojas rayadas - Espiral",
      price: "Q35.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3K1cDUl4xKlYLHzjSes0MwwPn2A4hvDJg6w&s"
    },
    {
      id: 106,
      title: "Cuaderno Profesional",
      description: "200 hojas - Tapa dura",
      price: "Q55.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6ZErhrCjgxwuh4HTjDBXDWY0m_-fEHoirLw&s"
    },
    // Resaltadores
    {
      id: 107,
      title: "Resaltadores Pastel",
      description: "Set de 6 colores - Punta biselada",
      price: "Q45.00",
      image: "https://walmartgt.vtexassets.com/arquivos/ids/815835/20075_01.jpg?v=638833824077670000"
    },
    // Geometría
    {
      id: 108,
      title: "Juego de geometría",
      description: "Regla, escuadra y transportador",
      price: "Q30.00",
      image: "https://walmartgt.vtexassets.com/arquivos/ids/229398/Juego-De-Geometria-Escolar-1-37723.jpg?v=637751903352630000"
    },
    {
      id: 109,
      title: "Compás profesional",
      description: "Con adaptador para lápices",
      price: "Q28.00",
      image: "https://arriola.com.gt/wp-content/uploads/2021/01/COMPA24.png"
    },
    // Adhesivos
    {
      id: 110,
      title: "Tijeras escolares",
      description: "Punta redonda - 15cm",
      price: "Q20.00",
      image: "https://platino.com.gt/image/cache/catalog/product/6804a1b1071ef_05809-320x320.jpg.webp"
    },
    {
      id: 111,
      title: "Pegamento en barra",
      description: "40g - No tóxico",
      price: "Q12.00",
      image: "https://walmartgt.vtexassets.com/arquivos/ids/763784/59120_01.jpg?v=638755883019470000"
    }
  ]
}


export function ProductosPopulares({ isLoading = false }) {
  return (
    <div className="w-full p-5 space-y-10">
      {/* SECCIÓN LIBROS - VERSIÓN SIMPLIFICADA */}
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
              <div key={libro.id} className="flex flex-col items-center">
                <div className="h-40 w-32 mb-2 overflow-hidden flex items-center justify-center bg-gray-50 rounded-lg">
                  <img
                    src={libro.image}
                    alt={libro.title}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="font-medium text-center">{libro.title}</h3>
                <p className="text-indigo-600 font-bold">{libro.price}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECCIÓN ÚTILES - VERSIÓN SIMPLIFICADA */}
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
              <div key={util.id} className="flex flex-col items-center">
                <div className="h-32 w-24 mb-2 overflow-hidden flex items-center justify-center bg-gray-50 rounded-lg">
                  <img
                    src={util.image}
                    alt={util.title}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium text-center">{util.title}</h3>
                <p className="text-indigo-600 font-bold text-sm">{util.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}