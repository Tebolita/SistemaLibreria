"use client";
import  Administracion    from "@/app/Administracion/page";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import CartaPersonalizada from "@/components/Propios/cartaPersonalizada"
import { etiquetaNuevo, etiquetaPopular, etiquetaProveedor } from "../types/etiquetas";
export default function productos() {

  const cartaPersonalizadaData = [
    {
        idProducto: 1,
        Titulo: "Libro de Ejemplo",
        foto: "https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg",
        fechaAgregado: "Fecha de creacion 📆 2024-10-01",
        badgeArray: [
           etiquetaNuevo ,
           etiquetaProveedor ,
           etiquetaPopular 
        ]
    },
    {
        idProducto: 2,
        Titulo: "Libro de Ejemplo",
        foto: "https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg",
        fechaAgregado: `Fecha de creacion 📆 2024-10-01`,
        badgeArray: [
           etiquetaNuevo ,
           etiquetaProveedor ,
           etiquetaPopular 
        ]
    }, 
    {
        idProducto: 3,
        Titulo: "Libro de Ejemplo",
        foto: "https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg",
        fechaAgregado: "Fecha de creacion 📆 2024-10-01",
        badgeArray: [
           etiquetaNuevo ,
           etiquetaProveedor ,
           etiquetaPopular 
        ]
    },      
  ]
  return (
      <ProtectedRoute allowedRoles={["Administrador"]}> 
        <Administracion>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <h1 className="text-2xl font-bold">Productos Nuevos</h1>
                <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-1 xl:grid-cols-3">
                  <CartaPersonalizada cartaPersonalizadaData={cartaPersonalizadaData} />
                </div>
              </div>
            </div>
          </div>
        </Administracion>
      </ProtectedRoute>
  );
}