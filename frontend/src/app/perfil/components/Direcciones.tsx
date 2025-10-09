"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, MapPin, Pencil } from "lucide-react";

export default function Direcciones() {
  const [direcciones, setDirecciones] = useState([
    {
      id: 1,
      nombre: "Casa principal",
      direccion: "5ta Avenida 10-25 Zona 1, Ciudad de Guatemala",
      telefono: "5555-1234",
    },
    {
      id: 2,
      nombre: "Oficina",
      direccion: "Boulevard Los Próceres, Edificio Torre Azul, Zona 10",
      telefono: "4444-5678",
    },
  ]);

  const [nuevaDireccion, setNuevaDireccion] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });

  const [open, setOpen] = useState(false);

  const agregarDireccion = () => {
    if (!nuevaDireccion.nombre || !nuevaDireccion.direccion || !nuevaDireccion.telefono) return;
    const nueva = {
      id: direcciones.length + 1,
      ...nuevaDireccion,
    };
    setDirecciones([...direcciones, nueva]);
    setNuevaDireccion({ nombre: "", direccion: "", telefono: "" });
    setOpen(false);
  };

  const eliminarDireccion = (id: number) => {
    setDirecciones(direcciones.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">📍 Mis direcciones</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Agregar nueva</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar dirección</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Nombre (Casa, Oficina, etc.)"
                value={nuevaDireccion.nombre}
                onChange={(e) => setNuevaDireccion({ ...nuevaDireccion, nombre: e.target.value })}
              />
              <Input
                placeholder="Dirección completa"
                value={nuevaDireccion.direccion}
                onChange={(e) => setNuevaDireccion({ ...nuevaDireccion, direccion: e.target.value })}
              />
              <Input
                placeholder="Teléfono"
                value={nuevaDireccion.telefono}
                onChange={(e) => setNuevaDireccion({ ...nuevaDireccion, telefono: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button onClick={agregarDireccion}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 📦 Lista de direcciones */}
      {direcciones.length === 0 ? (
        <p className="text-gray-500 text-sm">Aún no tienes direcciones registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {direcciones.map((d) => (
            <Card key={d.id} className="p-5 flex flex-col gap-3 shadow-sm border">
              <div className="flex items-center gap-2">
                <MapPin className="text-indigo-600 h-5 w-5" />
                <h3 className="font-semibold text-gray-800">{d.nombre}</h3>
              </div>
              <p className="text-sm text-gray-600">{d.direccion}</p>
              <p className="text-sm text-gray-500">📞 {d.telefono}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Pencil className="h-4 w-4" /> Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => eliminarDireccion(d.id)}
                >
                  <Trash2 className="h-4 w-4" /> Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
