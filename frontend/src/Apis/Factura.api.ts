

const API_BASE = "http://localhost:4000/api";

// 🧩 Crear una nueva factura
async function CrearFactura(data: {
  IdCliente: number;
  Total: number;
  Fecha?: string;
  NumeroSeguimiento?: string;
  Estado?: string;
}) {
  const response = await fetch(`${API_BASE}/factura/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

//  Crear el detalle de una factura
async function CrearDetalleFactura(data: {
  IdFactura: number;
  IdProducto: number;
  Cantidad: number;
  PrecioUnitario: number;
}) {
  const response = await fetch(`${API_BASE}/detalle-factura/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

//  Obtener todas las facturas
async function ObtenerFacturas() {
  const response = await fetch(`${API_BASE}/factura/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return [...data];
}

//  Obtener una factura por ID
async function ObtenerFacturaPorId(id: number) {
  const response = await fetch(`${API_BASE}/factura/unico/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

//  Obtener todos los detalles de factura
async function ObtenerDetallesFactura() {
  const response = await fetch(`${API_BASE}/detalle-factura/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return [...data];
}

//  Obtener un detalle por ID
async function ObtenerDetallePorId(id: number) {
  const response = await fetch(`${API_BASE}/detalle-factura/unico/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

//  Actualizar una factura (estado, total, etc.)
async function ActualizarFactura(id: number, data: any) {
  const response = await fetch(`${API_BASE}/factura/actualizar/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

//  Actualizar detalle de factura
async function ActualizarDetalleFactura(id: number, data: any) {
  const response = await fetch(`${API_BASE}/detalle-factura/actualizar/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

export {
  CrearFactura,
  CrearDetalleFactura,
  ObtenerFacturas,
  ObtenerFacturaPorId,
  ObtenerDetallesFactura,
  ObtenerDetallePorId,
  ActualizarFactura,
  ActualizarDetalleFactura,
};
