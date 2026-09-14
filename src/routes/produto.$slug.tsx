import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShieldCheck, Truck, Ruler } from "lucide-react";
import { products, formatPrice, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/produto/$slug")({
  head: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    return {
      meta: p
        ? [
            { title: `${p.name} — ${p.brand} | Sengaliz` },
            { name: "description", content: `${p.name} por ${p.brand}. ${formatPrice(p.price)}. Curadoria Sengaliz.` },
            { property: "og:title", content: `${p.name} — Sengaliz` },
            { property: "og:description", content: `${p.brand} • ${p.occasion}` },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
            { property: "og:image", content: p.image },
            { name: "twitter:image", content: p.image },
          ]
        : [
            { title: "Produto — Sengaliz" },
            { name: "description", content: "Conheça a curadoria de moda e alfaiataria da Sengaliz." },
            { property: "og:title", content: "Produto — Sengaliz" },
            { property: "og:description", content: "Conheça a curadoria de moda e alfaiataria da Sengaliz." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
          ],
    };
  },
  loader: ({ params }): Product => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <h1 className="font-serif text-4xl">Peça indisponível</h1>
      <Link to="/festa" className="mt-6 inline-block text-xs uppercase tracking-[0.28em] text-[color:var(--gold)]">
        Ver coleção →
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div>
      <section className="container-page grid gap-12 py-12 md:grid-cols-2 md:py-16">
        <div className="grid grid-cols-2 gap-3">
          <img src={product.image} alt={product.name} className="col-span-2 aspect-[3/4] w-full object-cover" />
          <img src={product.hover} alt="" className="aspect-square w-full object-cover" />
          <img src={product.image} alt="" className="aspect-square w-full object-cover" />
        </div>

        <div className="md:sticky md:top-28 md:h-fit">
          <p className="eyebrow text-[color:var(--gold)]">{product.brand}</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ideal para: {product.occasion}</p>
          <p className="mt-6 font-serif text-3xl text-[color:var(--gold)]">{formatPrice(product.price)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Em até 6x sem juros no cartão</p>

          <div className="mt-8">
            <p className="eyebrow">Tamanho</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["PP", "P", "M", "G", "GG"].map((s) => (
                <Button key={s} variant="outline" size="icon" aria-label={`Selecionar tamanho ${s}`}>
                  {s}
                </Button>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground">
              <Ruler className="h-3.5 w-3.5" /> Guia de tamanhos
            </button>
          </div>

          <div className="mt-8 flex gap-3">
            <Button className="flex-1" size="lg">
              Adicionar à sacola
            </Button>
            <Button aria-label="Favoritar" variant="outline" size="icon" className="h-12 w-12">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6 border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/5 p-4 text-xs">
            <p className="font-medium text-[color:var(--gold)]">Quer provar antes?</p>
            <p className="mt-1 text-muted-foreground">
              <Link to="/styling" className="underline underline-offset-4">Agende styling</Link> na loja de Caxias do Sul com provador reservado.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-3"><Truck className="h-4 w-4 text-[color:var(--gold)]" /> Envio para todo o Brasil em até 5 dias úteis.</p>
            <p className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[color:var(--gold)]" /> Trocas em até 30 dias.</p>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              Peça de curadoria Sengaliz, selecionada pelo caimento e pelo acabamento. Tecido nobre, forro
              interno e detalhes de alfaiataria. Composição e cuidados enviados junto à etiqueta.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <h2 className="mb-10 font-serif text-3xl">Finalize o look com</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
