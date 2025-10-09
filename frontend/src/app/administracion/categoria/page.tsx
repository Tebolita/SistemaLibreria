'use client';
import CategoriasCard from "@/components/Categoria/CategoriasCard";
import { useCategoria } from "@/hooks/useCategorias";
const { categoriasTodos } = useCategoria();
    const categorias = await categoriasTodos();


export default  function Page() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {categorias.map((categoria: any) => (
                        <CategoriasCard key={categoria.IdCategoria} idCategoria={categoria.IdCategoria} 
                        Nombre={categoria.Nombre} Descripcion={categoria.Descripcion} Estado={categoria.Estado} />
                ))}
        </div>
    );
}