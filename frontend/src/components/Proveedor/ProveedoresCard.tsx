'use client';
import * as React from "react"
import { Grid, PlusIcon } from "lucide-react"
import useProveedores from "@/hooks/useProveedores"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import ModalActualizarProveedor from '../Proveedor/ProveedorActualizar';
import { useState } from "react";
const {proveedoresTodos} = useProveedores();
const Proveedores =  await proveedoresTodos();

export function ProveedoresList() { 
    
const [showModal, setShowModal] = useState(false);
   console.log(Proveedores);
  return (
    <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '20px' }}>
        <div onClick={() => setShowModal(false)} style={{ padding: '20px', display: 'flex', justifyContent: 'end' }}>
        {showModal && <ModalActualizarProveedor  />}
         </div>
      <ItemGroup>
        {Proveedores.map((proveedor : any, index : any) => (
          <React.Fragment key={proveedor.IdProveedor}>
            <Item style={{ backgroundColor: 'white', marginBottom: '10px', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src="https://github.com/evilrabbit.png" className="grayscale" />
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{proveedor.NombreEmpresa}</ItemTitle>
                <ItemDescription>{proveedor.Telefono}</ItemDescription>
                <ItemDescription>{proveedor.Correo}</ItemDescription>
              </ItemContent>
              <ItemActions>
            <Button onClick={() => setShowModal(true)}>Actualizar Proveedor</Button>
              </ItemActions>
            </Item>
            {index !== Proveedores.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
    </div>
  )
}
