import React, { createContext, useContext, useRef, useState } from "react";

// Definir el tipo para el contexto
interface LoginContextType {
  nombreUsuario: string;
  setNombreUsuario: React.Dispatch<React.SetStateAction<string>>;
  showLoginForm: boolean;
  setshowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crear el contexto con un valor por defecto nulo
const LoginContext = createContext<LoginContextType | null>(null);

// Proveedor del contexto
export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [showLoginForm, setshowLoginForm] = useState<boolean>(false);

  return (
    <LoginContext.Provider
      value={{
        nombreUsuario,
        setNombreUsuario,
        showLoginForm,
        setshowLoginForm
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Hook para usar el contexto en los componentes
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin debe usarse dentro de un LoginProvider");
  }
  return context;
};

export default LoginContext;
