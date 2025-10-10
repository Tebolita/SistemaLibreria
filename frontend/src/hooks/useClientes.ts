import { clienteService } from "@/service/clienteService";

export const useClientes = () => {

    const todos = async () => {
        const clientes = await clienteService.todos();
        return clientes;
    };
    const cambiarEstado = async (id: number) => {
        const res = await clienteService.cambiarEstado(id);
        return res;
    };

    return {
        todos,
        cambiarEstado
    };
}