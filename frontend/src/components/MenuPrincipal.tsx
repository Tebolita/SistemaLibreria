"use client"

import '../../style/MenuPrincipal.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideShoppingBasket } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export function MenuPrincipal() {
    const [ShowLogin, setShowLogin] = useState("hidden");
    const [ShowSignUp, setShowSignUp] = useState("hidden");

    const toggleLogin = () => {
        setShowLogin(prev => prev === "" ? "hidden" : "");
    };

    return (
        <>
            <div className="navbar">
                <div className='navbarall' style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Distribuye el espacio
                    width: '100%',
                    gap: '30px' // Espacio entre elementos
                }}>
                    {/* LOGO - Movido a la izquierda con margen derecho automático */}
                    <div style={{ 
                        marginRight: 'auto', // Empuja otros elementos a la derecha
                        paddingLeft: '-100px'   // Espacio desde el borde izquierdo
                    }}>
                        <img 
                            src="https://img.lovepik.com/png/20231006/Creative-three-dimensional-book-store-reading-characters-reading-book-stereoscopic_100280_wh860.png" 
                            className="logo" 
                            style={{ width: '50px' }} // Ajusta el tamaño del logo
                        />
                    </div>
                    
                    {/* BUSCADOR - Ocupa espacio restante */}
                    <div style={{ flexGrow: 1 }}>
                        <form action="">
                            <input 
                                type="text" 
                                className='inputsearch' 
                                placeholder="Buscar..." 
                                style={{ width: '100%' }}
                            />
                        </form>
                    </div>
                        
                    {/* AVATAR */}
                    <div 
                        className="divavatar cursor-pointer" 
                        onClick={toggleLogin}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Avatar>
                            <AvatarImage 
                                src="https://us.123rf.com/450wm/koblizeek/koblizeek2001/koblizeek200100050/138262629-man-icon-profile-member-user-perconal-symbol-vector-on-white-isolated-background.jpg" 
                                alt="@shadcn" 
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar> 
                        <label className='pt-[0] pl-[5] cursor-pointer text-white'>Mi cuenta</label>                
                    </div>

                    {/* ICONO CARRITO */}
                    <LucideShoppingBasket 
                        className="iconcarrito cursor-pointer" 
                        size={30} 
                        color="white" 
                    /> 
                </div>
            </div>

            {/* FORMULARIO LOGIN */}
            <div className="relative w-full max-w-sm ml-auto mr-[15%] absolute">
                <Card className={`w-full max-w-sm ml-auto mr-[15%] absolute ${ShowLogin}`}>
                    <LoginForm />
                </Card>  
            </div>

            <SignUpForm />
        </>
    );
}