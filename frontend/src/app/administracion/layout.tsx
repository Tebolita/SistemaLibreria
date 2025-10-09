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
            <div style={{ overflowY: 'auto', height: 'calc(90vh)' }} className='w-5/6 p-6 pt-30'>
                { children }
            </div>
          </div>
        </div>
      </ProtectedRoute>
  );
}