import axios from "axios";

const API_URL = "http://localhost:4000/api/kardex";

export const kardexServices = {
  todos: async () => {
    const { data } = await axios.get(`${API_URL}/todos`);
    return data;
  },

  buscarPorProducto: async (id: number) => {
    const { data } = await axios.get(`${API_URL}/unico/${id}`);
    return data;
  },

  crear: async (nuevo: any) => {
    const { data } = await axios.post(`${API_URL}/crear`, nuevo);
    return data;
  },
};
