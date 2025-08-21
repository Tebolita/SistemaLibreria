
import { MenuPrincipal } from "@/components/MenuPrincipal";
import { ProductosPopulares } from "@/components/ProductosPopulares";
import { NavBar, HeroCarousel } from "@/components/CarrouselYNavBar";

export default function Home() {
  return (
    <>
    {/* <MenuPrincipal/> */}
    <NavBar />
    <HeroCarousel />
    <ProductosPopulares/>
   </>
  );
}
