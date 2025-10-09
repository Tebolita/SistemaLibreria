import {Package, PackageSearch, PackageMinus, PackageOpen,
  BookPlus, BookOpen, BookMinus, BookMarked,
  LogOut,
  ImagePlus, ImageMinus, ImageUpscaleIcon, ImagePlayIcon 
} from "lucide-react"
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,CommandSeparator,CommandShortcut,} from "@/components/ui/command"
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useLogin } from "@/context/loginContext"

const Menus = [
  {
    Titulo: "Producto",
    SubMenus: [
      { Icon: <Package />, Titulo: "Producto", ruta: "/producto" },
      { Icon: <Package />, Titulo: "Agregar Producto", ruta: "/producto/agregarProducto" },
      { Icon: <PackageSearch />, Titulo: "Buscar Producto", ruta: "/buscarproducto" },
      { Icon: <PackageMinus />, Titulo: "Eliminar Producto", ruta: "/eliminarproducto" },
      { Icon: <PackageOpen />, Titulo: "Actualizar Producto", ruta: "/actualizarproducto" },
      { Icon: <PackageOpen />, Titulo: "Mostrar Productos", ruta: "/mostrarproductos" }
    ]
  },
  {
    Titulo: "Categoria",
    SubMenus: [
      { Icon: <BookMarked />, Titulo: "Categoria", ruta: "/administracion/categoria" },
      { Icon: <BookPlus />, Titulo: "Agregar Categoria", ruta: "/administracion/categoria/agregarCategoria" },
    ]
  }, 
  {
    Titulo: "Proveedores",
    SubMenus: [
         { Icon: <ImagePlus />, Titulo: "Proveedor", ruta: "/administracion/proveedor" },
      { Icon: <ImagePlus />, Titulo: "Agregar Proveedor", ruta: "/administracion/proveedor/agregarProveedor" },
      { Icon: <ImageMinus />, Titulo: "Eliminar Proveedor", ruta: "/administracion/proveedor/eliminarProveedor" },
      { Icon: <ImagePlayIcon />, Titulo: "Actualizar Proveedor", ruta: "/administracion/proveedor/actualizarProveedor" },
      { Icon: <ImageUpscaleIcon />, Titulo: "Mostrar Proveedores", ruta: "/administracion/proveedor/mostrarProveedor" }
    ]
  }, 
  {
    Titulo: "Salir",
    SubMenus: [
      { Icon: <LogOut />, Titulo: "Cerrar Sesion", ruta: "/", },
    ]
  },    
];


export function MenuAdministrador() {
    const { setNombreUsuario  } = useLogin();
    const router = useRouter();
    const Redireccionar = (ruta: string) => {
      if (ruta === "/") {
        Cookies.remove("authToken");
        setNombreUsuario("")
      }      
      router.push(ruta);
    };
    
    return (
      <>
      <Command className="rounded-lg border shadow-md md:min-w-[450px] h-full bg-gray-800 text-white pt-30">
        <CommandInput placeholder="Type a command or search..." className="h-full"  />
        <CommandList className="min-h-[400px] max-h-[100vh] w-full ">
          <CommandEmpty>No results found.</CommandEmpty>
          
          {Menus.map((menu) => (
            <React.Fragment key={menu.Titulo}>
              <CommandGroup key={menu.Titulo} heading={menu.Titulo}>
                
                {menu.SubMenus.map((subMenu, index) => (
                  <CommandItem key={index} className="cursor-pointer text-white hover:bg-gray-700" onClick={() => Redireccionar(subMenu.ruta)} >
                    {subMenu.Icon}
                    <span onClick={() => Redireccionar(subMenu.ruta)}>{subMenu.Titulo}</span>
                    <CommandShortcut>⌘{index + 1}</CommandShortcut>
                  </CommandItem>
                ),
                )}
              </CommandGroup>
              <CommandSeparator/>
            </React.Fragment>
          ))}
            
          
        </CommandList>
      </Command>
    </>
    );
}