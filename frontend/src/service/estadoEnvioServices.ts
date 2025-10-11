const API = 'http://localhost:4000/api/estado-envio/'

export const estadoEnvioServices = {
    async todos() {
        const estadoEnvio = await fetch(`${API}todos`, {
            method: 'GET',
        } )
        return estadoEnvio.json()
    },
}