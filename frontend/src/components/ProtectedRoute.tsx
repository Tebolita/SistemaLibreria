"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/hooks/UserRole";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const router = useRouter();
  const role = useUserRole(); // Llama el hook directamente

  useEffect(() => {
    if (!allowedRoles.includes(role)) {
      router.replace("/no-autorizado");
    }
  }, [role, allowedRoles, router]);

  return allowedRoles.includes(role) ? <>{children}</> : null;
}