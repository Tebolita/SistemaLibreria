'use client';
import * as React from "react"
import { useClientes } from "@/hooks/useClientes";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useState, useEffect } from "react";
const { todos } = useClientes();
const { cambiarEstado } = useClientes();
const res = await todos();

export function ClientesList() {
  async function handleCambiarEstado(id: number) {
    const response = await cambiarEstado(id);
    setRefresh(!refesh);
    console.log(response);
  }

  const [refesh, setRefresh] = useState(false);
  const [Clientes, setClientes] = useState(res);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await todos();
      setClientes(response);
    }
    fetchClientes();
  }, [refesh]);

  return (
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      {Clientes.map((cliente: any) => (
        <Card key={cliente.IdCliente} style={{ marginBottom: '20px' }}>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar>
                <AvatarImage src="https://github.com/evilrabbit.png" className="grayscale" />
              </Avatar>
              <div>
                <CardTitle className="text-xl font-semibold">{cliente.NombreCompleto}</CardTitle>
                <CardDescription>{cliente.Correo}</CardDescription>
                <CardDescription>{cliente.Telefono}</CardDescription>
                <CardDescription>{cliente.Direccion}</CardDescription>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              {cliente.Estado == 1 ?
                <Badge className="bg-green-500 ml-1">Activo</Badge>
                :
                <Badge className="bg-red-500 ml-1">Inactivo</Badge>
              }
            </div>
          </CardHeader>
          <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            {cliente.Estado == 1 ?
              <Button style={{ backgroundColor: 'green' }} onClick={() => handleCambiarEstado(cliente.IdCliente)}>Activo</Button>
              :
              <Button style={{ backgroundColor: 'red' }} onClick={() => handleCambiarEstado(cliente.IdCliente)}>Inactivo</Button>
            }
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}