'use client'
import { useEffect, useState } from "react";
import { GetEmail } from "@/Apis/login.api";
import  { useLogin } from "@/context/loginContext";

export function useUserRole() {
  const [role, setRole] = useState<string>("guest");
  const [loading, setLoading] = useState(true);
  const { nombreUsuario, setNombreUsuario } = useLogin();

  useEffect(() => {
    async function fetchRole() {
      const emailUser = await GetEmail();
      setRole(emailUser.role || "guest");
      setLoading(false);
      setNombreUsuario(emailUser.username);
    }
    fetchRole();
  }, []);
  return { role, loading };
}