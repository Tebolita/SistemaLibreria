import { facturasServices } from "@/service/facturasSerives";

export function useFacturas() {

    const todos = async () => {
 try {  
        const facturas = await facturasServices.todos();
        return facturas;
    } catch (error) {
        console.error("Error fetching facturas:", error);
        return { error, message: "Error con el servidor" };
    }
    }
    const crearFactura = async (datosFacturas: any) => {
        try {
            const dataFactura = await facturasServices.CrearFactura(datosFacturas);
            return dataFactura;
        } catch (error) {
            console.error("Error creando factura:", error);
            return { error, message: "Error con el servidor" };
        }
    };

    return { todos,crearFactura };
}
