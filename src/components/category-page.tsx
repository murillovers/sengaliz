import { createFileRoute } from "@tanstack/react-router";
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
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span className="rounded-full border border-border px-4 py-2">Todas</span>
          <span className="rounded-full border border-border px-4 py-2">Casamento</span>
          <span className="rounded-full border border-border px-4 py-2">Formatura</span>
          <span className="rounded-full border border-border px-4 py-2">Corporativo</span>
          <span className="rounded-full border border-border px-4 py-2">Réveillon</span>
        </div>

        {items.length ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {items.map((p) => (
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
