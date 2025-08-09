"use client"

import '../../style/MenuPrincipal.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideShoppingBasket, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from 'react';
import { LoginForm } from './LoginForm';

function SignUpForm() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Crear cuenta</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Nombre</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block mb-2">Apellido</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              placeholder="Tu apellido"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Correo electrónico</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded" 
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <label className="block mb-2">Teléfono</label>
          <input 
            type="tel" 
            className="w-full p-2 border rounded" 
            placeholder="Número de teléfono"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded" 
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block mb-2">Confirmar contraseña</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded" 
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="terms" className="h-4 w-4" />
          <label htmlFor="terms">
            Acepto los <a href="#" className="text-blue-600 hover:underline">términos</a>
          </label>
        </div>

        <button 
          type="button" 
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        ¿Ya tienes cuenta?{' '}
        <button type="button" className="text-blue-600 hover:underline">
          Inicia sesión
        </button>
      </div>
    </div>
  );
}

export function MenuPrincipal() {
    const [ShowLogin, setShowLogin] = useState("hidden");
    const [ShowSignUp, setShowSignUp] = useState("hidden");
    const [showLocation, setShowLocation] = useState(false);
    const [location, setLocation] = useState("Guatemala, Zona 9");
    const [selectedDepto, setSelectedDepto] = useState("Guatemala");
    const [selectedMunicipio, setSelectedMunicipio] = useState("Guatemala");
    const [selectedZona, setSelectedZona] = useState("Zona 9");

    const toggleLogin = () => {
        setShowLogin(prev => prev === "" ? "hidden" : "");
        setShowSignUp("hidden");
    };

    const toggleSignUp = () => {
        setShowSignUp(prev => prev === "" ? "hidden" : "");
        setShowLogin("hidden");
    };

    const toggleLocation = () => {
        setShowLocation(!showLocation);
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
                        <span style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'Arial, sans-serif'
                        }}>
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
                            <input 
                                type="text" 
                                className='inputsearch' 
                                placeholder="Buscar..." 
                                style={{ width: '100%' }}
                            />
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
                        
                        {/* Ubicación */}
                        <div 
                            className="cursor-pointer" 
                            onClick={toggleLocation}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                            <span style={{ color: 'white' }}>📍 {location}</span>
                            {showLocation ? <ChevronUp color="white" size={18} /> : <ChevronDown color="white" size={18} />}
                        </div>

                        {/* Avatar Mi Cuenta */}
                        <div 
                            className="divavatar cursor-pointer" 
                            onClick={toggleLogin}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                            <Avatar>
                                <AvatarImage 
                                    src="https://us.123rf.com/450wm/koblizeek/koblizeek2001/koblizeek200100050/138262629-man-icon-profile-member-user-perconal-symbol-vector-on-white-isolated-background.jpg" 
                                    alt="@shadcn" 
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span style={{ color: 'white' }}>Mi cuenta</span>
                        </div>

                        {/* Botón Registrarse */}
                        <button 
                            onClick={toggleSignUp}
                            style={{
                                background: 'transparent',
                                border: '1px solid white',
                                color: 'white',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>

                {/* Desplegable de Ubicación - POSICIÓN CORREGIDA */}
                {showLocation && (
                    <div style={{
                        position: 'absolute',
                        right: '15%',
                        top: '100%', // Cambiado a 100% para que aparezca justo debajo
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        width: '300px',
                        marginTop: '10px' // Espacio adicional
                    }}>
                        <h3 style={{ marginBottom: '15px' }}>Define tu ubicación</h3>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <label>Departamento*</label>
                            <select 
                                value={selectedDepto}
                                onChange={(e) => setSelectedDepto(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option>Guatemala</option>
                                <option>Alta Verapaz</option>
                                <option>Baja Verapaz</option>
                                <option>Chimaltenango</option>
                                <option>Chiquimula</option>
                                <option>El Progreso</option>
                                <option>Escuintla</option>
                                <option>Huehuetenango</option>
                                <option>Izabal</option>
                                <option>Jalapa</option>
                                <option>Jutiapa</option>
                                <option>Petén</option>
                                <option>Quetzaltenango</option>
                                <option>Quiché</option>
                                <option>Retalhuleu</option>
                                <option>Sacatepéquez</option>
                                <option>San Marcos</option>
                                <option>Santa Rosa</option>
                                <option>Sololá</option>
                                <option>Suchitepéquez</option>
                                <option>Totonicapán</option>
                                <option>Zacapa</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Municipio*</label>
                            <select 
                                value={selectedMunicipio}
                                onChange={(e) => setSelectedMunicipio(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option>Guatemala</option>
                                <option>Mixco</option>
                                <option>Villa Nueva</option>
                                <option>Amatitlán</option>
                                <option>Chinautla</option>
                                <option>Chuarrancho</option>
                                <option>Fraijanes</option>
                                <option>San José Pinula</option>
                                <option>San José del Golfo</option>
                                <option>San Juan Sacatepéquez</option>
                                <option>San Miguel Petapa</option>
                                <option>San Pedro Ayampuc</option>
                                <option>San Pedro Sacatepéquez</option>
                                <option>San Raymundo</option>
                                <option>Santa Catarina Pinula</option>
                                <option>Villa Canales</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>Zona*</label>
                            <select 
                                value={selectedZona}
                                onChange={(e) => setSelectedZona(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            >
                                <option>Zona 9</option>
                                <option>Zona 10</option>
                                <option>Zona 7</option>
                                <option>Zona 6</option>
                                <option>Zona 5</option>
                                <option>Zona 4</option>
                                <option>Zona 3</option>
                                <option>Zona 2</option>
                                <option>Zona 1</option>
                                <option>Zona 11</option>
                                <option>Zona 12</option>
                                <option>Zona 16</option>
                                <option>Zona 15</option>
                                <option>Zona 17</option>
                                <option>Zona 18</option>
                                <option>Zona 19</option>
                                <option>Zona 21</option>
                            </select>
                        </div>

                        <button 
                            style={{
                                backgroundColor: '#2563eb',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                            onClick={() => {
                                setLocation(`${selectedDepto}, ${selectedZona}`);
                                setShowLocation(false);
                            }}
                        >
                            Guardar
                        </button>
                    </div>
                )}
            </div>

            {/* FORMULARIO LOGIN */}
            <div className="relative w-full max-w-sm ml-auto mr-[15%] absolute" style={{ zIndex: 100 }}>
                <Card className={`w-full max-w-sm ml-auto mr-[15%] absolute ${ShowLogin}`}>
                    <LoginForm />
                </Card>  
            </div>

            {/* FORMULARIO REGISTRO */}
            <div className="relative w-full max-w-sm ml-auto mr-[15%] absolute" style={{ zIndex: 100 }}>
                <Card className={`w-full max-w-sm ml-auto mr-[15%] absolute ${ShowSignUp}`}>
                    <SignUpForm />
                </Card>  
            </div>
        </>
    );
}