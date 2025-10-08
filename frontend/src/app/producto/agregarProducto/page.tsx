"use client";
import Administracion from "@/app/administracion/layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { FProducto } from "@/components/FProducto";

export default function productos() {
  
  return (
      <ProtectedRoute allowedRoles={["Administrador"]}> 
        <Administracion>
            <FProducto />
        </Administracion>
      </ProtectedRoute>
  );
}