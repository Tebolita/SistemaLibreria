import { facturasServices } from "@/service/facturasSerives";

export function useFacturas() {
    const crearFactura = async (datosFacturas: any) => {
        try {
            const dataFactura = await facturasServices.CrearFactura(datosFacturas);
            return dataFactura;
        } catch (error) {
            console.error("Error creando factura:", error);
            return { error, message: "Error con el servidor" };
        }
    };

    return { crearFactura };
}
