import { useProductos } from "@/hooks/useProductos";

export default async function productos(IdCateroria: number) {
    const { ProductosPorCategoria } = useProductos()

    const obtenerProductosCategoria = await ProductosPorCategoria(IdCateroria);

    return (
        <>
        {obtenerProductosCategoria.map((producto: any) => (
            <div key={producto.IdProducto}>{producto.Nombre}</div>
        ))}
        </>
    )
}