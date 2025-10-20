'use client';

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

const { mes } = useReportes();
const res = await mes();

export const Tabla = () => {
    const [reporte, setReporte] = useState(res);
    let total = 0;
    let totalMonetario = 0;

    // Array con los nombres de los meses (Enero en el índice 0)
    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    reporte.forEach((informe: any) => {
        total += parseFloat(informe.TotalProductos);
        totalMonetario += parseFloat(informe.TotalVendido);
    });

    useEffect(() => {
        const fetchReportes = async () => {
            const data = await mes();
            setReporte(data);
        }
        fetchReportes();
    }, []);
    
    console.log(reporte);

    return (
        <Table>
            <TableCaption>Reporte por mes</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Mes</TableHead>
                    <TableHead className="w-[100px]">Año</TableHead>
                    <TableHead>Cantidad de productos vendidos</TableHead>
                    <TableHead className="text-right">Total de las ventas</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reporte.map((informe: any) => (
                    <TableRow key={informe.Anio + informe.Mes}>
                        <TableCell className="font-medium">
                            {nombresMeses[informe.Mes - 1]}
                        </TableCell>
                        <TableCell className="font-medium">
                            {informe.Anio}
                        </TableCell>
                        <TableCell>{informe.TotalProductos}</TableCell>
                        <TableCell className="text-right">Q {informe.TotalVendido}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Totales:</TableCell>
                    <TableCell>{total}</TableCell>
                    <TableCell className="text-right">Q {totalMonetario}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};