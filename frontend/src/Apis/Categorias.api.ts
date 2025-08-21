async function ObtenerCategorias() {
    const response =  await fetch('http://localhost:4000/api/categorias/GetCategorias', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    } )
    const data = await response.json()
    
    return [...data]   
}

export interface Categorias {
  Nombre: string;
  Descripcion: string;
}


export { ObtenerCategorias }