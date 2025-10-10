const API = "http://localhost:4000/api/factura/";

export const facturasServices = {
  async todos() {
    try {
      const res = await fetch(`${API}todos`, { method: "GET" });
      if (!res.ok) throw new Error(`Error al obtener facturas: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("❌ Error en facturasServices.todos:", error);
      throw error;
    }
  },

  async CrearFactura(data: any) {
    try {
      const res = await fetch(`${API}crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`❌ Error al crear factura: ${res.status} - ${text}`);
      }

      return await res.json(); // debería devolver { message, data: {...} }
    } catch (error) {
      console.error("🚨 Error en facturasServices.CrearFactura:", error);
      throw error;
    }
  },

  async CrearDetalleFactura(data: any) {
    try {
      const res = await fetch(
        "http://localhost:4000/api/detalle-factura/crear", // ✅ corregido el endpoint (usaba detalleFactura)
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `❌ Error al crear detalle de factura: ${res.status} - ${text}`
        );
      }

      return await res.json();
    } catch (error) {
      console.error("🚨 Error en facturasServices.CrearDetalleFactura:", error);
      throw error;
    }
  },
};
