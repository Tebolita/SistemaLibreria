"use client";
import {Card,CardAction,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"

type cartaPersonalizadaData = {
    idProducto: number;
    Titulo: string;
    foto: string;
    fechaAgregado: string;
    badgeArray: { 
        Icon: React.ReactNode; 
        Titulo: string; 
        color?: string;
    }[]; // <-- ahora es un arreglo
}[] | [];

interface CartaPersonalizadaProps {
    cartaPersonalizadaData: cartaPersonalizadaData;
}


export default function CartaPersonalizada({ cartaPersonalizadaData }: CartaPersonalizadaProps) {
  return (
    <>
      {cartaPersonalizadaData.map((carta) => (
        <Card className="@container/card" key={carta.idProducto}>
          <CardHeader>
            <CardDescription> 
              {carta.badgeArray.map((badge, idx) => (
                <Badge key={idx} className={`${badge.color} cursor-pointer ml-1`}>
                  {badge.Icon}
                  {badge.Titulo}
                </Badge>
              ))}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {carta.Titulo}
            </CardTitle>
            <CardAction className="flex flex-wrap items-center gap-2 overflow-hidden max-w-full">

            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <ImageIcon className="size-4" />
              <img
                src={carta.foto ? carta.foto : ""}
                alt="Imagen del Producto"
                width={40}
                height={40}
              />
            </div>
            <div className="text-muted-foreground">
              {carta.fechaAgregado}
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}