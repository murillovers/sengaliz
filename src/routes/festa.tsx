import { createCategoryRoute } from "@/components/category-page";

export const Route = createCategoryRoute("/festa", {
  title: "Festa & Eventos",
  eyebrow: "Coleção",
  description:
    "Vestidos e looks para casamentos, formaturas, galas e réveillon — brilho na medida certa, sempre com caimento.",
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
  filter: "festa",
});
