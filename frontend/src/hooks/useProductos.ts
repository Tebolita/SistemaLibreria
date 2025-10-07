import { productosService } from "../service/productosServices";

export function useProductos(){
    try {
        const CrearProducto = async (productoData: any) => {
            const dataClean = {
                ...productoData,
                Precio: parseFloat(productoData.Precio),
                IdCategoria: parseInt(productoData.IdCategoria),
                IdProveedor: parseInt(productoData.IdProveedor),
                Stock: parseInt(productoData.Stock),
                Estado: true,
                Imagen: "Holaaa prueba"
            }
            
            const response = await productosService.CrearProducto(dataClean)
            return response ? response : ""
        }

        const productosTodos = async () => {
            const datos = await productosService.ObtenerProductos()
            return datos
        };

        return { productosTodos, CrearProducto }

    } catch (error) {
        return {error: error, message: 'Hubo un error en el servidor'}
    }    
}
