"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoginProvider } from "@/context/loginContext";
import { Toaster } from "sonner";
import { NavBar } from "@/components/CarrouselYNavBar";
import Footer from "@/components/layout/Footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Librería SPD</title>
        <meta name="description" content="Tu librería en línea favorita - SPD" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* 🔔 Notificaciones */}
        <Toaster position="bottom-left" />

        {/* 👤 Contexto de login */}
        <LoginProvider>
          {/* 🧭 Navbar principal */}
          <NavBar />

          {/* 🌐 Contenido de la página */}
          <main className="pt-20 min-h-screen">{children}</main>

          {/* 🪶 Footer profesional */}
          <Footer />
        </LoginProvider>
      </body>
    </html>
  );
}
