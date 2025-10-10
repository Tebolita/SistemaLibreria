'use Client';

import { useFacturas } from "@/hooks/useFacturas";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const { todos } = useFacturas();
const res  =  await todos();



export const FacturaTable = () => {
const [facturas, setFacturas] = useState(res);
   useEffect(() => {
    const fetchFacturas = async () => {
      const data = await todos();
      setFacturas(data);
    }
    fetchFacturas();
}, []);
console.log(facturas);
    return <Table>
      <TableCaption>Lista de facturas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id Factura</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Metodo de pago</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facturas.map((factura: any) => (
          <TableRow key={factura.IdFactura}>
            <TableCell className="font-medium">{factura.IdFactura}</TableCell>
            <TableCell>{factura.Clientes.NombreCompleto}</TableCell>
            <TableCell>{factura.MetodosPago.Metodo}</TableCell>
            <TableCell>{factura.Fecha}</TableCell>
            <TableCell className="text-right">Q {factura.Total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          
        </TableRow>
      </TableFooter>
    </Table>;
};
