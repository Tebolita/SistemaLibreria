'use client'

import { useEstanteria } from "@/hooks/useEstanteria"
import * as React from "react"
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
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { useState, useEffect } from "react"
const {todos} = useEstanteria()
const res = await todos()
export default function EstanteriaList(){
    const [estanterias,setEstanterias] = useState(res)
    useEffect(() => {
        const fetchEstanteria = async () => {
          const response = await todos();
          setEstanterias(response);
        }
      fetchEstanteria();
      }, []);
    return(
      <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '20px' }}>
              <div  style={{ padding: '20px', display: 'flex', justifyContent: 'end' }}>
               </div>
            <ItemGroup>
              {estanterias.map((proveedor : any, index : any) => (
                <React.Fragment key={proveedor.idEstanteria}>
                  <Item style={{ backgroundColor: 'white', marginBottom: '10px', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <ItemMedia>
                      <Avatar>
                        <AvatarImage src="https://github.com/evilrabbit.png" className="grayscale" />
                      </Avatar>
                    </ItemMedia>
                    <ItemContent className="gap-1">
                      <ItemTitle>{proveedor.Nombre}</ItemTitle>
                      <ItemTitle>{proveedor.Ubicacion}</ItemTitle>
                      <ItemDescription>{proveedor.Encargado}</ItemDescription>
                  
                    </ItemContent>
                    <ItemActions>
                  <Button  onClick={() => {}}>Actualizar Proveedor</Button>
                    </ItemActions>
                  </Item>
                  {index !== estanterias.length - 1 && <ItemSeparator />}
                </React.Fragment>
              ))}
            </ItemGroup>
          </div>
          </div>
    )

}