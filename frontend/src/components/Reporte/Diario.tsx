'use Client';

import { useReportes } from "@/hooks/useReportes";
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
import { set } from "zod";

const { dia } = useReportes();
const res  =  await dia();



export const Tabla = () => {
const [reporte, setReporte] = useState(res);
let total = 0;
let totalMonetario = 0;
reporte.forEach((informe: any) => {
    total += parseFloat(informe.TotalProductos);
    totalMonetario += parseFloat(informe.TotalVendido);
});

   useEffect(() => {
    const fetchReportes = async () => {
      const data = await dia();
      setReporte(data);
    }
    fetchReportes();
}, []);
console.log(reporte);
    return <Table>
      <TableCaption>Reporte diario</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Fecha</TableHead>
          <TableHead>Cantidad de productos vendidos</TableHead>
          <TableHead className="text-right">Total de la venta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reporte.map((informe: any) => (
            
          <TableRow key={informe.Fecha}>
            <TableCell className="font-medium">
                {informe.Fecha.substring(0, 10).split('-').reverse().join('/')}
            </TableCell>
            <TableCell>{informe.TotalProductos}</TableCell>
            <TableCell className="text-right">Q {informe.TotalVendido}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Totales:</TableCell>
          <TableCell>{total}</TableCell>
          <TableCell className="text-right">Q {totalMonetario}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>;
};