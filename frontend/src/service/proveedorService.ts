const API = 'http://localhost:4000/api/proveedores/'

export const proveedorService = {
    async todos() {
        const proveedores = await fetch(`${API}todos`, {
            method: 'GET',
        })
        return proveedores.json()
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
    async cambiarEstado(id: number) {
        const proveedor = await fetch(`${API}cambiarEstado/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return proveedor.json()
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