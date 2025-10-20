"use client";

import { reportesServices } from "@/service/reportesServices";

export function useReportes() {
  // 🔹 Obtener todas los reportes
  const dia = async () => {
    try {
      const informe = await reportesServices.dia();
      return informe;
    } catch (error) {
      console.error("❌ Error obteniendo informe diario:", error);
      return { ok: false, message: "Error al obtener informe diario", error };
    }
  };
  const mes = async () => {
    try {
      const informe = await reportesServices.mes();
      return informe;
    } catch (error) {
      console.error("❌ Error obteniendo informe mensual:", error);
      return { ok: false, message: "Error al obtener informe mensual", error };
    }
    
  };

  return { dia, mes};
}
