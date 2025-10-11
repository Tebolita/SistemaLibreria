const API = 'http://localhost:4000/api/detalle-factura/'


export const DetallefacturaServices ={
    async todos() {
        const DetalleFacturas = await fetch(`${API}todos`, {
            method: 'GET',
        } )
        return DetalleFacturas.json()
    },

    async crear(datos: any) {
        const res = await fetch(`${API}crear`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        } )
        return res.json()
    },
    async unico(id: any){
        const res = await fetch(`${API}unico/${id}`, {
            method: 'GET',
        } ) 
        return res.json()
    },
    async actualizar(id: number, data: any) {
        const proveedor = await fetch(`${API}actualizar/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return proveedor.json()
    }
}