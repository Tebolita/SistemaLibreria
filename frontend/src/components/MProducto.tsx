"use client"

import '../../style/MenuPrincipal.css';
import {Avatar,AvatarFallback,AvatarImage, } from "@/components/ui/avatar"
import { LucideShoppingBasket } from "lucide-react"
import { FPProducto } from './FProducto';
import { MenuPrincipal } from './MenuPrincipal';

export function MProducto() {
    

    return (
        <>
        <MenuPrincipal />
        <div className='p-6 flex flex-col justify-center'>
            
            <FPProducto></FPProducto>
        </div>

        </>
    );
}