import { useEffect, useState } from "react";
import { GetEmail } from "@/Apis/login.api";

export function useUserRole() {
  const [role, setRole] = useState<string>("guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      const emailUser = await GetEmail();
      setRole(emailUser.role || "guest");
      setLoading(false);
    }
    fetchRole();
  }, []);
  return { role, loading };
}