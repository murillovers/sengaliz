import { createCategoryRoute } from "@/components/category-page";

export const Route = createCategoryRoute("/masculino", {
  title: "Masculino",
  eyebrow: "Curadoria",
  description:
    "Camisaria, alfaiataria e peças de festa para o homem que valoriza tecido, corte e proporção.",
  hero: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1920&q=80",
  filter: "masculino",
});
