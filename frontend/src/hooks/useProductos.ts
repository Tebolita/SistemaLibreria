import { productosService } from "../service/productosServices";

export function useProductos(){
    
        const CrearProducto = async (productoData: any) => {
            try {
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
            }catch (error) {
                return {error: error, message: 'Hubo un error en el servidor'}
            }  
        }

        const ProductosTodos = async () => {
             try {
                const datos = await productosService.ObtenerProductos()
                return datos                
             } catch (error) {
                return {error: error, message: 'Hubo un error en el servidor'}
             }
        };

        const ProductosPorCategoria = async (idCategoria: number) => {
             try {
                const datos = await productosService.ProductoPorCategoria(idCategoria)
                return datos         

             } catch (error) {
                return {error: error, message: 'Hubo un error en el servidor'}
             }
        };


    return { ProductosTodos, CrearProducto, ProductosPorCategoria }
}
