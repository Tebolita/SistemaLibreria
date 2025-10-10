'use client';
import * as React from "react"
import { Badge, Grid, PlusIcon } from "lucide-react"
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
import { useState,useEffect } from "react";
const {proveedoresTodos} = useProveedores();
const res =  await proveedoresTodos();


export function ProveedoresList() { 
    
const [showModal, setShowModal] = useState(false);
const [Proveedores, setProveedores] = useState(res);
const [modalActual,setModalAtual] = useState(res[0]);
function handleModal(IdProveedor: number,Telefono: string,Correo: string,contacto: string,NombreEmpresa: string) {
    setShowModal(!showModal);
    setModalAtual({IdProveedor,Telefono,Correo,contacto,NombreEmpresa});
}
function showModalFunction() {
    setShowModal(!showModal);
}
useEffect(() => {
    const fetchProveedores = async () => {
      const response = await proveedoresTodos();
      setProveedores(response);
    }
  fetchProveedores();
  }, [showModal]);
   console.log(Proveedores);
  return (
    <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(550px, 1fr))', gap: '20px' }}>
        <div  style={{ padding: '20px', display: 'flex', justifyContent: 'end' }}>
        {showModal && <ModalActualizarProveedor showModal={showModalFunction}  id={modalActual.IdProveedor} NombreEmpresa = {modalActual.NombreEmpresa} 
        contacto={modalActual.contacto}
         Telefono={modalActual.Telefono} Correo={modalActual.Correo} />}
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
                <ItemTitle>{proveedor.Contacto}</ItemTitle>
                <ItemTitle>{proveedor.NombreEmpresa}</ItemTitle>
                <ItemDescription>{proveedor.Telefono}</ItemDescription>
                <ItemDescription>{proveedor.Correo}</ItemDescription>
            
              </ItemContent>
              <ItemActions>
            <Button defaultValue={proveedor.IdProveedor} onClick={() => handleModal(proveedor.IdProveedor,proveedor.Telefono,proveedor.Correo,proveedor.Contacto,proveedor.NombreEmpresa)}>Actualizar Proveedor</Button>
              </ItemActions>
                {proveedor.Estado == 1 ? <Badge className="bg-green-500 cursor-pointer ml-1">Activo</Badge> : <Badge className="bg-red-500 cursor-pointer ml-1">Inactivo</Badge>}
            </Item>
            {index !== Proveedores.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
    </div>
  )
}
