import { estadoEnvioServices } from "@/service/estadoEnvioServices";


export function useEstadoEnvio() {
    const todos = async () => {
        try {
            const envios = await estadoEnvioServices.todos()
            return envios
        } catch (error) {
            return { message: "Error al obtener los envios", error };
        }
    }

    return { todos }
}