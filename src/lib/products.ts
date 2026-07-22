export type Product = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: "alfaiataria" | "festa" | "feminino" | "masculino";
  occasion: string;
  image: string;
  hover: string;
};

export const products: Product[] = [
  {
    slug: "smoking-noir",
    name: "Smoking Noir Slim",
    brand: "Atelier Sengaliz",
    price: 2890,
    category: "alfaiataria",
    occasion: "Casamento",
    image: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "vestido-dourado-lume",
    name: "Vestido Longo Lume",
    brand: "Galia Prima",
    price: 3450,
    category: "festa",
    occasion: "Formatura",
    image: "https://images.unsplash.com/photo-1596993100471-c3905dafa78e?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1495121605193-b116b5b09a92?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "blazer-champagne",
    name: "Blazer Champagne Fluido",
    brand: "Maison Vitrail",
    price: 1980,
    category: "feminino",
    occasion: "Corporativo",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "terno-obsidiana",
    name: "Terno Obsidiana",
    brand: "Atelier Sengaliz",
    price: 3290,
    category: "alfaiataria",
    occasion: "Casamento",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "vestido-veludo-bordo",
    name: "Vestido Veludo Bordô",
    brand: "Casa Elyra",
    price: 2790,
    category: "festa",
    occasion: "Réveillon",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "camisa-seda-perola",
    name: "Camisa Seda Pérola",
    brand: "Maison Vitrail",
    price: 890,
    category: "masculino",
    occasion: "Festa",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "conjunto-alfaiataria-nude",
    name: "Conjunto Alfaiataria Nude",
    brand: "Casa Elyra",
    price: 2450,
    category: "feminino",
    occasion: "Corporativo",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "vestido-metalico",
    name: "Vestido Metálico Astrée",
    brand: "Galia Prima",
    price: 3990,
    category: "festa",
    occasion: "Gala",
    image: "https://images.unsplash.com/photo-1518049362265-d5b2a6b00b37?auto=format&fit=crop&w=1200&q=80",
    hover: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  },
];

export const brands = [
  "Atelier Sengaliz",
  "Galia Prima",
  "Maison Vitrail",
  "Casa Elyra",
  "Studio Aureo",
  "Linhas do Sul",
];

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
