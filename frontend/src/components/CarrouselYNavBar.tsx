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
  Settings,
  ShieldCheck,
  Truck,
  PhoneCall,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginForm } from "./LoginForm";
import { useRouter, usePathname } from "next/navigation";
import { useLogin } from "@/context/loginContext";
import { getCartCount } from "@/components/ui/cartCookie";
import CartPopover from "@/components/ui/CartPopover";
import CategoriaDrawer from "@/components/navbar/CategoriaDrawer";
import { useCategoria } from "@/hooks/useCategorias";
import { useUserRole } from "@/hooks/UserRole";
import { ProductosPopulares } from "@/components/ProductosPopulares";

/* ==========================================================
   🎠 SLIDES DEL CARRUSEL
========================================================== */
const slides = [
  {
    id: "promo-1",
    title: "📚 Novedades en Literatura",
    subtitle: "Hasta 25% OFF en títulos seleccionados",
    ctaLabel: "Ver ofertas",
    ctaHref: "/ofertas",
    imageUrl:
      "https://i.pinimg.com/originals/56/39/4e/56394e1cfd7ab0204703ff6e49936d55.gif",
  },
  {
    id: "promo-2",
    title: "🎓 Textos Universitarios",
    subtitle: "Fin de ciclo: arma tu paquete ideal",
    ctaLabel: "Ver paquetes",
    ctaHref: "/paquetes",
    imageUrl:
      "https://i.pinimg.com/originals/b1/5b/d5/b15bd596014d9d9310e59b07b85da550.gif",
  },
  {
    id: "promo-3",
    title: "🖊️ Accesorios & Papelería",
    subtitle: "2x1 en destacados de temporada",
    ctaLabel: "Comprar ahora",
    ctaHref: "/accesorios",
    imageUrl:
      "https://i.pinimg.com/originals/39/38/77/3938775fa4484f170466ecfa6da4e662.gif",
  },
  {
    id: "promo-4",
    title: "📖 Libros Infantiles",
    subtitle: "10%, 20% y 30% OFF en títulos seleccionados",
    ctaLabel: "Descubrir ahora",
    ctaHref: "/LibrosInfantiles",
    imageUrl:
      "https://i.pinimg.com/originals/8e/91/24/8e9124b560a7927ab61206bc466f14e6.gif",
  },
];

/* ==========================================================
   🧭 NAVBAR
========================================================== */
function NavBar() {
  const { showLoginForm, setshowLoginForm, nombreUsuario } = useLogin();
  const router = useRouter();
  const pathname = usePathname();
  const { categoriasActivas } = useCategoria();
  const { role } = useUserRole();

  const [DataCategoria, setDataCategoria] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [lastCount, setLastCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);

  const toggleLogin = () => setshowLoginForm(!showLoginForm);
  const nuevoUsuario = () => router.push("/nuevousuario");
  const administracionSettings = () => router.push("/producto");
  const UsuarioSettings = () => router.push("/perfil");

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-gray-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-blue-50 via-white to-sky-50"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
        {/* LOGO + CATEGORÍAS */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowCategorias(!showCategorias)}
            className="border-2 border-transparent bg-gradient-to-r from-indigo-500 to-sky-400 text-white hover:scale-105 transition-transform shadow-sm"
          >
            <Menu className="size-4 mr-1" />
            Categorías
          </Button>

          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="https://img.lovepik.com/png/20231006/Creative-three-dimensional-book-store-reading-characters-reading-book-stereoscopic_100280_wh860.png"
              className="h-10 w-10 rounded-lg transition-transform group-hover:scale-105"
              alt="Logo SPD"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Librería SPD
            </span>
          </Link>
        </div>

        {/* BUSCADOR */}
        <div className="hidden md:flex flex-1 items-center mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar libros, autores, categorías..."
              className="pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-sky-400 focus:border-sky-400 shadow-sm"
            />
          </div>
        </div>

        {/* ICONOS DERECHA */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={toggleLogin} className="hover:bg-sky-50">
            <User className="size-5 text-sky-600" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {nombreUsuario ? `Hola, ${nombreUsuario}` : "Cuenta"}
            </span>
          </Button>

          {role === "Administrador" && (
            <Button variant="ghost" onClick={administracionSettings}>
              <Settings className="size-5 text-blue-500" />
              <span className="ml-1 text-sm font-medium text-gray-700">Admin</span>
            </Button>
          )}

          {role !== "Administrador" && role !== "guest" && (
            <Button variant="ghost" onClick={UsuarioSettings}>
              <Settings className="size-5 text-blue-500" />
              <span className="ml-1 text-sm font-medium text-gray-700">Mi Perfil</span>
            </Button>
          )}

          {role === "guest" && (
            <Button variant="ghost" onClick={nuevoUsuario}>
              <UserPlus2Icon className="size-5 text-blue-500" />
              <span className="ml-1 text-sm font-medium text-gray-700">Registrar</span>
            </Button>
          )}
<Button
  variant="ghost"
  size="icon"
  className="hover:bg-rose-50"
  onClick={() => {
    if (role === "guest" || !nombreUsuario) {
      // Usuario no logueado
      import("sonner").then(({ toast }) => {
        toast.error("Inicia sesión para acceder a tu perfil ❤️", {
          description: "Debes iniciar sesión antes de ver tu perfil.",
          position: "top-right",
        });
      });
    } else {
      // Redirige correctamente al perfil
      router.push("/perfil");
    }
  }}
>
  <Heart className="size-5 text-rose-500" />
</Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCart((v) => !v)}
              className="hover:bg-green-50"
            >
              <ShoppingCart className="size-5 text-emerald-600" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 bg-green-500 text-white rounded-full text-[10px] px-1.5">
                  {cartCount}
                </span>
              )}
            </Button>
            {showCart && (
              <div className="absolute right-0 top-10 z-40">
                <CartPopover onClose={() => setShowCart(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showLoginForm && <LoginForm />}
      <CategoriaDrawer
        isOpen={showCategorias}
        onClose={() => setShowCategorias(false)}
        categorias={DataCategoria}
      />
    </header>
  );
}

/* ==========================================================
   🎠 HERO + PRODUCTOS + FOOTER + OPINIONES
========================================================== */
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const durationMs = 6000;
  const current = slides[index];

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), durationMs);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <>
      <NavBar />

      {/* 🎠 CARRUSEL PRINCIPAL */}
      <section className="relative w-full mt-20">
        <div className="relative h-[65vh] overflow-hidden rounded-2xl mx-auto max-w-7xl shadow-xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.id}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${current.imageUrl})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg">
                  {current.title}
                </h2>
                <p className="text-lg md:text-2xl mb-6 opacity-95">{current.subtitle}</p>
                <div className="flex gap-3">
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white shadow-md text-lg">
                    <Link href={current.ctaHref}>{current.ctaLabel}</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-white text-white hover:bg-white/20"
                  >
                    <Link href="/categorias">Ver categorías</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 🛒 PRODUCTOS POPULARES */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-14 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              🛒 Productos Disponibles
            </span>
          </h2>
          <ProductosPopulares />
        </div>
      </section>

      {/* 💼 BENEFICIOS + PROVEEDORES */}
      <BeneficiosFooter />
      <ProveedoresCarousel />

      {/* ⭐ OPINIONES DE CLIENTES */}
      <section className="bg-gradient-to-r from-sky-50 via-white to-blue-50 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          ⭐ Opiniones de Nuestros Clientes
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          {[
            {
              nombre: "María López",
              texto: "Excelente atención y los libros llegaron rapidísimo. 💙",
              estrellas: 5,
            },
            {
              nombre: "Carlos Pérez",
              texto: "Muy buena calidad en los productos y empaques impecables.",
              estrellas: 4,
            },
            {
              nombre: "Lucía Gómez",
              texto: "Fácil de usar la web y tienen gran variedad de títulos.",
              estrellas: 5,
            },
          ].map((op, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl p-6 text-center border hover:shadow-xl transition"
            >
              <p className="text-yellow-400 text-lg mb-3">
                {"★".repeat(op.estrellas)}{"☆".repeat(5 - op.estrellas)}
              </p>
              <p className="text-gray-600 italic mb-3">“{op.texto}”</p>
              <p className="font-semibold text-sky-600">{op.nombre}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ==========================================================
   💼 FOOTER BENEFICIOS + PROVEEDORES
========================================================== */
function BeneficiosFooter() {
  const beneficios = [
    {
      icon: <Truck className="w-8 h-8 text-sky-500" />,
      titulo: "Envíos a Todo el País",
      texto: "Rápidos, seguros y con seguimiento en línea.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      titulo: "Pagos Seguros",
      texto: "Compra con total confianza usando tus métodos favoritos.",
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-indigo-500" />,
      titulo: "Soporte 24/7",
      texto: "Siempre disponibles para ayudarte cuando lo necesites.",
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">
        {beneficios.map((b, i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-center">{b.icon}</div>
            <h3 className="text-lg font-semibold">{b.titulo}</h3>
            <p className="text-gray-300 text-sm">{b.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProveedoresCarousel() {
  const proveedores = [
    { id: 1, nombre: "Editorial Planeta", contacto: "María López", telefono: "5555-1001", correo: "contacto@planeta.com", logo: "https://cdn-icons-png.flaticon.com/512/4064/4064952.png" },
    { id: 2, nombre: "Penguin Random House", contacto: "Carlos Hernández", telefono: "5555-1002", correo: "ventas@penguinrh.com", logo: "https://cdn-icons-png.flaticon.com/512/2947/2947985.png" },
    { id: 3, nombre: "Santillana S.A.", contacto: "Lucía Gómez", telefono: "5555-1003", correo: "lgomez@santillana.com", logo: "https://cdn-icons-png.flaticon.com/512/4287/4287725.png" },
    { id: 4, nombre: "Norma Editorial", contacto: "Javier Ruiz", telefono: "5555-1004", correo: "jruiz@normaeditorial.com", logo: "https://cdn-icons-png.flaticon.com/512/3781/3781954.png" },
    { id: 5, nombre: "Panini Books", contacto: "Andrea Morales", telefono: "5555-1005", correo: "amorales@paninibooks.com", logo: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png" },
    { id: 6, nombre: "Office Depot", contacto: "David Castillo", telefono: "5555-1006", correo: "dcastillo@officedepot.com", logo: "https://cdn-icons-png.flaticon.com/512/2329/2329087.png" },
    { id: 7, nombre: "HP Supplies", contacto: "Fernando García", telefono: "5555-1007", correo: "fgarcia@hpsupplies.com", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968342.png" },
    { id: 8, nombre: "Lumen Librerías", contacto: "Sofía Torres", telefono: "5555-1008", correo: "storres@lumen.com", logo: "https://cdn-icons-png.flaticon.com/512/2769/2769343.png" },
    { id: 9, nombre: "Amazon Books", contacto: "José Martínez", telefono: "5555-1009", correo: "jmartinez@amazonbooks.com", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968890.png" },
    { id: 10, nombre: "Digital Paper Co.", contacto: "Paula Rivera", telefono: "5555-1010", correo: "privera@digitalpaperco.com", logo: "https://cdn-icons-png.flaticon.com/512/3959/3959420.png" },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-sky-50 py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🤝 Nuestros Proveedores
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
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

export { NavBar, HeroCarousel };
