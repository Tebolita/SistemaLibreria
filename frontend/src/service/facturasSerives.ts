const API = 'http://localhost:4000/api/factura/'

export const facturasServices = {

    async todos() {
        const facturas = await fetch(`${API}todos`, {
            method: 'GET',
        } )
        return facturas.json()
    },
    async CrearFactura(datosFacturas: any){
        const res = await fetch(`${API}crear`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFacturas)
        })

        return res.json()
    }

}