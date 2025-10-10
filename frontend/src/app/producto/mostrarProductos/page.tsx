"use client";
import { DataTableDemo } from "@/components/Producto/DataTableDemo";
import Administracion from "@/app/administracion/layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function detalleProductos() {
  return (
    <>
    <ProtectedRoute allowedRoles={["Administrador"]}> 
            <Administracion>
                <DataTableDemo />
            </Administracion>
          </ProtectedRoute>
   </>
  );
}
