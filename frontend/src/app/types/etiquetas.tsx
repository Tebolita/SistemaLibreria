import { Leaf, Star, PartyPopper } from "lucide-react";

export const etiquetaProveedor = {
  Icon: <Leaf />,
  Titulo: "Lapiceros",
  color: "bg-blue-300", // Azul para proveedor
  variant: "default" as const,
};
export const etiquetaNuevo = {
  Icon: <Star />,
  Titulo: "Nuevo",
  color: "bg-green-300", // Verde para nuevo
  variant: "secondary" as const,
};
export const etiquetaPopular = {
  Icon: <PartyPopper />,
  Titulo: "Popular",
  color: "bg-yellow-300", // Amarillo para popular
  variant: "outline" as const,
};