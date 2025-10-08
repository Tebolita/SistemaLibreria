"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  ShoppingCart,
  CreditCard,
  Truck,
  MapPin,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem, Label } from "@/components/ui/label";


export default function SeguimientoPedido() {
  const [estadoIndex, setEstadoIndex] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [iniciado, setIniciado] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState("");

  // Generar número de pedido aleatorio tipo SPD-20251006-001
  const generarNumeroPedido = () => {
    const fecha = new Date();
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 900 + 100);
    return `SPD-${y}${m}${d}-${random}`;
  };

  // Etapas
  const etapasEfectivo = [
    { nombre: "Pedido recibido", color: "bg-yellow-400", icono: ClipboardList },
    { nombre: "Preparando el pedido", color: "bg-orange-400", icono: ShoppingCart },
    { nombre: "En camino", color: "bg-amber-500", icono: Truck },
    { nombre: "Entregado", color: "bg-green-500", icono: MapPin },
  ];

  const etapasTransferencia = [
    { nombre: "Pedido recibido", color: "bg-yellow-400", icono: ClipboardList },
    { nombre: "Validando pago", color: "bg-blue-400", icono: ShieldCheck },
    { nombre: "Pago confirmado", color: "bg-indigo-400", icono: CreditCard },
    { nombre: "Preparando envío", color: "bg-orange-400", icono: Truck },
    { nombre: "Entregado", color: "bg-green-500", icono: MapPin },
  ];

  const etapas = metodoPago === "transferencia" ? etapasTransferencia : etapasEfectivo;

  // Simulación del progreso
  useEffect(() => {
    if (!iniciado || finalizado) return;

    if (estadoIndex >= etapas.length - 1) {
      const timer = setTimeout(() => setFinalizado(true), 1200);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setEstadoIndex((prev) => (prev < etapas.length ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, [estadoIndex, finalizado, iniciado]);

  const iniciarSeguimiento = () => {
    if (!nombre || !direccion || !telefono) {
      alert("Por favor completa todos los datos del cliente antes de continuar.");
      return;
    }
    setNumeroPedido(generarNumeroPedido());
    setIniciado(true);
    setEstadoIndex(0);
    setFinalizado(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-10 rounded-xl shadow-md text-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">
        Seguimiento de Pedido
      </h1>
      <p className="text-gray-600 mb-8">
        Revisa el estado de tu compra paso a paso 🚚
      </p>

      {/* FORMULARIO DE DATOS */}
      {!iniciado && (
        <>
          <div className="grid gap-4 mb-6 text-left">
            <Input
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              placeholder="Dirección de entrega"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <Input
              placeholder="Teléfono de contacto"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          {/* MÉTODO DE PAGO */}
          <div className="text-left mb-6">
            <Label className="font-semibold mb-2 block">Método de pago</Label>
            <RadioGroup
              defaultValue="efectivo"
              onValueChange={(val) => setMetodoPago(val)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="efectivo" id="efectivo" />
                <Label htmlFor="efectivo">Pago en efectivo (al recibir)</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="transferencia" id="transferencia" />
                <Label htmlFor="transferencia">Transferencia bancaria</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 text-lg rounded-lg"
            onClick={iniciarSeguimiento}
          >
            Confirmar compra
          </Button>
        </>
      )}

      {/* TRACKING */}
      {iniciado && (
        <>
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              <strong>Número de pedido:</strong>{" "}
              <span className="text-indigo-700 font-semibold">
                {numeroPedido}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Cliente: {nombre} — {metodoPago === "efectivo" ? "Efectivo" : "Transferencia"}
            </p>
          </div>

          <div className="mt-10">
            <div className="flex justify-between items-center relative">
              {etapas.map((etapa, index) => {
                const Icon = etapa.icono;
                const completado = index <= estadoIndex;
                const esFinal = finalizado && index === etapas.length - 1;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center w-28 transition-all duration-700"
                  >
                    <div
                      className={`w-20 h-20 flex items-center justify-center rounded-lg text-white font-bold shadow-md transform transition-all duration-700 ${
                        finalizado
                          ? "bg-green-500"
                          : completado
                          ? etapa.color
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {esFinal ? (
                        <CheckCircle size={34} className="text-white" />
                      ) : (
                        <Icon size={34} />
                      )}
                    </div>
                    <p
                      className={`mt-3 text-xs text-center font-semibold ${
                        finalizado
                          ? "text-green-600"
                          : completado
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {etapa.nombre}
                    </p>

                    {index < etapas.length - 1 && (
                      <div
                        className={`absolute top-[40%] left-[calc(12%+${index * 20}%)] h-2 w-[18%] rounded-full -z-10 transition-all duration-700 ${
                          finalizado
                            ? "bg-green-500"
                            : completado
                            ? "bg-orange-400"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MENSAJE FINAL */}
          {finalizado ? (
            <div className="mt-10 text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                ✅ Pedido completado con éxito
              </h2>
              <p className="text-gray-600 mb-6">
                ¡Gracias {nombre}! Tu pedido <strong>{numeroPedido}</strong> ha
                sido entregado satisfactoriamente.
              </p>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
                onClick={() => {
                  setIniciado(false);
                  setEstadoIndex(0);
                  setFinalizado(false);
                  setNombre("");
                  setDireccion("");
                  setTelefono("");
                  setNumeroPedido("");
                }}
              >
                Simular nuevo pedido
              </Button>
            </div>
          ) : (
            <p className="text-gray-600 italic mt-6">
              Procesando etapa:{" "}
              <span className="font-bold text-indigo-600">
                {etapas[estadoIndex]?.nombre}
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
}
