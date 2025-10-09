
import useProveedores from "@/hooks/useProveedores";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { toast } from "sonner";



const {proveedoresActualizar} = useProveedores();


export default function ProveedorActualizar({id,NombreEmpresa,contacto, Telefono, Correo}: any) {
    async function handleActualizarProveedor(id: number, Data: any) {
        const response = await proveedoresActualizar(id, Data);
        toast.success(response?.message);
    }
         let Data = {
           NombreEmpresa: NombreEmpresa,
            Contacto: contacto,
            Telefono: Telefono,
            Correo: Correo,
    }
    
    function handleOnChange(e: any) {
       Data = {...Data, [e.target.name]: e.target.value}
    }
    
    return (  <div style={{height: '400px', border: '1px solid #000000ff', borderRadius: '8px', padding: '20px'}} className="w-full max-w-md space-y-6">
      <FieldSet>
        <FieldLegend>{NombreEmpresa}</FieldLegend>
        <FieldDescription>
          
        </FieldDescription>
        <FieldGroup>
            <Field>
            <FieldLabel htmlFor="street">Nombre Empresa</FieldLabel>
            <Input name="NombreEmpresa" id="street" type="text" placeholder="Nombre de la empresa"  defaultValue={NombreEmpresa} onChange={handleOnChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="street">Contacto</FieldLabel>
            <Input name="Contacto" id="street" type="text" placeholder="Nombre del contacto" defaultValue={contacto} onChange={handleOnChange} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="city">Teléfono</FieldLabel>
              <Input name="Telefono" id="city" type="text" placeholder="Teléfono" defaultValue={Telefono} onChange={handleOnChange} />
            </Field>
            <Field>
              <FieldLabel htmlFor="zip">Correo</FieldLabel>
              <Input name="Correo" id="zip" type="text" placeholder="Correo" defaultValue={Correo} onChange={handleOnChange} />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={() => handleActualizarProveedor(id, Data)}>Guardar Cambios</Button>
        </div>
    </div>
    );

}