"use client";

import { useDetallefactura } from '@/hooks/useDetalleFactura';
import { useParams } from 'next/navigation';
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
import { useEffect, useState } from 'react';
import { any } from 'zod';
import { Button } from '../ui/button';

const {DFUnico} = useDetallefactura()
const res = await DFUnico(1)


export default function DetalleFacturaTable() {
  const params = useParams();
  const id = Number(params?.id);
  const [DFData,setDFData] = useState(res)
  const [total,setTotal] = useState(0)
  useEffect(() => {
    const fetchFacturas = async () => {
      const res = await DFUnico(id)
      setDFData(res)
      console.log(DFData)
    }
    fetchFacturas();
}, []);
  return (
   <Table>
      <TableCaption>Lista de facturas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id Factura</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Metodo de pago</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-right">Precio Unitario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DFData.map((factura: any) => (
          <TableRow key={factura.IdDetalle}>
            <TableCell className="font-medium">{factura.IdFactura}</TableCell>
            <TableCell>{factura.Productos.Nombre}</TableCell>
            <TableCell>{factura.Estanteria.Nombre}</TableCell>
            <TableCell>{factura.Cantidad}</TableCell>
            <TableCell className="text-right">Q {factura.PrecioUnitario}</TableCell>
            <TableCell>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>SubTotal</TableCell>
          <TableCell className="text-right">Q {total}</TableCell>
        </TableRow>
        <TableRow>
           <TableCell className='text-center'>
              <Button>Agregar Detalle Factura</Button>
           </TableCell>
        </TableRow>
      </TableFooter>
    
    </Table>
  );
}