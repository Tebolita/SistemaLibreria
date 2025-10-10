import { useCategoria } from "@/hooks/useCategorias";
import { toast } from "sonner";


import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


const {crearCategoria} = useCategoria();


export function CrearCategoria() {
   
   async function handleCrearCategoria(Data: any) {
    const response = await crearCategoria(Data);
    toast.success(response?.message)
}
    let Data = {
        Nombre: "",
        Descripcion: " ",
        Estado: true,
    }
    const handleOnChange = (e: any) => {
        Data = {...Data, [e.target.name]: e.target.value}
    }


    return (
     <div className="w-full max-w-lg mx-auto py-8"  >
      <h2 className="text-2xl font-semibold mb-4 text-center">Crear Categoria</h2>

      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="Nombre">Nombre Categoria</FieldLabel>
            <Input name="Nombre" id="Nombre" type="text" placeholder="Nombre de la categoria" onChange={handleOnChange} />
            <FieldDescription>
                Agrega un nombre a la categoria
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="Descripcion">Descripcion</FieldLabel>
            <FieldDescription>
              Agrega una descripcion a la categoria
            </FieldDescription>
            <Input name="Descripcion" id="Descripcion" type="text" placeholder="Descripcion de la categoria" onChange={handleOnChange} />
          </Field>
        </FieldGroup>

        <Button type="submit" onClick={() => handleCrearCategoria(Data)}>Crear Categoria</Button>
      </FieldSet>
    </div>
    );
}