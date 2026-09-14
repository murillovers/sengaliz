import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function CategoryPage({
  title,
  eyebrow,
  description,
  hero,
  items,
}: {
  title: string;
  eyebrow: string;
  description: string;
  hero: string;
  items: Product[];
}) {
  const [filters, setFilters] = useState({ atelier: "Todos", tecido: "Todos", corte: "Todos", regiao: "Todas" });
  const filteredItems = useMemo(
    () => items.filter((item) => filters.atelier === "Todos" || item.brand === filters.atelier),
    [filters.atelier, items],
  );

  return (
    <div>
      <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-black text-white">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="container-page relative z-10 pb-16 pt-32">
          <p className="eyebrow text-[color:var(--gold)]">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm text-white/80">{description}</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-10 border-y border-border bg-surface py-4">
          <div className="mb-3 flex items-center gap-2 px-4 text-[11px] font-medium uppercase tracking-[0.18em]"><SlidersHorizontal className="h-4 w-4 text-gold" /> Refine sua curadoria</div>
          <div className="grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4">
            <Filter label="Ateliê" value={filters.atelier} options={["Todos", ...new Set(items.map((item) => item.brand))]} onChange={(value) => setFilters({ ...filters, atelier: value })} />
            <Filter label="Tipo de tecido" value={filters.tecido} options={["Todos", "Lã fria", "Seda", "Veludo", "Linho"]} onChange={(value) => setFilters({ ...filters, tecido: value })} />
            <Filter label="Corte" value={filters.corte} options={["Todos", "Clássico", "Slim", "Contemporâneo"]} onChange={(value) => setFilters({ ...filters, corte: value })} />
            <Filter label="Região" value={filters.regiao} options={["Todas", "Serra Gaúcha", "Sul", "Nacional"]} onChange={(value) => setFilters({ ...filters, regiao: value })} />
          </div>
        </div>

        {filteredItems.length ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {filteredItems.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="py-24 text-center text-sm text-muted-foreground">
            Novas peças em breve. Cadastre-se na newsletter para o pré-lançamento.
          </p>
        )}
      </section>
    </div>
  );
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full appearance-none border border-border bg-background px-3 pr-9 text-[11px] font-medium uppercase tracking-[0.12em] outline-none focus:border-gold">
        {options.map((option) => <option key={option} value={option}>{label}: {option}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gold" />
    </label>
  );
}

export const createCategoryRoute = (
  path: "/alfaiataria" | "/festa" | "/feminino" | "/masculino",
  config: { title: string; eyebrow: string; description: string; hero: string; filter: Product["category"] }
) =>
  createFileRoute(path)({
    head: () => ({
      meta: [
        { title: `${config.title} — Sengaliz` },
        { name: "description", content: config.description },
        { property: "og:title", content: `${config.title} — Sengaliz` },
        { property: "og:description", content: config.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    }),
    component: () => (
      <CategoryPage
        title={config.title}
        eyebrow={config.eyebrow}
        description={config.description}
        hero={config.hero}
        items={products.filter((p) => p.category === config.filter)}
      />
    ),
  });
