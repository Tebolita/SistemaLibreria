const API = 'http://localhost:4000/api/estado-factura/'

export const estadoFacturaServices = {
    async traerPorFactura(idFactura: number) {
        const estadoEnvio = await fetch(`${API}unico/${idFactura}`, {
            method: 'GET',
        } )
        return estadoEnvio.json()
    },

    async crear(data: any) {
        const proveedor = await fetch(`${API}crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return proveedor.json()
    },




}