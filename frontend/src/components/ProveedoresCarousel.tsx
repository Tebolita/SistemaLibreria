"use client";

import { motion } from "framer-motion";
import { Building2, Mail, Phone } from "lucide-react";

const proveedores = [
  {
    id: 1,
    nombre: "Editorial Planeta",
    contacto: "María López",
    telefono: "5555-1001",
    correo: "contacto@planeta.com",
    logo: "https://cdn-icons-png.flaticon.com/512/4064/4064952.png",
  },
  {
    id: 2,
    nombre: "Penguin Random House",
    contacto: "Carlos Hernández",
    telefono: "5555-1002",
    correo: "ventas@penguinrh.com",
    logo: "https://cdn-icons-png.flaticon.com/512/2947/2947985.png",
  },
  {
    id: 3,
    nombre: "Santillana S.A.",
    contacto: "Lucía Gómez",
    telefono: "5555-1003",
    correo: "lgomez@santillana.com",
    logo: "https://cdn-icons-png.flaticon.com/512/4287/4287725.png",
  },
  {
    id: 4,
    nombre: "Norma Editorial",
    contacto: "Javier Ruiz",
    telefono: "5555-1004",
    correo: "jruiz@normaeditorial.com",
    logo: "https://cdn-icons-png.flaticon.com/512/3781/3781954.png",
  },
  {
    id: 5,
    nombre: "Panini Books",
    contacto: "Andrea Morales",
    telefono: "5555-1005",
    correo: "amorales@paninibooks.com",
    logo: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
  },
  {
    id: 6,
    nombre: "Office Depot",
    contacto: "David Castillo",
    telefono: "5555-1006",
    correo: "dcastillo@officedepot.com",
    logo: "https://cdn-icons-png.flaticon.com/512/2329/2329087.png",
  },
  {
    id: 7,
    nombre: "HP Supplies",
    contacto: "Fernando García",
    telefono: "5555-1007",
    correo: "fgarcia@hpsupplies.com",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968342.png",
  },
  {
    id: 8,
    nombre: "Lumen Librerías",
    contacto: "Sofía Torres",
    telefono: "5555-1008",
    correo: "storres@lumen.com",
    logo: "https://cdn-icons-png.flaticon.com/512/2769/2769343.png",
  },
  {
    id: 9,
    nombre: "Amazon Books",
    contacto: "José Martínez",
    telefono: "5555-1009",
    correo: "jmartinez@amazonbooks.com",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968890.png",
  },
  {
    id: 10,
    nombre: "Digital Paper Co.",
    contacto: "Paula Rivera",
    telefono: "5555-1010",
    correo: "privera@digitalpaperco.com",
    logo: "https://cdn-icons-png.flaticon.com/512/3959/3959420.png",
  },
];

export function ProveedoresCarousel() {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-sky-50 py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🤝 Nuestros Proveedores
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...proveedores, ...proveedores].map((prov, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center"
            >
              <img
                src={prov.logo}
                alt={prov.nombre}
                className="h-16 w-16 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">{prov.nombre}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                <Building2 className="w-4 h-4 text-blue-500" /> {prov.contacto}
              </p>

              <div className="text-xs text-gray-400 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                <p className="flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3 text-green-500" /> {prov.telefono}
                </p>
                <p className="flex items-center justify-center gap-1">
                  <Mail className="w-3 h-3 text-sky-500" /> {prov.correo}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
