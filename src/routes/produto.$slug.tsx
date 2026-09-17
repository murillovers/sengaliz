import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShieldCheck, Truck } from "lucide-react";
import { products, formatPrice, type Product } from "@/lib/products";
import { getInstallmentPrice, getPixPrice, PIX_DISCOUNT_PERCENT } from "@/lib/pricing";
import { ProductCard } from "@/components/product-card";
import { SizeGuideModal } from "@/components/size-guide-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/components/cart-context";

export const Route = createFileRoute("/produto/$slug")({
  head: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    return {
      meta: p
        ? [
            { title: `${p.name} | Sengaliz` },
            {
              name: "description",
              content:
                p.description ??
                (p.priceOnRequest
                  ? `${p.name}. Consulte disponibilidade com a Sengaliz.`
                  : `${p.name} por ${formatPrice(p.price)}. Criação Sengaliz.`),
            },
            { property: "og:title", content: `${p.name} — Sengaliz` },
            { property: "og:description", content: p.description ?? `Criação Sengaliz • ${p.occasion}` },
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

function ProductVisual({ product, className, primary = false }: { product: Product; className: string; primary?: boolean }) {
  if (product.imagePosition) {
    return (
      <div
        role={primary ? "img" : undefined}
        aria-label={primary ? product.name : undefined}
        aria-hidden={primary ? undefined : true}
        className={`${className} bg-muted bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: "600% 300%",
          backgroundPosition: product.imagePosition,
        }}
      />
    );
  }

  return <img src={primary ? product.image : product.hover} alt={primary ? product.name : ""} className={`${className} object-cover`} />;
}

function ProductPage() {
  const product: Product | undefined = Route.useLoaderData();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCart();
  if (!product) return null;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div>
      <section className="container-page grid gap-12 py-12 md:grid-cols-2 md:py-16">
        <div className="grid grid-cols-2 gap-3">
          <ProductVisual product={product} primary className="col-span-2 aspect-[3/4] w-full" />
          <ProductVisual product={product} className="aspect-square w-full" />
          <ProductVisual product={product} primary className="aspect-square w-full" />
        </div>

        <div className="md:sticky md:top-28 md:h-fit">
          <p className="eyebrow text-[color:var(--gold)]">{product.line ?? "Criação Sengaliz"}</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ideal para: {product.occasion}</p>

          {product.priceOnRequest ? (
            <p className="mt-6 font-serif text-3xl text-[color:var(--gold)]">Sob consulta</p>
          ) : (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                De <span className="line-through">{formatPrice(product.price)}</span>
              </p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm text-muted-foreground">Por</span>
                <span className="font-serif text-3xl text-[color:var(--gold)]">{formatPrice(getPixPrice(product.price))}</span>
                <span className="text-sm font-medium">no Pix</span>
              </p>
              <p className="mt-1 text-xs font-medium text-[color:var(--gold)]">{PIX_DISCOUNT_PERCENT}% de desconto no pagamento via Pix</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Ou em até 6x de {formatPrice(getInstallmentPrice(product.price))} sem juros no cartão
              </p>
            </div>
          )}

          {product.priceOnRequest ? (
            <div className="mt-8">
              <Link
                to="/contato"
                className="inline-flex min-h-12 w-full items-center justify-center border border-gold bg-gold-gradient px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-graphite transition-all hover:brightness-105"
              >
                Consultar disponibilidade
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <p className="eyebrow">Tamanho</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["PP", "P", "M", "G", "GG"].map((s) => (
                    <Button
                      key={s}
                      variant={selectedSize === s ? "gold" : "outline"}
                      size="icon"
                      aria-pressed={selectedSize === s}
                      onClick={() => {
                        setSelectedSize(s);
                        setSizeError(false);
                      }}
                      aria-label={`Selecionar tamanho ${s}`}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-3 text-xs font-medium text-destructive" role="alert">
                    Selecione um tamanho para adicionar à sacola.
                  </p>
                )}
                <SizeGuideModal
                  product={product}
                  onSelectSize={(size) => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                />
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() => {
                    if (!selectedSize) {
                      setSizeError(true);
                      return;
                    }
                    addItem(product, selectedSize);
                  }}
                >
                  Adicionar à sacola
                </Button>
                <Button aria-label="Favoritar" variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}

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
            <p>{product.description ?? "Peça de criação Sengaliz, desenvolvida com atenção ao caimento, à construção e aos acabamentos de alfaiataria. Composição e cuidados acompanham a etiqueta."}</p>
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
