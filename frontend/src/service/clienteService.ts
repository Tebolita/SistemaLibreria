const API = 'http://localhost:4000/api/clientes/'



export const clienteService = {
    async todos() {
        const clientes = await fetch(`${API}todos`, {
            method: 'GET',
        } )
        return clientes.json()
    },
    async cambiarEstado(id: number) {
        const cliente = await fetch(`${API}cambiarEstado/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await cliente.json()
        return res
    },
    async unico(id: number) {
        const clientes = await fetch(`${API}unico/${id}`, {
            method: 'GET',
        } )
        return clientes.json()
    },    

}