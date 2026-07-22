import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Video, MapPin, Sparkles } from "lucide-react";
import { Butterfly } from "@/components/butterfly";

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
    ],
  }),
  component: StylingPage,
});

function StylingPage() {
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
              href="https://wa.me/5554999990000?text=Ol%C3%A1%2C%20quero%20agendar%20um%20styling"
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
