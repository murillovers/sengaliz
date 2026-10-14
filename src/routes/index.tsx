import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, MapPin, Truck, ShieldCheck, Calendar } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Butterfly } from "@/components/butterfly";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sengaliz — Moda de festa e alfaiataria unissex | Caxias do Sul" },
      {
        name: "description",
        content:
          "Estúdio de costura em Caxias do Sul: alfaiataria própria, looks de festa, styling personalizado e uniformes corporativos sob demanda.",
      },
      { property: "og:title", content: "Sengaliz — Moda de festa e alfaiataria unissex | Caxias do Sul" },
      {
        property: "og:description",
        content:
          "Estúdio de costura em Caxias do Sul: alfaiataria própria, looks de festa, styling personalizado e uniformes corporativos sob demanda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const catalogProducts = products;

  return (
    <div>
      {/* HERO — fotografia editorial Sengaliz; desktop à direita, mobile preserva o vestido */}
      <section className="relative isolate overflow-hidden bg-black text-white">
        <div className="relative min-h-[740px] md:min-h-[690px] lg:min-h-[780px]">
          <div className="absolute inset-x-0 top-0 h-[74%] md:inset-y-0 md:left-[40%] md:right-0 md:h-full">
            <img
              src="/images/hero-vestido-azul.avif"
              alt="Vestido de festa azul-marinho com saia volumosa e detalhes brilhantes, em uma celebração especial"
              className="h-full w-full object-contain object-top md:object-center"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black md:via-black/95 md:to-black/10" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(217,183,109,0.10),transparent_40%)]" />

          <div className="container-page relative z-10 flex min-h-[740px] items-end pb-14 pt-32 md:min-h-[690px] md:items-center md:pb-20 lg:min-h-[780px]">
            <div className="max-w-[38rem]">
              <p className="eyebrow text-[color:var(--gold)]">Sengaliz · Moda Festa</p>
              <div className="mt-5 h-px w-14 bg-[color:var(--gold)]/75" aria-hidden="true" />
              <h1 className="mt-6 max-w-xl font-serif text-[clamp(2.75rem,8vw,4.25rem)] leading-[1.12] md:text-[clamp(3.2rem,5vw,5.2rem)]">
                Cada momento merece um vestido à altura.
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                Elegância, personalidade e detalhes que transformam ocasiões especiais em memórias inesquecíveis.
              </p>
              <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/festa"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-gold bg-gold-gradient px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-graphite shadow-card transition-all hover:brightness-105 sm:px-8"
                >
                  Ver coleção <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/styling"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/60 px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] sm:px-8"
                >
                  Agende seu styling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="container-page py-20 md:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-[color:var(--gold)]">Catálogo Sengaliz</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Nossos produtos</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Alfaiataria, festa e peças profissionais desenvolvidas pelo estúdio.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {catalogProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* STYLING BLACK STRIP */}
      <section className="bg-black py-20 text-[color:var(--gold)]">
        <div className="container-page grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div>
            <p className="eyebrow">Serviço exclusivo</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Agende seu styling</h2>
          </div>
          <Butterfly className="hidden h-10 w-10 md:block" />
          <div className="text-sm leading-relaxed text-[color:var(--gold-soft)]">
            <p>
              Uma consultora dedicada, provador reservado e uma seleção de peças pensada para a sua ocasião.
              Presencial em Caxias do Sul ou por videochamada.
            </p>
            <Link
              to="/styling"
              className="mt-6 inline-flex items-center gap-3 border border-[color:var(--gold)] px-6 py-3 text-xs uppercase tracking-[0.28em] text-[color:var(--gold)] transition-colors hover:bg-[color:var(--gold)] hover:text-black"
            >
              Reservar horário <Calendar className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-background">
        <div className="container-page grid gap-8 py-14 md:grid-cols-4">
          {[
            { icon: Sparkles, t: "Atendimento consultivo", d: "Styling dedicado, presencial ou remoto." },
            { icon: MapPin, t: "Loja física em Caxias", d: "Provador reservado com curadoria." },
            { icon: Truck, t: "Envio para todo o Brasil", d: "Embalagem editorial e rastreio." },
            { icon: ShieldCheck, t: "Trocas facilitadas", d: "Até 30 dias, sem burocracia." },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-4">
              <f.icon className="h-6 w-6 flex-none text-[color:var(--gold)]" />
              <div>
                <h4 className="font-serif text-lg">{f.t}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-page py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Butterfly className="mx-auto h-8 w-8 text-[color:var(--gold)]" />
          <h2 className="mt-6 font-serif text-4xl md:text-5xl">Antes de todo mundo</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Receba lançamentos, convites para provadores privados e edições limitadas. Sem spam, sem excessos.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Obrigada! Em breve entraremos em contato.");
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              className="flex-1 border border-border bg-background px-5 py-4 text-sm outline-none focus:border-[color:var(--gold)]"
            />
            <button className="min-h-11 border border-primary bg-primary px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground">
              Assinar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
