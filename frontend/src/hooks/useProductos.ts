import { productosService } from "../service/productosServices";

export function useProductos() {
  const CrearProducto = async (productoData: any) => {
    try {
      const dataClean = {
        ...productoData,
        Precio: parseFloat(productoData.Precio),
        IdCategoria: parseInt(productoData.IdCategoria),
        IdProveedor: parseInt(productoData.IdProveedor),
        Stock: parseInt(productoData.Stock),
        Estado: true,
        Imagen: productoData.Imagen || "",
      };

      const response = await productosService.CrearProducto(dataClean);
      return response ? response : "";
    } catch (error) {
      return { error: error, message: "Hubo un error en el servidor" };
    }
  };

  const ProductosTodos = async () => {
    try {
      const datos = await productosService.ObtenerProductos();
      return datos;
    } catch (error) {
      return { error: error, message: "Hubo un error en el servidor" };
    }
  };

  const ProductosPorCategoria = async (idCategoria: number) => {
    try {
      const datos = await productosService.ProductoPorCategoria(idCategoria);
      return datos;
    } catch (error) {
      return { error: error, message: "Hubo un error en el servidor" };
    }
  };

  const obtenerUnico = async (idProducto: number) => {
    try {
      const producto = await productosService.ObtenerPorId(idProducto);
      return producto;
    } catch (error) {
      console.error(error);
      return { error, message: "Error al obtener producto por ID" };
    }
  };

  const ObtenerActivos = async () => {
    try {
      const productos = await productosService.ObtenerActivos();
      return productos;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const ActualizarProducto = async (idProducto: number, productoData: any) => {
    try {
      const dataClean = {
        ...productoData,
        Precio: parseFloat(productoData.Precio),
        IdCategoria: parseInt(productoData.IdCategoria),
        IdProveedor: parseInt(productoData.IdProveedor),
        Stock: parseInt(productoData.Stock),
        Estado: true,
        Imagen: productoData.Imagen || "",
      };

      const response = await productosService.ActualizarProducto(idProducto, dataClean);
      return response ? response : "";
    } catch (error) {
      return { error: error, message: "Hubo un error en el servidor" };
    }
  };


  return { ProductosTodos, CrearProducto, ProductosPorCategoria, obtenerUnico, ObtenerActivos, ActualizarProducto };
}
