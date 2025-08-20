
import { MenuPrincipal } from "@/components/MenuPrincipal";
import { ProductosPopulares } from "@/components/ProductosPopulares";
import HeroCarousel from "@/components/Carrousel";

export default function Home() {
  return (
    <>
    {/* <MenuPrincipal/> */}
    <HeroCarousel />
    <ProductosPopulares/>
   </>
  );
}
