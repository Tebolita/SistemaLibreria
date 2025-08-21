"use client";


import '../../style/MenuPrincipal.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideShoppingBasket, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { useRouter } from 'next/navigation'

export function MenuPrincipal() {
    const [ShowLogin, setShowLogin] = useState("hidden");
    const [ShowSignUp, setShowSignUp] = useState("hidden");

    const router = useRouter();

    const handleRedirect = () => {
    router.push("/nuevousuario");
    };

    const regresarInicio = () => {
    router.push("/");
    };

    const toggleLogin = () => {
        setShowLogin(prev => prev === "" ? "hidden" : "");
        setShowSignUp("hidden");
    };


    return (
        <>
            <div className="navbar relative"> {/* Añadí relative aquí */}
                <div className='navbarall' style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '30px'
                }}>
                    {/* LOGO + TEXTO */}
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: 'auto',
                        marginLeft: '-280px',
                        gap: '10px'
                    }}>
                        <img 
                            src="https://img.lovepik.com/png/20231006/Creative-three-dimensional-book-store-reading-characters-reading-book-stereoscopic_100280_wh860.png" 
                            className="logo" 
                            style={{ width: '50px' }} 
                        />
                        <span
                        onClick={regresarInicio}
                        style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'Arial, sans-serif'
                        }}
                        className='cursor-pointer'>
                            
                            LIBRERIA SPD
                        </span>
                    </div>
                    
                    {/* BUSCADOR + CATEGORÍAS */}
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        gap: '20px'
                    }}>
                        {/* Icono Categorías */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span style={{ color: 'white' }}>Categorías</span>
                        </div>
                        
                        {/* Buscador */}
                        <form action="" style={{ width: '100%' }}>
                            <input type="text" className='inputsearch' placeholder="Buscar..." style={{ width: '100%' }}/>
                        </form>
                    </div>
                        
                    {/* CARRITO + UBICACIÓN + AVATAR + REGISTRO */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* Icono Carrito */}
                        <LucideShoppingBasket 
                            className="iconcarrito cursor-pointer" 
                            size={30} 
                            color="white" 
                        />

                        {/* Avatar Mi Cuenta */}
                        <div 
                            className="divavatar cursor-pointer" 
                            onClick={toggleLogin}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                            <Avatar>
                                <AvatarImage  src="https://us.123rf.com/450wm/koblizeek/koblizeek2001/koblizeek200100050/138262629-man-icon-profile-member-user-perconal-symbol-vector-on-white-isolated-background.jpg" alt="@shadcn"  />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span style={{ color: 'white' }}>Mi cuenta</span>
                        </div>

                        {/* Botón Registrarse */}
                        <button onClick={handleRedirect} style={{background: 'transparent',border: '1px solid white',color: 'white',padding: '8px 12px',borderRadius: '4px',cursor: 'pointer',fontSize: '0.9rem'}}>
                          Registrarse
                        </button>
                    </div>
                </div>
            </div>

            {/* FORMULARIO LOGIN */}
            <div className="relative w-full max-w-sm ml-auto mr-[15%] absolute" style={{ zIndex: 100 }}>
                <Card className={`w-full max-w-sm ml-auto mr-[15%] absolute ${ShowLogin}`}>
                    <LoginForm />
                </Card>  
            </div>

        </>
    );
}