import { estadoFacturaServices } from "@/service/estadoFacturaServices";




export function useEstadoFactura() {
    const estadoCrear = async (data: any) => {
        const dateStringIso: string = new Date().toISOString();
        try {
            const clearData = {
                IdEstadoEnvio: data.IdEstadoEnvio,
                IdFactura: data.IdFactura,
                Fecha: dateStringIso
            };
            const estodoFactura = await estadoFacturaServices.crear(clearData);
            return estodoFactura;
        } catch (error) {
            console.error("Error creating proveedor:", error);
            return null;
        }
    };



    const traerPorFactura = async (idFactura: number) => {
        try {
            const envios = await estadoFacturaServices.traerPorFactura(idFactura)
            return envios
        } catch (error) {
            return { message: "Error al obtener los envios", error };
        }
    }

    return { traerPorFactura, estadoCrear }
}