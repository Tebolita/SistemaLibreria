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
import { useEstanteria } from "@/hooks/useEstanteria";

const {crear} = useEstanteria()

export function AgregarEstanteria() {
   
   async function handleCrearProveedor(Data: any) {
    const response = await crear(Data);
    toast.success(response?.message)
}
    let Data = {
        Nombre: "",
        Ubicacion: "",
        Encargado: "",
    }
    const handleOnChange = (e: any) => {
        Data = {...Data, [e.target.name]: e.target.value}
    }


    return (
        <div className="w-full max-w-lg mx-auto py-8"  >
        <h2 className="text-2xl font-semibold mb-4 text-center">Agregar Estanteria</h2>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="Nombre">Nombre Bodega</FieldLabel>
            <Input name="Nombre" id="Nombre" type="text" placeholder="Nombre de la Bodega" onChange={handleOnChange} />
            <FieldDescription>
                Agrega un nombre a la Bodega
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="Contacto">Ubicacion</FieldLabel>
            <FieldDescription>
              Agrega un contacto a la Ubicacion
            </FieldDescription>
            <Input name="Ubicacion" id="Ubicacion" type="text" placeholder="Descripcion de la Ubicacion" onChange={handleOnChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="Telefono">Encargado</FieldLabel>
            <FieldDescription>
              Agrega un Encargado
            </FieldDescription>
            <Input name="Encargado" id="Encargado" type="text" placeholder="Encargado de la Bodega" onChange={handleOnChange} />
          </Field>
        </FieldGroup>

        <Button type="submit" onClick={() => handleCrearProveedor(Data)}>Crear Proveedor</Button>
      </FieldSet>
    </div>
    );
}