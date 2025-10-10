'use client';
import * as React from "react"
import { useClientes } from "@/hooks/useClientes";
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
import { useState,useEffect } from "react";
const {todos} = useClientes();
const {cambiarEstado} = useClientes();
const res =  await todos();


export function ClientesList() { 
    
async  function handleCambiarEstado(id: number) {
    const response = await cambiarEstado(id);
    setRefresh(!refesh);
    console.log(response);
  }

const[refesh,setRefresh] = useState(false);
const [Clientes, setClientes] = useState(res);


useEffect(() => {
    const fetchClientes = async () => {
      const response = await todos();
      setClientes(response);
    }
  fetchClientes();
  }, [refesh]);
  return (
    <div style={{ display: 'grid', justifyContent: 'end', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div >
      <ItemGroup>
        {Clientes.map((proveedor : any, index : any) => (
          <React.Fragment key={proveedor.IdCliente}>
            <Item style={{ backgroundColor: 'white', marginBottom: '10px', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src="https://github.com/evilrabbit.png" className="grayscale" />
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{proveedor.NombreCompleto}</ItemTitle>
                <ItemDescription>{proveedor.Telefono}</ItemDescription>
                <ItemDescription>{proveedor.Correo}</ItemDescription>
                <ItemTitle>{proveedor.Direccion}</ItemTitle>
              </ItemContent>
              <ItemActions>
              </ItemActions>
                {proveedor.Estado == 1 ? 
              
                  <Button style={{backgroundColor: 'green'}} onClick={() => handleCambiarEstado(proveedor.IdCliente)}>Activo</Button>
                   : 
                    <Button style={{backgroundColor: 'red'}} onClick={() => handleCambiarEstado(proveedor.IdCliente)}>Inactivo</Button>
                    }
            </Item>
            {index !== Clientes.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
    </div>
  )
}
