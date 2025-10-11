import React, { createContext, useContext, useState } from "react";

// Definimos el tipo del contexto
interface LoginContextType {
  nombreUsuario: string;
  setNombreUsuario: React.Dispatch<React.SetStateAction<string>>;
  correoUsuario: string;
  setCorreoUsuario: React.Dispatch<React.SetStateAction<string>>;
  showLoginForm: boolean;
  setshowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  idUsuario: string;
  setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
  nombre: string;
  setNombre: React.Dispatch<React.SetStateAction<string>>;

}

// Creamos el contexto
const LoginContext = createContext<LoginContextType | null>(null);

// Proveedor del contexto
export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [correoUsuario, setCorreoUsuario] = useState<string>("");
  const [showLoginForm, setshowLoginForm] = useState<boolean>(false);
  const [idUsuario, setIdUsuario] = useState<string>("")
  const [nombre, setNombre] = useState<string>("")

  return (
    <LoginContext.Provider
      value={{
        nombreUsuario,
        setNombreUsuario,
        correoUsuario,
        setCorreoUsuario,
        showLoginForm,
        setshowLoginForm,
        idUsuario,
        setIdUsuario,
        nombre,
        setNombre
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Hook para acceder al contexto
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin debe usarse dentro de un LoginProvider");
  }
  return context;
};

export default LoginContext;
