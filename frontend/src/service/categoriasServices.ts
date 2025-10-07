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
    }
}