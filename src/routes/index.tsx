import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, MapPin, Truck, ShieldCheck, Calendar } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ButterflyDivider, Butterfly } from "@/components/butterfly";

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
  const highlights = products.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
          alt="Editorial Sengaliz — look de festa"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="container-page relative z-10 pb-20 pt-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-[color:var(--gold)]">Coleção Festas 2026</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
              A peça certa <br />
              para o seu momento.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
              Curadoria unissex de alfaiataria e looks de festa, com atendimento consultivo em Caxias do Sul
              e envio para todo o Brasil.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/festa"
                className="inline-flex min-h-11 items-center gap-3 border border-gold bg-gold-gradient px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-graphite shadow-card transition-all hover:brightness-105"
              >
                Ver coleção <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/styling"
                className="inline-flex items-center gap-3 border border-white/60 px-8 py-4 text-xs uppercase tracking-[0.28em] text-white transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                Agende seu styling
              </Link>
            </div>
          </div>
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

      {/* CATEGORIES */}
      <section className="container-page py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-[color:var(--gold)]">Curadoria</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Escolha por ocasião</h2>
          </div>
          <Link to="/festa" className="hidden text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-[color:var(--gold)] md:block">
            Ver tudo →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { to: "/alfaiataria", label: "Alfaiataria", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80" },
            { to: "/festa", label: "Festa & Eventos", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80" },
            { to: "/uniformes", label: "Uniformes", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80" },
          ].map((c) => (
            <Link to={c.to} key={c.to} className="group relative block aspect-[3/4] overflow-hidden bg-muted">
              <img src={c.img} alt={c.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="font-serif text-3xl">{c.label}</h3>
                <span className="mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                  Explorar <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ButterflyDivider />

      {/* HIGHLIGHTS */}
      <section className="container-page pb-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-[color:var(--gold)]">Lançamentos</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Novidades para a próxima temporada</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Selecionadas para casamentos, formaturas e réveillon. Peças em estoque limitado.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {highlights.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
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
