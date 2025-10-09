import { useCategoria } from "@/hooks/useCategorias"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

const {actualizarCategoria} = useCategoria();


export function CategoriaActualizar({idCategoria, Nombre, Descripcion}: any) {

    async function handleActualizarCategoria(id: number, Data: any) {
        const response = await actualizarCategoria(id, Data);
        toast.success(response?.message);
    }    
    let Data = {
        nombre: Nombre,
        descripcion: Descripcion,
    }
    
    function handleOnChange(e: any) {
       Data = {...Data, [e.target.name]: e.target.value}
    }
    return(
        <div style={{backgroundColor: 'white', padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'fixed', top: '50%', 
        left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, width: '400px'}}>
          <form>
      <div className="grid gap-3">
        <Label htmlFor="descripcion">Descripcion</Label>
        <Input onChange={handleOnChange} name="descripcion" type="text" id="descripcion" defaultValue={Descripcion} />
      </div>
      <div className="grid gap-3 mt-4 mb-4">
        <Label htmlFor="nombre">Nombre</Label>
        <Input onChange={handleOnChange} name="nombre" id="nombre" defaultValue={Nombre} />
      </div>
      <Button onClick={() => { handleActualizarCategoria(idCategoria, Data ) }} type="submit">Guardar cambios</Button>
    </form>
        </div>
    )
}
