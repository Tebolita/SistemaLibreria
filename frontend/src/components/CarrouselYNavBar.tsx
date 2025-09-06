"use client"

import { use, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ShoppingCart, User, Search, Menu, Heart, UserPlus2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginForm } from "./LoginForm"
import { useRouter } from "next/navigation"
import { ObtenerCategorias, Categorias } from "@/Apis/Categorias.api"
import  { useLogin } from "@/context/loginContext"

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
]





// ====== NAVBAR ======
function NavBar() {
 
  const { showLoginForm, setshowLoginForm, nombreUsuario, setNombreUsuario  } = useLogin();
  const toggleLogin = () => {
      setshowLoginForm(!showLoginForm);
  };
  const router = useRouter();
  const nuevoUsuario = () => {
    router.push("/nuevousuario");
  };  

  const [DataCategoria, setDataCategoria] = useState<Categorias[]>([]);

  useEffect(() => {
    async function GetCategorias() {
      const categorias = await ObtenerCategorias();
      setDataCategoria(categorias);
    }
    GetCategorias();
  }, []);
  return (
    <>      
    <header className="w-full border-b">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="size-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <img src="https://img.lovepik.com/png/20231006/Creative-three-dimensional-book-store-reading-characters-reading-book-stereoscopic_100280_wh860.png" className="h-8 w-8 rounded-xl" />
            <span className="font-semibold tracking-tight">Librería SPD</span>
          </Link>
        </div>

        {/* Search */}
        <form
          className="hidden flex-1 items-center gap-2 md:flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 opacity-60" />
            <Input
              placeholder="Buscar libros, autores, categorías…"
              className="pl-8"
            />
          </div>
          <Button type="submit">Buscar</Button>
        </form>

        {/* User / Wishlist / Cart */}
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <span onClick={toggleLogin} className="flex items-center gap-2 cursor-pointer">
              <User className="size-4" />
              <span>{nombreUsuario ? "Bienvenido: " + nombreUsuario : "Cuenta" }</span>
            </span>
          </Button>

          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <span onClick={nuevoUsuario} className="flex items-center gap-2 cursor-pointer">
              <UserPlus2Icon className="size-4" />
              <span>CrearCuenta</span>
            </span>
          </Button>

          <Button asChild variant="ghost" size="icon">
            <Link href="/favoritos" aria-label="Favoritos">
              <Heart className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/carrito" aria-label="Carrito">
              <ShoppingCart className="size-5" />
              <span className="absolute -right-1 -top-1 rounded-full bg-black px-1.5 text-[11px] leading-5 text-white">
                3
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Categories */}
      <nav className="mx-auto hidden max-w-7xl items-center gap-1 overflow-x-auto px-3 pb-2 md:flex">
        {DataCategoria.map((c) => (
          <Button key={c.Nombre} asChild variant="ghost" className="text-sm">
            <Link href={"/categorias/" + c.Nombre}>{c.Nombre}</Link>
          </Button>
        ))}
      </nav>

      {showLoginForm && <LoginForm />}

      {/* Mobile search */}
      <div className="px-3 pb-3 md:hidden">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 opacity-60" />
            <Input placeholder="Buscar…" className="pl-8" />
          </div>
          <Button type="submit">Ir</Button>
        </form>
      </div>
    </header>


    </>
  )
}

// ====== CAROUSEL ======
function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const durationMs = 5000
  const current = slides[index]
  const nextIndex = useMemo(() => (index + 1) % slides.length, [index])

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), durationMs)
    return () => clearTimeout(t)
  }, [index])

  return (
    <section className="relative w-full">
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
            <div className="max-w-xl space-y-3 rounded-2xl bg-white/80 p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                {current.title}
              </h2>
              <p className="text-sm text-zinc-700 md:text-base">
                {current.subtitle}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Button asChild>
                  <Link href={current.ctaHref}>{current.ctaLabel}</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/categorias">Ver categorías</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
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

        <div className="absolute right-4 top-4 z-10 hidden rounded-md bg-white/70 px-2 py-1 text-xs text-zinc-700 md:block">
          Siguiente: {slides[nextIndex].title}
        </div>
      </div>
    </section>
  )
}


export { NavBar, HeroCarousel }