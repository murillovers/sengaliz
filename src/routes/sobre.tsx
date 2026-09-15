import { createFileRoute } from "@tanstack/react-router";
import { Butterfly } from "@/components/butterfly";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Sengaliz — Curadoria de moda em Caxias do Sul" },
      {
        name: "description",
        content:
          "A história da Sengaliz: estúdio de costura unissex para festa, alfaiataria e uniformes, com atendimento em Caxias do Sul.",
      },
      { property: "og:title", content: "Sobre a Sengaliz" },
      {
        property: "og:description",
        content: "Curadoria de moda unissex — festa, alfaiataria e uniformes — em Caxias do Sul.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div>
      <section className="container-page grid gap-16 py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-[color:var(--gold)]">Nossa história</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            Vestir momentos importantes.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            A Sengaliz nasceu em Caxias do Sul com uma ideia simples: unir num só lugar as melhores peças de
            festa e alfaiataria, sem gênero definido, com atendimento consultivo.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Somos um estúdio de costura e alfaiataria própria. Cada peça é criada pensando no caimento,
            no tecido e na história de quem vai vesti-la. Ao longo dos anos, expandimos para a confecção
            de uniformes corporativos, levando o mesmo padrão de alfaiataria ao dia a dia das empresas.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80"
          alt="Loja Sengaliz"
          className="aspect-[4/5] w-full object-cover"
        />
      </section>

      <section className="bg-black py-24 text-white">
        <div className="container-page grid gap-12 md:grid-cols-3">
          {[
            { t: "Criação própria", d: "Peças Sengaliz desenvolvidas com atenção ao caimento, à história e à qualidade do tecido." },
            { t: "Atendimento", d: "Consultoria de styling presencial ou por videochamada, sem custo adicional." },
            { t: "Confecção própria", d: "Uniformes corporativos e casuais feitos sob demanda, com identidade visual da empresa." },
          ].map((v) => (
            <div key={v.t}>
              <Butterfly className="h-6 w-6 text-[color:var(--gold)]" />
              <h3 className="mt-6 font-serif text-2xl">{v.t}</h3>
              <p className="mt-3 text-sm text-white/70">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
