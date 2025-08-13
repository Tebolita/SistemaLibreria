import { MenuPrincipal } from "@/components/MenuPrincipal";
import { FProducto } from "@/components/FProducto";

export default function productos() {

  

  return (
    <div className="h-screen">
      <div>
        <MenuPrincipal/>
      </div>
      <div className='flex'>
        <div className='w-1/6 bg-blue-500'></div>
        <div className='w-5/6 p-6'>
         <FProducto/>
        </div>
      </div>
    </div>
    
  );
}