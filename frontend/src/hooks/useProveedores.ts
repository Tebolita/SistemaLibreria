import { proveedorService } from "@/service/proveedorService";


export default function useProveedores() {

    const proveedoresTodos = async () => {
        try {
            const proveedores = await proveedorService.todos();
            return proveedores;
        } catch (error) {
            console.error("Error fetching proveedores:", error);
            return [];
        }
    };

    const proveedoresCrear = async (data: any) => {
        try {
            const clearData = {
                NombreEmpresa: data.NombreEmpresa,
                Contacto: data.Contacto,
                Telefono: data.Telefono,
                Correo: data.Correo,
                Estado: Boolean(data.Estado),
            };
            console.log("Clean Data:", clearData);
            const proveedor = await proveedorService.crear(clearData);
            return proveedor;
        } catch (error) {
            console.error("Error creating proveedor:", error);
            return null;
        }
    };
    
    const proveedoresActualizar = async (id: number, data: any) => {
        try {
            const proveedor = await proveedorService.actualizar(id, data);
            return proveedor;
        } catch (error) {
            console.error("Error updating proveedor:", error);
            return null;
        }
    };
        const proveedoresCambiarEstado = async (id: number) => {
        try {
            const proveedor = await proveedorService.cambiarEstado(id);
            return proveedor;
        } catch (error) {
            console.error("Error changing proveedor state:", error);
            return null;
        }
    };
    return {
        proveedoresTodos,
        proveedoresCrear,
        proveedoresActualizar,
        proveedoresCambiarEstado
    };
}
