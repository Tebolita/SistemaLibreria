"use client";

import { ProductosPopulares } from "@/components/ProductosPopulares";
import { NavBar, HeroCarousel } from "@/components/CarrouselYNavBar";

export default function Home() {
  return (
    <>
    <NavBar />
    <HeroCarousel />
    <ProductosPopulares/>
   </>
  );
}
