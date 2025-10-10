"use client";
import {Card,CardAction,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useCategoria } from "@/hooks/useCategorias"
import {  useState } from "react";
import { CategoriaActualizar } from "./CategoriaActualizar";
export default function CategoriasCard({ idCategoria, Nombre, Descripcion, Estado }: any) {
   const { cambiarEstado } = useCategoria();
   const [estado, setEstado] = useState(Estado);
   const [showModal, setShowModal] = useState(false);
  async function handleCambiarEstado(id: number) {
    const response = await cambiarEstado(id);
    setEstado(estado == 1 ? 0 : 1);
    console.log(response);
  }  
    return (
        <div style={{ marginBottom: '20px'  }}>
        {showModal && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setShowModal(false)}></div>}
        {showModal && <CategoriaActualizar idCategoria={idCategoria} Nombre={Nombre} Descripcion={Descripcion} />}
        <Card className="@container/card" key={idCategoria}>
          <CardHeader>
            <CardDescription> 
             {Descripcion}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {Nombre}
            </CardTitle>
            <CardAction className="flex flex-wrap items-center gap-2 overflow-hidden max-w-full">
            {estado == 1 ? <Badge className="bg-green-500 cursor-pointer ml-1">Activo</Badge> : <Badge className="bg-red-500 cursor-pointer ml-1">Inactivo</Badge>}
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <ImageIcon className="size-4" />         
            </div>
        
            <div style={{alignSelf:'flex-end'}}>
              <div style={{display: 'inline-block', marginRight: '10px'}}>
              <Button onClick={() => setShowModal(!showModal)} size="sm" style={{backgroundColor: 'blue '}} className="cursor-pointer"> Actualizar Categoía</Button>
            </div>
              {estado == 1 ? 
              <Button onClick={() => handleCambiarEstado(idCategoria)} variant="destructive" size="sm" className="cursor-pointer">
                <X />
                Desactivar
              </Button> : <Button onClick={() => handleCambiarEstado(idCategoria)} style={{backgroundColor: 'green'}} size="sm" className="cursor-pointer">
                  <Check />
                  Activar
              </Button>}
            </div>
          </CardFooter>
        </Card>
    
    </div>
    )
}