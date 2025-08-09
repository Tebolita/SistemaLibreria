"use client"

import '../../style/MenuPrincipal.css';
import {Avatar,AvatarFallback,AvatarImage, } from "@/components/ui/avatar"
import { LucideShoppingBasket } from "lucide-react"
import { FProducto } from './FProducto';
import { MenuPrincipal } from './MenuPrincipal';

export function MProducto() {
    

    return (
        <>
        <div className='h-scree flex flex-col'>
            <div>
                <MenuPrincipal />
            </div>
            <div className='flex border-8 border-red-600'>
                <div className='w-1/6 bg-blue-500'></div>
                <div className='w-5/6 p-6'>
                    <FProducto ></FProducto>
                </div>
                
            </div>
        </div>
        
        </>
    );
}