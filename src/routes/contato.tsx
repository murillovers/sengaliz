import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato & Loja física — Sengaliz Caxias do Sul" },
      {
        name: "description",
        content:
          "Loja física em Caxias do Sul, WhatsApp, horário de atendimento e canais oficiais da Sengaliz.",
      },
      { property: "og:title", content: "Contato — Sengaliz" },
      { property: "og:description", content: "Visite a loja em Caxias do Sul ou fale com uma consultora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <div>
      <section className="container-page py-24">
        <p className="eyebrow text-[color:var(--gold)]">Fale com a gente</p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">Loja física & contato</h1>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="space-y-6 text-sm">
            <Item icon={MapPin} t="Endereço" d="R. Reinaldo Gazola, 348 - Sl Aérea C - Sanvitto, Caxias do Sul - RS, 95099-250" />
            <Item icon={Phone} t="Telefone / WhatsApp" d="(54) 93380-3839" />
            <Item icon={Mail} t="E-mail" d="sengaliz1702@gmail.com" />
            <Item
              icon={Clock}
              t="Horário"
              d={<>Seg — Sex: 10h às 19h<br />Sábado: 10h às 17h<br />Domingo: fechado</>}
            />
            <a
              href="https://wa.me/5554933803839"
              className="mt-6 inline-flex min-h-11 items-center gap-3 border border-primary bg-primary px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Falar no WhatsApp
            </a>
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <iframe
              title="Localização Sengaliz"
              src="https://maps.google.com/maps?q=R.+Reinaldo+Gazola,+348,+Caxias+do+Sul,+RS&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Item({ icon: Icon, t, d }: { icon: typeof MapPin; t: string; d: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-5 w-5 flex-none text-[color:var(--gold)]" />
      <div>
        <p className="eyebrow text-muted-foreground">{t}</p>
        <p className="mt-1 font-serif text-xl leading-snug">{d}</p>
      </div>
    </div>
  );
}
