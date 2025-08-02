"use client"

import '../../style/MenuPrincipal.css';
import {Avatar,AvatarFallback,AvatarImage, } from "@/components/ui/avatar"
import { LucideShoppingBasket } from "lucide-react"
import { FPProducto } from './FProducto';

export function MProducto() {
    

    return (
        <>
        <div className="navbar">
           <div className='navbarall'>

                <div className='divlogo'>
                    <i><img src="https://icon-library.com/images/google-chrome-flat-icon/google-chrome-flat-icon-14.jpg" className="logo" /></i>
                </div>

                <div className='formsearch'>
                    <form action="">
                        <input type="text" className='inputsearch' placeholder="Buscar..." />
                    </form>
                </div>

                <div className="divavatar cursor-pointer">
                     <Avatar>
                        <AvatarImage className='' src="https://i.pinimg.com/736x/ea/14/be/ea14bee044fa375912172d115277de0e.jpg" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> 
                    <label className='pt-[0] pl-[5] cursor-pointer text-white'>Mi cuenta</label>                
                </div>
            <LucideShoppingBasket className="iconcarrito cursor-pointer" size={30} color="white" /> 
           </div>
        </div>
        <div className='p-6 flex flex-col justify-center'>
            
            <FPProducto></FPProducto>
        </div>

        </>
    );
}