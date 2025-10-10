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
import useProveedores from "@/hooks/useProveedores";


const {proveedoresCrear} = useProveedores()

export function AgregarProveedor() {
   
   async function handleCrearProveedor(Data: any) {
    const response = await proveedoresCrear(Data);
    toast.success(response?.message)
}
    let Data = {
        NombreEmpresa: "",
        Contacto: "",
        Telefono: "",
        Correo: "",
        Estado: true,
    }
    const handleOnChange = (e: any) => {
        Data = {...Data, [e.target.name]: e.target.value}
    }


    return (
       <div className="w-full max-w-md" style={{alignContent: 'center'}}  >
        <h2 className="text-2xl font-semibold mb-4">Agregar Proveedor</h2>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="Nombre">Nombre Empresa</FieldLabel>
            <Input name="NombreEmpresa" id="NombreEmpresa" type="text" placeholder="Nombre de la Empresa" onChange={handleOnChange} />
            <FieldDescription>
                Agrega un nombre a la Empresa
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="Contacto">Contacto</FieldLabel>
            <FieldDescription>
              Agrega un contacto a la Empresa
            </FieldDescription>
            <Input name="Contacto" id="Descripcion" type="text" placeholder="Descripcion de la Empresa" onChange={handleOnChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="Telefono">Telefono</FieldLabel>
            <FieldDescription>
              Agrega un telefono al contacto
            </FieldDescription>
            <Input name="Telefono" id="Telefono" type="text" placeholder="Telefono de la Empresa" onChange={handleOnChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="Correo">Correo</FieldLabel>
            <FieldDescription>
              Agrega un correo a la Empresa
            </FieldDescription>
            <Input name="Correo" id="Correo" type="text" placeholder="Correo de la Empresa" onChange={handleOnChange} />
          </Field>
        </FieldGroup>

        <Button type="submit" onClick={() => handleCrearProveedor(Data)}>Crear Proveedor</Button>
      </FieldSet>
    </div>
    );
}