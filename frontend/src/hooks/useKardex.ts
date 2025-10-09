import { kardexServices } from "@/service/kardexServices";

export function useKardex() {
  const obtenerPorProducto = async (id: number) => {
    try {
      const kardex = await kardexServices.buscarPorProducto(id);
      return kardex;
    } catch (error) {
      return { error, message: "Error al obtener el Kardex" };
    }
  };

  const crearMovimiento = async (nuevo: any) => {
    try {
      const kardex = await kardexServices.crear(nuevo);
      return kardex;
    } catch (error) {
      return { error, message: "Error al registrar movimiento" };
    }
  };

  return { obtenerPorProducto, crearMovimiento };
}
