import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Building2, Shirt, Palette, Truck } from "lucide-react";

export const Route = createFileRoute("/uniformes")({
  head: () => ({
    meta: [
      { title: "Uniformes corporativos sob demanda — Sengaliz" },
      {
        name: "description",
        content:
          "Uniformes corporativos e casuais com o padrão de caimento Sengaliz. Confecção sob demanda, bordado personalizado, atendimento dedicado.",
      },
      { property: "og:title", content: "Uniformes corporativos — Sengaliz" },
      {
        property: "og:description",
        content:
          "Uniformes com identidade da sua empresa, feitos com qualidade de alfaiataria. Solicite orçamento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UniformesPage,
});

function UniformesPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="relative isolate flex min-h-[68vh] items-end overflow-hidden bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1920&q=80"
          alt="Equipe uniformizada"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/20" />
        <div className="container-page relative z-10 pb-16 pt-32">
          <p className="eyebrow text-[color:var(--gold)]">B2B — Empresas</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
            Uniformes com o caimento de uma alfaiataria.
          </h1>
          <p className="mt-6 max-w-xl text-sm text-white/80">
            Confecção própria sob demanda. Peças administrativas, recepção, loja, equipes de evento e
            uniformes com identidade da sua marca.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 md:grid-cols-4">
          {[
            { icon: Shirt, t: "Modelagem sob medida", d: "Grade personalizada e prova piloto antes da produção." },
            { icon: Palette, t: "Bordado & identidade", d: "Logo, cores institucionais e acabamentos exclusivos." },
            { icon: Building2, t: "Pedidos em quantidade", d: "De 10 a 500+ peças com atendimento dedicado." },
            { icon: Truck, t: "Reposição contínua", d: "Grades reservadas para novos colaboradores." },
          ].map((f) => (
            <div key={f.t}>
              <f.icon className="h-6 w-6 text-[color:var(--gold)]" />
              <h3 className="mt-4 font-serif text-xl">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black py-20 text-white">
        <div className="container-page grid gap-16 md:grid-cols-2">
          <div>
            <p className="eyebrow text-[color:var(--gold)]">Fluxo diferenciado</p>
            <h2 className="mt-3 font-serif text-4xl">Orçamento personalizado — sem carrinho.</h2>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Uniformes não passam pelo checkout de e-commerce. Um consultor comercial da Sengaliz responde
              em até um dia útil com proposta de tecidos, modelos e prazos.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Prova piloto sem custo antes da produção",
                "Prazo médio de 20 a 30 dias após aprovação",
                "Nota fiscal e faturamento empresarial",
                "Contrato de reposição anual disponível",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-[color:var(--gold)]" /> {i}
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="border border-white/15 bg-white/[0.02] p-8"
          >
            <h3 className="font-serif text-2xl text-[color:var(--gold)]">Solicitar orçamento</h3>
            {sent ? (
              <p className="mt-10 text-sm text-white/80">
                Recebemos sua solicitação. Nosso time comercial retornará em até 1 dia útil.
              </p>
            ) : (
              <div className="mt-6 space-y-5">
                <Field label="Nome da empresa" name="empresa" required />
                <Field label="Quantidade de peças" name="quantidade" required placeholder="Ex.: 40" />
                <Field label="Tipo de uniforme" name="tipo" required placeholder="Ex.: Camisa social + colete" />
                <Field label="Telefone / WhatsApp" name="telefone" required />
                <Field label="E-mail" name="email" type="email" required />
                <button className="mt-4 min-h-11 w-full border border-gold bg-gold-gradient px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-graphite transition-all hover:brightness-105">
                  Enviar solicitação
                </button>
                <p className="text-center text-[11px] text-white/50">
                  Ou fale direto no <a href="https://wa.me/5554933803839" className="underline hover:text-[color:var(--gold)]">WhatsApp comercial</a>.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/60">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[color:var(--gold)]"
      />
    </label>
  );
}
