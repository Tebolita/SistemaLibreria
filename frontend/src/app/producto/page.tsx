"use client";
import { useEffect, useState } from "react";
import Administracion from "@/app/administracion/layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useProductos } from "@/hooks/useProductos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Edit, Trash2, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useCategoria } from "@/hooks/useCategorias"
import useProveedores from "@/hooks/useProveedores"

const { categoriasTodos } = useCategoria()
const { proveedoresTodos } = useProveedores()

const resCategorias = await categoriasTodos();
const resProveedores = await proveedoresTodos();
// Paleta de colores vibrantes para las tarjetas
const colorSchemes = [
  {
    background: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-800"
  },
  {
    background: "bg-gradient-to-br from-green-50 to-green-100",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800"
  },
  {
    background: "bg-gradient-to-br from-purple-50 to-purple-100",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-800"
  },
  {
    background: "bg-gradient-to-br from-orange-50 to-orange-100",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-800"
  },
  {
    background: "bg-gradient-to-br from-pink-50 to-pink-100",
    border: "border-pink-200",
    text: "text-pink-700",
    badge: "bg-pink-100 text-pink-800"
  },
  {
    background: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    border: "border-cyan-200",
    text: "text-cyan-700",
    badge: "bg-cyan-100 text-cyan-800"
  }
];

const getColorScheme = (index: number) => {
  return colorSchemes[index % colorSchemes.length];
};


export default function ProductosAdmin() {
  const { ProductosTodos, ActualizarProducto } = useProductos();
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);

  const [categorias] = useState(resCategorias);
  const [proveedores] = useState(resProveedores);



  const router = useRouter();
  const CrearProducto = () => router.push("/producto/agregarProducto");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const lista = await ProductosTodos();
      setProductos(lista);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActualizarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      setUpdating(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const productoData = {
        Nombre: formData.get("Nombre") as string,
        Descripcion: formData.get("Descripcion") as string,
        Precio: formData.get("Precio") as string,
        Stock: formData.get("Stock") as string,
        IdCategoria: formData.get("IdCategoria") as string,
        IdProveedor: formData.get("IdProveedor") as string,
        Estado: formData.get("Estado") === "true",
        Imagen: formData.get("Imagen") as string,
      };

      const resultado = await ActualizarProducto(selectedProduct.IdProducto, productoData);
      
      if (resultado && !resultado.error) {
        // Actualizar la lista de productos
        await cargarProductos();
        setSelectedProduct(null);
      } else {
        console.error("Error al actualizar producto:", resultado?.message);
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    } finally {
      setUpdating(false);
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.Nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.Categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.Descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductCard = ({ producto, index }: { producto: any; index: number }) => {
    const colors = getColorScheme(index);
    
    return (
      <div className={`rounded-xl border-2 ${colors.background} ${colors.border} p-4 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
        {/* Header de la tarjeta */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${colors.text} line-clamp-2`}>
              {producto.Nombre}
            </h3>
            <Badge variant="secondary" className={`mt-1 ${colors.badge}`}>
              {producto.Categorias?.Nombre || "Sin categoría"}
            </Badge>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedProduct(producto)}
              className="h-8 w-8 p-0 hover:bg-blue-100"
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        </div>

        {/* Imagen del producto */}
        <div className="relative h-40 bg-white rounded-lg mb-3 overflow-hidden border">
          {producto.Imagen ? (
            <img
              src={producto.Imagen}
              alt={producto.Nombre}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Precio:</span>
            <span className={`font-bold ${colors.text}`}>
              Q{Number(producto.Precio).toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Stock:</span>
            <span className={`font-semibold ${parseInt(producto.Stock) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {producto.Stock || "0"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Estado:</span>
            <Badge
              variant={producto.Estado === true ? "secondary" : "default"}
              className={producto.Estado === true ? "bg-green-100 text-green-800 cursor-pointer" : "bg-gray-100 text-gray-800 cursor-pointer"}
            >
              {producto.Estado === true ? "Activo" : "Inactivo"}
            </Badge>
          </div>
        </div>

        {/* Descripción */}
        {producto.Descripcion && (
          <p className="text-xs text-gray-600 mt-3 line-clamp-2">
            {producto.Descripcion}
          </p>
        )}
      </div>
    );
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="rounded-xl border-2 p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-40 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <ProtectedRoute allowedRoles={["Administrador"]}> 
      <Administracion>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* Header */}
            <div className="px-4 lg:px-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
                  <p className="text-gray-600 mt-1">
                    Administra todos los productos del sistema
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" onClick={CrearProducto}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Producto
                </Button>               
              </div>

              {/* Barra de búsqueda y filtros */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar productos por nombre, categoría o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{productos.length}</div>
                  <div className="text-sm text-gray-600">Total Productos</div>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {productos.filter(p => p.Estado === true).length}
                  </div>
                  <div className="text-sm text-gray-600">Activos</div>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {productos.filter(p => parseInt(p.Stock) < 10).length}
                  </div>
                  <div className="text-sm text-gray-600">Stock Bajo</div>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Array.from(new Set(productos.map(p => p.Categorias?.Nombre))).length}
                  </div>
                  <div className="text-sm text-gray-600">Categorías</div>
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="px-4 lg:px-6">
              {loading ? (
                <SkeletonLoader />
              ) : productosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {productosFiltrados.map((producto, index) => (
                    <ProductCard
                      key={producto.IdProducto}
                      producto={producto}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? "Intenta con otros términos de búsqueda" : "No hay productos registrados aún"}
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer" onClick={CrearProducto}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Primer Producto
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de edición */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Producto</DialogTitle>
            </DialogHeader>
            
            {selectedProduct && (
              <form onSubmit={handleActualizarProducto} className="space-y-6">
                {/* Información Básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="Nombre">Nombre del Producto *</Label>
                    <Input
                      id="Nombre"
                      name="Nombre"
                      defaultValue={selectedProduct.Nombre}
                      placeholder="Ingrese el nombre del producto"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="Precio">Precio (Q) *</Label>
                    <Input
                      id="Precio"
                      name="Precio"
                      type="number"
                      step="0.01"
                      min="0"
                      defaultValue={selectedProduct.Precio}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Stock y Estado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="Stock">Stock *</Label>
                    <Input
                      id="Stock"
                      name="Stock"
                      type="number"
                      min="0"
                      defaultValue={selectedProduct.Stock}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="Estado">Estado</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="Estado"
                        name="Estado"
                        defaultChecked={selectedProduct.Estado}
                        onCheckedChange={(checked: any) => {
                          // Actualizar el valor del input hidden
                          const hiddenInput = document.querySelector('input[name="Estado"]') as HTMLInputElement;
                          if (hiddenInput) {
                            hiddenInput.value = checked.toString();
                          }
                        }}
                      />
                      <input
                        type="hidden"
                        name="Estado"
                        value={selectedProduct.Estado.toString()}
                      />
                      <Label htmlFor="Estado" className="cursor-pointer">
                        {selectedProduct.Estado ? "Activo" : "Inactivo"}
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Categoría y Proveedor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="IdCategoria">Categoría *</Label>
                    <select
                      id="IdCategoria"
                      name="IdCategoria"
                      defaultValue={selectedProduct.Categorias.IdCategoria || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((categoria: any) => (
                        <option key={categoria.IdCategoria} value={categoria.IdCategoria}>
                          {categoria.Nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="IdProveedor">Proveedor *</Label>
                    <select
                      id="IdProveedor"
                      name="IdProveedor"
                      defaultValue={selectedProduct.Proveedores.IdProveedor || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Seleccione un proveedor</option>
                      {proveedores.map((proveedor: any) => (
                        <option key={proveedor.IdProveedor} value={proveedor.IdProveedor}>
                          {proveedor.NombreEmpresa}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Imagen */}
                <div className="space-y-2">
                  <Label htmlFor="Imagen">URL de la Imagen</Label>
                  <Input
                    id="Imagen"
                    name="Imagen"
                    defaultValue={selectedProduct.Imagen || ""}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {selectedProduct.Imagen && (
                    <div className="mt-2">
                      <img
                        src={selectedProduct.Imagen}
                        alt="Vista previa"
                        className="h-20 object-contain rounded border"
                      />
                    </div>
                  )}
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="Descripcion">Descripción</Label>
                  <Textarea
                    id="Descripcion"
                    name="Descripcion"
                    defaultValue={selectedProduct.Descripcion || ""}
                    placeholder="Ingrese una descripción del producto..."
                    rows={4}
                  />
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedProduct(null)}
                    disabled={updating}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={updating}
                  >
                    {updating ? "Actualizando..." : "Actualizar Producto"}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de confirmación de eliminación */}
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-600">Confirmar Eliminación</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>
                ¿Estás seguro de que deseas eliminar el producto{" "}
                <strong>{productToDelete?.Nombre}</strong>? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialog(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Administracion>
    </ProtectedRoute>
  );
}