import { MenuPrincipal } from "@/components/MenuPrincipal";
import { FProducto } from "@/components/FProducto";

export default function productos() {
  return (
    <div className="h-screen border-8 border-green-500">
      <div>
        <MenuPrincipal/>
      </div>
      <div className='flex border-8 border-red-600'>
        <div className='w-1/6 bg-red-500'></div>
        <div className='w-5/6 p-6'>
         <FProducto/>
        </div>
      </div>
    </div>
    
  );
}