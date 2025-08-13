import { MenuPrincipal } from "@/components/MenuPrincipal";
import { FProducto } from "@/components/FProducto";
import { Button } from "@/components/ui/button"

export default function productos() {

  return (
    <>
    <div>
      <MenuPrincipal/>
    </div>
    <div className="h-screen flex">
      <div className="bg-blue-500 w-1/6 p-4">
        <Button className="bg-blue-500 w-full h-15 hover:bg-blue-300 text-2xl">VER TODOS</Button>
        <Button className="bg-blue-500 w-full h-15 hover:bg-blue-300 text-2xl">CONSULTAR</Button>
        <Button className="bg-blue-500 w-full h-15 hover:bg-blue-300 text-2xl">AGREGAR</Button>
      </div>
      <div className="w-5/6">
        <div className="p-8">
          <FProducto/>
        </div>
      </div>
    </div>
    </>
  );
}