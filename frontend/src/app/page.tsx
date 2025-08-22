
import { MenuPrincipal } from "@/components/MenuPrincipal";
import { ProductosPopulares } from "@/components/ProductosPopulares";
import { NavBar, HeroCarousel } from "@/components/CarrouselYNavBar";
import { toast, Toaster } from "sonner"
export default function Home() {
  return (
    <>
    <Toaster position="bottom-left" />
    <NavBar />
    <HeroCarousel />
    <ProductosPopulares/>
   </>
  );
}
