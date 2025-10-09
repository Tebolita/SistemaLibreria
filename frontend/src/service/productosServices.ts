const API = "http://localhost:4000/api/productos/";

export const productosService = {
  // 🟢 Crear producto
  async CrearProducto(productoData: any) {
    const response = await fetch(`${API}crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoData),
    });
    const res = await response.json();
    return res;
  },

  // 🟢 Obtener todos los productos
  async ObtenerProductos() {
    const response = await fetch(`${API}todos`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  },

  // 🟢 Obtener productos por categoría
  async ProductoPorCategoria(idCategoria: number) {
    const response = await fetch(`${API}produtoPorCategori/${idCategoria}`, {
      method: "GET",
    });
    return await response.json();
  },

  // 🟣 Nuevo → Obtener producto único (por ID)
  async ObtenerPorId(idProducto: number) {
    const response = await fetch(`${API}unico/${idProducto}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  },

  // 🟠 Nuevo → Obtener productos en oferta (usando productos activos por ahora)
  async ObtenerOfertas() {
    const response = await fetch(`${API}productosActivos`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  },
};
