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
  Banknote,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SeguimientoPedido() {
  const [estadoIndex, setEstadoIndex] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [iniciado, setIniciado] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState("");

  // Generar número de pedido tipo SPD-YYYYMMDD-###
  const generarNumeroPedido = () => {
    const fecha = new Date();
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 900 + 100);
    return `SPD-${y}${m}${d}-${random}`;
  };

  // Etapas según método
  const etapasEfectivo = [
    { nombre: "Pedido recibido", color: "bg-yellow-400", icono: ClipboardList },
    { nombre: "Preparando el pedido", color: "bg-orange-400", icono: ShoppingCart },
    { nombre: "En camino", color: "bg-amber-500", icono: Truck },
    { nombre: "Entregado", color: "bg-green-500", icono: MapPin },
  ];

  const etapasTransferencia = [
    { nombre: "Pedido recibido", color: "bg-yellow-400", icono: ClipboardList },
    { nombre: "Transferencia recibida", color: "bg-blue-400", icono: Banknote },
    { nombre: "Transferencia validada", color: "bg-indigo-400", icono: ShieldCheck },
    { nombre: "Preparando el pedido", color: "bg-orange-400", icono: ShoppingCart },
    { nombre: "En camino", color: "bg-amber-500", icono: Truck },
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
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="metodo"
                  value="efectivo"
                  checked={metodoPago === "efectivo"}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  className="h-4 w-4 accent-indigo-600 cursor-pointer"
                />
                Pago en efectivo (al recibir)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="metodo"
                  value="transferencia"
                  checked={metodoPago === "transferencia"}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  className="h-4 w-4 accent-indigo-600 cursor-pointer"
                />
                Transferencia bancaria
              </label>
            </div>
          </div>

          {/* 💳 DATOS BANCARIOS (solo si elige transferencia) */}
          {metodoPago === "transferencia" && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-6 text-left animate-fade-in">
              <h3 className="font-bold text-indigo-700 mb-2">
                Datos para transferencia bancaria:
              </h3>
              <p><strong>Banco:</strong> Banco Industrial</p>
              <p><strong>Cuenta:</strong> 123-456789-0</p>
              <p><strong>Nombre:</strong> Librería SPD Guatemala</p>
              <p><strong>Monto a transferir:</strong> Según total del pedido</p>
              <p className="text-sm text-gray-500 mt-2">
                Envía tu comprobante al correo{" "}
                <span className="text-indigo-600">pagos@spdlibros.com</span> para validación.
              </p>
            </div>
          )}

          <Button
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 text-lg rounded-lg"
            onClick={iniciarSeguimiento}
          >
            Confirmar compra
          </Button>

          {/* DEBUG VISUAL PARA VERIFICAR */}
          <p className="mt-3 text-xs text-gray-500">
            <strong>Método seleccionado:</strong> {metodoPago}
          </p>
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
              Cliente: {nombre} —{" "}
              {metodoPago === "efectivo" ? "Efectivo" : "Transferencia bancaria"}
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
                      className={`w-20 h-20 flex items-center justify-center rounded-lg text-white font-bold shadow-md transition-all duration-700 ${
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
                ¡Gracias {nombre}! Tu pedido <strong>{numeroPedido}</strong> ha sido entregado satisfactoriamente.
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
                  setMetodoPago("efectivo");
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
