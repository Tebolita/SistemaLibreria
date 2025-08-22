"use client";
import { FProducto } from "@/components/FProducto";
import { MenuAdministrador }   from "@/components/MenuAdministrador";
import { NavBar } from "@/components/CarrouselYNavBar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export default function productos() {

  

  return (
      <ProtectedRoute allowedRoles={["Administrador"]}> 
        <div className="h-screen">
          <div className='flex'>
            <div className="h-[calc(90vh)]">
              <MenuAdministrador/>
            </div>
            <div className='w-5/6 p-6'>
            <FProducto/>
            </div>
          </div>
        </div>
      </ProtectedRoute>
  );
}