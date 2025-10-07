"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoginProvider } from "@/context/loginContext";
import { Toaster } from "sonner"

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
    <html lang="en">
      <title>Libreria</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="bottom-left" />
        <LoginProvider>
        {children}
        </LoginProvider>
      </body>
    </html>
  );
}