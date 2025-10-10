"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  UserPlus2Icon,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginForm } from "./LoginForm";
import { useRouter, usePathname } from "next/navigation"; // ✅ Agregar usePathname
import { Categorias } from "@/Apis/Categorias.api";
import { useLogin } from "@/context/loginContext";
import { getCartCount } from "@/components/ui/cartCookie";
import CartPopover from "@/components/ui/CartPopover";
import { useCategoria } from "@/hooks/useCategorias";
import CategoriaDrawer from "@/components/navbar/CategoriaDrawer";
import { useUserRole } from "@/hooks/UserRole"; 

/* ==========================================================
   🎠 SLIDES HERO
========================================================== */
const slides = [
  {
    id: "promo-1",
    title: "Novedades en Literatura",
    subtitle: "Hasta 25% OFF en títulos seleccionados",
    ctaLabel: "Ver ofertas",
    ctaHref: "/ofertas",
    bg: "bg-[url('https://i.pinimg.com/originals/56/39/4e/56394e1cfd7ab0204703ff6e49936d55.gif')]",
  },
  {
    id: "promo-2",
    title: "Textos Universitarios",
    subtitle: "Fin de ciclo: arma tu paquete",
    ctaLabel: "Armar paquete",
    ctaHref: "/paquetes",
    bg: "bg-[url('https://i.pinimg.com/originals/b1/5b/d5/b15bd596014d9d9310e59b07b85da550.gif')]",
  },
  {
    id: "promo-3",
    title: "Accesorios & Papelería",
    subtitle: "2x1 en destacados de temporada",
    ctaLabel: "Comprar ahora",
    ctaHref: "/accesorios",
    bg: "bg-[url('https://i.pinimg.com/originals/39/38/77/3938775fa4484f170466ecfa6da4e662.gif')]",
  },
  {
    id: "promo-4",
    title: "Descuentos en Libros Infantiles",
    subtitle: "10%, 20% y 30% OFF en títulos seleccionados",
    ctaLabel: "Ver ofertas",
    ctaHref: "/LibrosInfantiles",
    bg: "bg-[url('https://i.pinimg.com/originals/8e/91/24/8e9124b560a7927ab61206bc466f14e6.gif')]",
  },
];

/* ==========================================================
   🧭 NAVBAR PRINCIPAL
========================================================== */
function NavBar() {
  const { showLoginForm, setshowLoginForm, nombreUsuario } = useLogin();
  const router = useRouter();
  const pathname = usePathname(); // ✅ Para detectar cambios de ruta
  const { categoriasActivas } = useCategoria();
  const { role } = useUserRole()
  const [DataCategoria, setDataCategoria] = useState<Categorias[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [lastCount, setLastCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);

  const toggleLogin = () => setshowLoginForm(!showLoginForm);
  const nuevoUsuario = () => router.push("/nuevousuario");
  const administracionSettings = () => router.push("/producto");
  const UsuarioSettings = () => router.push("/perfil");

  // ✅ Cargar categorías al montar y cuando cambie la ruta
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const categorias = await categoriasActivas();
        setDataCategoria(categorias);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    loadCategorias();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const count = getCartCount();
      setCartCount(count);
      if (count > lastCount) {
        setShowCart(true);
        setTimeout(() => setShowCart(false), 3000);
      }
      setLastCount(count);
    };
    tick();
    const id = setInterval(tick, 800);
    return () => clearInterval(id);
  }, [lastCount]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/90 shadow-md"
          : "backdrop-blur-lg bg-white/60 shadow-sm"
      }`}
    >
      {/* 🟣 TOP BAR */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* LOGO + CATEGORÍAS */}
        <div className="flex items-center gap-3">
          {/* Botón Categorías */}
          <Button
            variant="outline"
            onClick={() => setShowCategorias(!showCategorias)}
            className="border-2 border-transparent bg-gradient-to-r from-indigo-500 to-sky-400 text-white hover:scale-[1.03] transition-transform shadow-sm"
          >
            <Menu className="size-4 mr-1" />
            Categorías
          </Button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://img.lovepik.com/png/20231006/Creative-three-dimensional-book-store-reading-characters-reading-book-stereoscopic_100280_wh860.png"
              className="h-8 w-8 rounded-xl"
            />
            <span className="font-semibold tracking-tight text-gray-800">
              Librería SPD
            </span>
          </Link>
        </div>

        {/* 🔍 BUSCADOR */}
        <form
          className="hidden flex-1 items-center gap-2 md:flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 opacity-60" />
            <Input
              placeholder="Buscar libros, autores, categorías…"
              className="pl-8 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-sky-400 text-white hover:opacity-90"
          >
            Buscar
          </Button>
        </form>

        {/* 👤 USUARIO / FAVORITOS / CARRITO */}
        <div className="flex items-center gap-3 relative">
          <Button asChild variant="ghost" className="hidden md:inline-flex group">
            <span
              onClick={toggleLogin}
              className="flex items-center gap-2 cursor-pointer transition-transform group-hover:scale-[1.05]"
            >
              <User className="size-4 text-indigo-600 group-hover:text-indigo-800" />
              <span>
                {nombreUsuario ? `Bienvenido: ${nombreUsuario}` : "Cuenta"}
              </span>
            </span>
          </Button>
          {role === "Administrador" 
          ? 
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <span
              onClick={administracionSettings}
              className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.05]"
            >
              <Settings className="size-4 text-sky-600" />
              <span>Administrar sistema</span>
            </span>
          </Button>
          
          :
          role !== "Administrador" && role !== "guest" ?  
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <span
              onClick={UsuarioSettings}
              className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.05]"
            >
              <Settings className="size-4 text-sky-600" />
              <span>Mi usuario</span>
            </span>
          </Button>                  
          :
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <span
              onClick={nuevoUsuario}
              className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.05]"
            >
              <UserPlus2Icon className="size-4 text-sky-600" />
              <span>CrearCuenta</span>
            </span>
          </Button>}

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hover:scale-[1.1] transition-transform"
          >
            <Link href="/favoritos" aria-label="Favoritos">
              <Heart className="size-5 text-rose-500 hover:text-rose-600" />
            </Link>
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:scale-[1.1] transition-transform"
              onClick={() => setShowCart((v) => !v)}
              aria-label="Carrito"
            >
              <ShoppingCart className="size-5 text-emerald-600" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-green-600 px-1.5 text-[11px] leading-5 text-white shadow-md">
                  {cartCount}
                </span>
              )}
            </Button>

            {showCart && (
              <div className="absolute right-0 top-10">
                <CartPopover onClose={() => setShowCart(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      
      {/* 📚 CATEGORÍAS */}
      <nav className="mx-auto hidden max-w-7xl items-center gap-1 overflow-x-auto px-3 pb-2 md:flex">
        {DataCategoria.map((c, index) => (
          <Button key={index} asChild variant="ghost" className="text-sm">
            <Link href={`/categorias/${c.Nombre}`}>{c.Nombre}</Link>
          </Button>
        ))}
      </nav>

      {/* 🔐 LOGIN MODAL */}
      {showLoginForm && <LoginForm />}

      {/* 🧭 Drawer de categorías (versión lateral moderna) */}
      <CategoriaDrawer
        isOpen={showCategorias}
        onClose={() => setShowCategorias(false)}
        categorias={DataCategoria}
      />
    </header>
  );
}

/* ==========================================================
   🎠 HERO CAROUSEL
========================================================== */
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const durationMs = 5000;
  const current = slides[index];

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), durationMs);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section className="relative w-full mt-5">
      <div className="relative h-[40vh] w-full overflow-hidden sm:h-[50vh] md:h-[60vh]">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            className={`absolute inset-0 bg-cover bg-no-repeat bg-center ${current.bg} flex items-center justify-center`}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-xl space-y-3 rounded-2xl bg-white/80 p-6 backdrop-blur-sm shadow-md">
              <h2 className="text-2xl font-bold tracking-tight md:text-4xl text-indigo-700">
                {current.title}
              </h2>
              <p className="text-sm text-zinc-700 md:text-base">{current.subtitle}</p>
              <div className="flex items-center gap-2 pt-2">
                <Button asChild className="bg-gradient-to-r from-indigo-500 to-sky-400 text-white">
                  <Link href={current.ctaHref}>{current.ctaLabel}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/categorias">Ver categorías</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-black/30 px-2 py-1 backdrop-blur">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Ir al slide ${i + 1}`}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { NavBar, HeroCarousel };