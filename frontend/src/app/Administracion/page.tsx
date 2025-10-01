"use client";
import { MenuAdministrador }   from "@/components/MenuAdministrador";
import { NavBar } from "@/components/CarrouselYNavBar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export default function Administracion({ children,}: Readonly<{children: React.ReactNode;}>) {

  return (
      <ProtectedRoute allowedRoles={["Administrador"]}> 
        <NavBar/>
        <div className="h-screen">
          <div className='flex'>
            <div className="h-[calc(90vh)]">
              <MenuAdministrador/>
            </div>
            <div className='w-5/6 p-6'>
                { children }
            </div>
          </div>
        </div>
      </ProtectedRoute>
  );
}