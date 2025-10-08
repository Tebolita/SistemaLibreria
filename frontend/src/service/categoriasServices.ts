const API = 'http://localhost:4000/api/categorias/'

// headers: {
//     'Content-Type': 'application/json'
// },


export const categoriasServices = {
    async todos() {
        const categorias = await fetch(`${API}todos`, {
            method: 'GET',
        } )
    
        return categorias.json()
    },
    async crear(data: any) {
        const categoria = await fetch(`${API}crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        const res = await categoria.json()
        return res
    },
    async cambiarEstado(id: number) {
        const categoria = await fetch(`${API}cambiarEstado/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await categoria.json()
        return res
    },
    async actualizar(id: number, data: any) {
        
        const categoria = await fetch(`${API}actualizar/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await categoria.json()
        return res
    }
}