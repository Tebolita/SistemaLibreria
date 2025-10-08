
const API = 'http://localhost:4000/api/productos/'

export const productosService = {

    async CrearProducto(productoData: any){
        const response = await fetch(`${API}crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        })
        const res = await response.json()
        return res 
    },

    async ObtenerProductos() {
        const response =  await fetch(`${API}todos`, {
            method: 'GET'
        } )
        const data = await response.json()
        
        return data
    },

    async ProductoPorCategoria(idCategoria: number) {
        const response =  await fetch(`${API}produtoPorCategori/${idCategoria}`, {
            method: 'GET'
        } )

        return await response.json()
    }    

}
