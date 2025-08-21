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
  const { role, loading } = useUserRole();

  useEffect(() => {
    if (!loading && !allowedRoles.includes(role)) {
      router.replace("/no-autorizado");
    }
  }, [role, allowedRoles, router, loading]);

  if (loading) return null; // o un loader

  return allowedRoles.includes(role) ? <>{children}</> : null;
}