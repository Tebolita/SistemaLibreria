
import { useCategoria } from "@/hooks/useCategorias";
import CategoriasCard from "@/components/Categoria/CategoriasCard";


export  default async function Page() {
    const { categoriasTodos } = useCategoria();
    const categorias = await categoriasTodos();
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {categorias.map((categoria: any) => (
                        <CategoriasCard key={categoria.IdCategoria} idCategoria={categoria.IdCategoria} 
                        Nombre={categoria.Nombre} Descripcion={categoria.Descripcion} Estado={categoria.Estado} />
                    
                ))}
    
        </div>
    )   ;
}