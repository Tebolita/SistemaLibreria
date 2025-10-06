

"use client";

export function getCart() {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error leyendo carrito:", error);
    return [];
  }
}

export function saveCart(cart: any[]) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error guardando carrito:", error);
  }
}

export function addToCart(producto: any) {
  const cart = getCart();
  const existe = cart.find((p: any) => p.idProducto === producto.idProducto);

  if (existe) {
    existe.cantidad += producto.cantidad || 1;
  } else {
    cart.push({ ...producto, cantidad: producto.cantidad || 1 });
  }

  saveCart(cart);
}

export function removeFromCart(idProducto: number) {
  let cart = getCart();
  cart = cart.filter((p: any) => p.idProducto !== idProducto);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((acc: number, p: any) => acc + (p.cantidad || 1), 0);
}

// 🧩 ESTA ES LA NUEVA FUNCIÓN FALTANTE
export function updateCartItem(idProducto: number, cantidad: number) {
  const cart = getCart();
  const index = cart.findIndex((p: any) => p.idProducto === idProducto);

  if (index !== -1) {
    cart[index].cantidad = cantidad > 0 ? cantidad : 1;
    saveCart(cart);
  }
}
