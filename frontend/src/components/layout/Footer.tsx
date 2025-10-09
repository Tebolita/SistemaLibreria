"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-r from-indigo-700 via-sky-600 to-indigo-500 text-white">
      {/* Secciones principales */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/20">
        
        {/* 🏢 Acerca de */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Acerca de Librería SPD</h2>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="#" className="hover:text-yellow-300">Quiénes somos</Link></li>
            <li><Link href="#" className="hover:text-yellow-300">Políticas de privacidad</Link></li>
            <li><Link href="#" className="hover:text-yellow-300">Garantía y devoluciones</Link></li>
            <li><Link href="#" className="hover:text-yellow-300">Ventas a empresas</Link></li>
          </ul>
        </div>

        {/* ❓ Ayuda */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ayuda</h2>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="#" className="hover:text-yellow-300">Preguntas frecuentes</Link></li>
            <li><Link href="#" className="hover:text-yellow-300">Métodos de envío</Link></li>
            <li><Link href="#" className="hover:text-yellow-300">Mis pedidos</Link></li>
          </ul>
        </div>

        {/* ☎️ Contacto */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contacto</h2>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-center gap-2"><Phone size={16}/> +502 2300-5678</li>
            <li className="flex items-center gap-2"><Mail size={16}/> soporte@libreriaspd.com</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> Ciudad de Guatemala, Zona 19</li>
            <li className="flex items-center gap-2"><MessageCircle size={16}/> Escríbenos por WhatsApp</li>
          </ul>
        </div>

        {/* 🌐 Redes Sociales */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Síguenos</h2>
          <div className="flex gap-4">
            <Link href="#" className="hover:scale-110 transition-transform">
              <Facebook size={22}/>
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
              <Instagram size={22}/>
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
              <Youtube size={22}/>
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
              <Twitter size={22}/>
            </Link>
          </div>
          <p className="text-sm mt-4 opacity-90">Descubre ofertas, lanzamientos y más</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm py-4 bg-indigo-950/60">
        © {new Date().getFullYear()} <span className="font-semibold">Librería SPD</span>. Todos los derechos reservados.
      </div>
    </footer>
  );
}
