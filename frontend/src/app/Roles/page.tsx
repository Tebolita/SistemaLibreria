"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GetRoles, Role } from "./roles.api";
export default function Roles() {
  const [DataRoles, setDataRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function GetRolesUsers() {
      const roles = await GetRoles();
      setDataRoles(roles);
    }
    GetRolesUsers();
  }, []);

  return (
    <Table>
      <TableCaption>Tabla de lista de roles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">IdRol</TableHead>
          <TableHead>NombreRol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DataRoles.map((role) => (
          <TableRow key={role.IdRol}>
            <TableCell className="font-medium">{role.IdRol}</TableCell>
            <TableCell >{role.NombreRol}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="text-center">Roles</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}