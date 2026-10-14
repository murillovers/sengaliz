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
      {/* HERO — composição editorial, fotografia própria e contraste responsivo */}
      <section className="relative isolate overflow-hidden bg-[#090809] text-white">
        <div className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(ellipse_at_83%_38%,rgba(200,157,87,0.19),transparent_45%),linear-gradient(115deg,#090809_18%,#191419_68%,#0a0a0c_100%)] md:min-h-[700px] lg:min-h-[780px]">
          <div className="absolute inset-x-0 top-0 h-[77%] overflow-hidden md:inset-y-0 md:left-[42%] md:right-0 md:h-full">
            <img
              src="/images/hero-vestido-azul.avif"
              alt="Vestido azul-marinho com aplicações brilhantes e saia volumosa em uma celebração"
              className="sengaliz-hero-portrait h-full w-full object-contain object-top md:object-center"
              fetchPriority="high"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(244,211,150,0.12),transparent_45%)] mix-blend-screen"
              aria-hidden="true"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090809] via-[#090809]/35 to-transparent md:bg-gradient-to-r md:from-[#090809] md:via-[#090809]/85 md:to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_72%,rgba(201,156,74,0.09),transparent_35%)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-5 top-6 border-t border-[color:var(--gold)]/20 md:inset-x-10" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-5 bottom-6 border-b border-[color:var(--gold)]/20 md:inset-x-10" aria-hidden="true" />

          <div className="container-page relative z-10 flex min-h-[760px] items-end pb-24 pt-28 md:min-h-[700px] md:items-center md:pb-20 lg:min-h-[780px]">
            <div className="max-w-[37rem]">
              <div className="flex items-center gap-4">
                <span className="h-px w-9 bg-[color:var(--gold)] sm:w-14" aria-hidden="true" />
                <p className="eyebrow text-[color:var(--gold)]">Sengaliz · Moda Festa</p>
              </div>
              <h1 className="mt-7 font-serif text-[clamp(2.75rem,9vw,4.6rem)] leading-[1.08] tracking-[-0.025em] md:text-[clamp(3.1rem,5.2vw,5.6rem)]">
                Cada momento merece
                <span className="block text-[color:var(--gold-soft)]">um vestido à altura.</span>
              </h1>
              <p className="mt-7 max-w-md border-l border-[color:var(--gold)]/65 pl-5 text-sm leading-relaxed text-white/85 sm:text-base">
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
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/60 bg-black/20 px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] sm:px-8"
                >
                  Agende seu styling
                </Link>
              </div>
              <p className="mt-9 text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold-soft)]/70">
                Alfaiataria · Festa · Exclusividade
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-12 right-12 z-10 hidden items-center gap-4 border-l border-[color:var(--gold)]/55 pl-5 lg:flex" aria-hidden="true">
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">Seu momento. Sua essência.</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-[color:var(--gold)]" />
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
