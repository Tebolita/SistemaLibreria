const API = "http://localhost:4000/api/informes/";

export const reportesServices = {
  async dia() {
    try {
      const res = await fetch(`${API}totalesDia`, { method: "GET" });
      if (!res.ok) throw new Error(`Error al obtener reporte diario: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("❌ Error en reportesServices.dia:", error);
      throw error;
    }
  },
  async mes() {
    try {
      const res = await fetch(`${API}totalesTiempo`, { method: "GET" });
      if (!res.ok) throw new Error(`Error al obtener reporte mensual: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("❌ Error en reportesServices.mes:", error);
      throw error;
    }
  },

};
