import { DetallefacturaServices } from "@/service/DetalleFacturaServices";


const API = "http://localhost:4000/api/detalle-factura/";

export function useDetalleFactura() {
  // 🔹 Obtener todos los detalles de factura
  const todos = async () => {
    try {
      const response = await fetch(`${API}todos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Error al obtener detalles");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error obteniendo detalles:", error);
      return [];
    }
  };

  // 🔹 Crear detalle de factura (uno por producto)
  const crearDetalle = async (detalle: any) => {
    try {
      const response = await fetch(`${API}crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detalle),
      });

      if (!response.ok) throw new Error("Error al crear detalle de factura");

      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      console.error("Error creando detalle:", error);
      return { ok: false, message: "Error con el servidor" };
    }
  };

  // 🔹 Obtener detalles por IdFactura
  const obtenerPorFactura = async (idFactura: number) => {
    try {
      const response = await fetch(`${API}por-factura/${idFactura}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Error al obtener detalles por factura");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error obteniendo detalles por factura:", error);
      return [];
    }
  };
const DFTodos = async () => {
            try {
                const proveedores = await DetallefacturaServices.todos();
                return proveedores;
            } catch (error) {
                console.error("Error fetching proveedores:", error);
                return [];
            }
        };
    
        const DFcrear = async (data: any) => {
            try {
                const clearData = {
                    NombreEmpresa: data.NombreEmpresa,
                    Contacto: data.Contacto,
                    Telefono: data.Telefono,
                    Correo: data.Correo,
                    Estado: Boolean(data.Estado),
                };
                console.log("Clean Data:", clearData);
                const proveedor = await DetallefacturaServices.crear(clearData);
                return proveedor;
            } catch (error) {
                console.error("Error creating proveedor:", error);
                return null;
            }
        };
        const DFUnico = async(id:number)=>{
            try{
                const DFUnico = await DetallefacturaServices.unico(id)
                return DFUnico;
            }catch(error){
                console.error(error)
                return null
            }
        }
        const DFActualizar = async (id: number, data: any) => {
            try {
                const proveedor = await DetallefacturaServices.actualizar(id, data);
                return proveedor;
            } catch (error) {
                console.error("Error updating proveedor:", error);
                return null;
            }
        };
  return { todos, crearDetalle, obtenerPorFactura ,DFTodos,DFActualizar,DFcrear,DFUnico};
}
