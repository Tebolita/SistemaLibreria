"use client";

import { facturasServices } from "@/service/facturasSerives";

export function useFacturas() {
  // 🔹 Obtener todas las facturas
  const todos = async () => {
    try {
      const facturas = await facturasServices.todos();
      return facturas;
    } catch (error) {
      console.error("❌ Error obteniendo facturas:", error);
      return { ok: false, message: "Error al obtener facturas", error };
    }
  };

  // 🔹 Crear factura principal
  const crearFactura = async (datosFactura: any) => {
    try {
      const respuesta = await facturasServices.CrearFactura(datosFactura);

      // Mostrar en consola para verificar estructura real
      console.log("🧾 Respuesta del backend (factura):", respuesta);

      // Obtener el IdFactura según estructura del backend
      const idFactura =
        respuesta?.data?.IdFactura ??
        respuesta?.IdFactura ??
        respuesta?.data?.id ??
        null;

      if (!idFactura) {
        console.error("⚠️ No se encontró IdFactura en la respuesta:", respuesta);
        return {
          ok: false,
          message: "No se obtuvo IdFactura del backend",
          error: respuesta,
        };
      }

      return {
        ok: true,
        facturaId: idFactura,
        data: respuesta.data,
        message: "Factura creada correctamente",
      };
    } catch (error) {
      console.error("🚨 Error creando factura:", error);
      return { ok: false, message: "Error al crear factura", error };
    }
  };

  // 🔹 Crear detalle de factura
  const crearDetalleFactura = async (detalle: any) => {
    try {
      const respuesta = await facturasServices.CrearDetalleFactura(detalle);
      console.log("🧾 Detalle creado:", respuesta);
      return { ok: true, data: respuesta };
    } catch (error) {
      console.error("🚨 Error creando detalle de factura:", error);
      return { ok: false, message: "Error al crear detalle", error };
    }
  };

  return { todos, crearFactura, crearDetalleFactura };
}
