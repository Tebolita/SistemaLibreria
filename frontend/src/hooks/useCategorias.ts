import { categoriasServices } from "@/service/categoriasServices";


export function useCategoria() {
    const categoriasTodos = async () => {
        try {
            const categorias = await categoriasServices.todos()
            return categorias
        } catch (error) {
            return {error: error, message: 'Hubo un error en el servidor'}
        }
    }

    return { categoriasTodos }
}