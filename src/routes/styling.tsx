import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, Video, MapPin, Sparkles } from "lucide-react";
import { Butterfly } from "@/components/butterfly";
import { ProductCard } from "@/components/product-card";
import { products, type Product } from "@/lib/products";

export const Route = createFileRoute("/styling")({
  head: () => ({
    meta: [
      { title: "Styling & Atendimento — Sengaliz" },
      {
        name: "description",
        content:
          "Consultoria de estilo presencial em Caxias do Sul ou por videochamada. Provador reservado com curadoria feita para você.",
      },
      { property: "og:title", content: "Agende seu styling — Sengaliz" },
      {
        property: "og:description",
        content: "Prova de roupa com consultoria dedicada para o seu evento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StylingPage,
});

type Occasion = "Trabalho" | "Evento" | "Festa" | "Casual";
type ColorPreference = "Neutros" | "Claros" | "Escuros" | "Destaque";

const lookProfiles: Array<{
  slug: string;
  occasions: Occasion[];
  colors: ColorPreference[];
}> = [
  { slug: "camisa-feminina-crepe", occasions: ["Trabalho", "Evento"], colors: ["Claros", "Neutros"] },
  { slug: "calca-alfaiataria-cintura-alta", occasions: ["Trabalho", "Evento"], colors: ["Neutros", "Escuros"] },
  { slug: "conjunto-alfaiataria-nude", occasions: ["Trabalho", "Evento"], colors: ["Neutros", "Claros"] },
  { slug: "smoking-noir", occasions: ["Evento", "Festa"], colors: ["Escuros"] },
  { slug: "terno-obsidiana", occasions: ["Trabalho", "Evento", "Festa"], colors: ["Escuros", "Neutros"] },
  { slug: "vestido-dourado-lume", occasions: ["Evento", "Festa"], colors: ["Claros", "Destaque"] },
  { slug: "vestido-veludo-bordo", occasions: ["Festa", "Evento"], colors: ["Escuros", "Destaque"] },
  { slug: "vestido-metalico", occasions: ["Festa"], colors: ["Destaque"] },
  { slug: "camisa-seda-perola", occasions: ["Evento", "Festa"], colors: ["Claros", "Neutros"] },
  { slug: "blazer-veludo-petroleo", occasions: ["Evento", "Festa"], colors: ["Escuros", "Destaque"] },
  { slug: "colete-laco-seda-champagne", occasions: ["Evento", "Festa"], colors: ["Claros", "Destaque"] },
  { slug: "polo-executiva-grafite", occasions: ["Trabalho", "Casual"], colors: ["Escuros", "Neutros"] },
  { slug: "polo-executiva-perola", occasions: ["Trabalho", "Casual"], colors: ["Claros", "Neutros"] },
  { slug: "camisa-executiva-tricoline", occasions: ["Trabalho", "Evento"], colors: ["Claros", "Neutros"] },
  { slug: "polo-operacional-marinho", occasions: ["Trabalho", "Casual"], colors: ["Escuros"] },
];

function StylingPage() {
  const [occasion, setOccasion] = useState<Occasion>();
  const [color, setColor] = useState<ColorPreference>();

  const suggestions = useMemo<Product[]>(() => {
    const ranked = lookProfiles
      .map((profile) => ({
        profile,
        score: (occasion && profile.occasions.includes(occasion) ? 2 : 0) + (color && profile.colors.includes(color) ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score);

    const candidates = occasion || color ? ranked.filter((item) => item.score > 0) : ranked;
    return candidates
      .map(({ profile }) => products.find((product) => product.slug === profile.slug))
      .filter((product): product is Product => Boolean(product))
      .slice(0, 3);
  }, [color, occasion]);

  const stylingMessage = encodeURIComponent(
    `Olá, quero agendar um styling${occasion ? ` para ${occasion.toLowerCase()}` : ""}${color ? ` com preferência por tons ${color.toLowerCase()}` : ""}.`,
  );

  return (
    <div>
      <section className="bg-black py-24 text-[color:var(--gold)]">
        <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Butterfly className="h-8 w-8" />
            <p className="eyebrow mt-6">Serviço Sengaliz</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">Agende seu styling.</h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--gold-soft)]">
              Uma consultora dedicada, provador reservado, curadoria feita para a sua ocasião.
              Presencial em Caxias do Sul ou por videochamada para quem está longe.
            </p>
            <a
              href="https://wa.me/5554933803839?text=Ol%C3%A1%2C%20quero%20agendar%20um%20styling"
              className="mt-10 inline-flex items-center gap-3 bg-[color:var(--gold)] px-8 py-4 text-xs uppercase tracking-[0.28em] text-black transition-opacity hover:opacity-90"
            >
              <Calendar className="h-4 w-4" /> Reservar horário
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
            alt="Provador Sengaliz"
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
      </section>

      <section className="container-page py-24">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow text-[color:var(--gold)]">Como funciona</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Uma experiência à altura da sua ocasião.</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { n: "01", t: "Briefing", d: "Contamos com um breve questionário sobre o evento, dress code, preferências e medidas." },
            { n: "02", t: "Curadoria", d: "Selecionamos peças de alfaiataria e festa que conversam com o seu estilo e ocasião." },
            { n: "03", t: "Prova & ajustes", d: "Você recebe o provador reservado ou uma videochamada com looks prontos para experimentar." },
          ].map((s) => (
            <div key={s.n} className="border-t border-[color:var(--gold)]/40 pt-6">
              <p className="font-serif text-3xl text-[color:var(--gold)]">{s.n}</p>
              <h3 className="mt-4 font-serif text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-black py-20 text-white">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow text-[color:var(--gold)]">Monte seu look</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Comece por duas escolhas simples.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Selecione a ocasião e a paleta que mais combina com você. A curadoria cruza essas preferências com peças reais do catálogo.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="border border-white/15 p-6 sm:p-8">
              <p className="font-serif text-3xl text-[color:var(--gold)]">01</p>
              <h3 className="mt-2 font-serif text-2xl">Qual é a ocasião?</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["Trabalho", "Evento", "Festa", "Casual"] as Occasion[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={occasion === option}
                    onClick={() => setOccasion(occasion === option ? undefined : option)}
                    className={`border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${occasion === option ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black" : "border-white/20 text-white/75 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-white/15 p-6 sm:p-8">
              <p className="font-serif text-3xl text-[color:var(--gold)]">02</p>
              <h3 className="mt-2 font-serif text-2xl">Qual paleta você prefere?</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["Neutros", "Claros", "Escuros", "Destaque"] as ColorPreference[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={color === option}
                    onClick={() => setColor(color === option ? undefined : option)}
                    className={`border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${color === option ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black" : "border-white/20 text-white/75 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-serif text-3xl text-[color:var(--gold)]">03</p>
                <h3 className="mt-2 font-serif text-2xl">Sugestões para o seu look</h3>
              </div>
              {(occasion || color) && (
                <button
                  type="button"
                  onClick={() => {
                    setOccasion(undefined);
                    setColor(undefined);
                  }}
                  className="text-xs uppercase tracking-[0.2em] text-white/50 underline underline-offset-4 hover:text-[color:var(--gold)]"
                >
                  Limpar escolhas
                </button>
              )}
            </div>
            <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-3">
              {suggestions.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            <a
              href={`https://wa.me/5554933803839?text=${stylingMessage}`}
              className="mt-8 inline-flex items-center gap-3 border border-[color:var(--gold)] px-7 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--gold)] transition-colors hover:bg-[color:var(--gold)] hover:text-black"
            >
              <Sparkles className="h-4 w-4" /> Refinar com uma consultora
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[color:var(--muted)] py-16">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {[
            { icon: MapPin, t: "Presencial", d: "Loja Caxias do Sul, provador reservado e taça de espumante." },
            { icon: Video, t: "Videochamada", d: "Curadoria enviada e consultoria ao vivo para quem está longe." },
            { icon: Sparkles, t: "Look final", d: "Sugestões de acessórios, ajustes e alfaiataria para caimento perfeito." },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-4">
              <f.icon className="h-6 w-6 flex-none text-[color:var(--gold)]" />
              <div>
                <h4 className="font-serif text-xl">{f.t}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
