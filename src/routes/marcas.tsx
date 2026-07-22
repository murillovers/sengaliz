import { createFileRoute } from "@tanstack/react-router";
import { brands } from "@/lib/products";
import { Butterfly } from "@/components/butterfly";

export const Route = createFileRoute("/marcas")({
  head: () => ({
    meta: [
      { title: "Marcas parceiras — Sengaliz" },
      {
        name: "description",
        content:
          "Conheça as marcas selecionadas pela curadoria Sengaliz — atelieres nacionais e importadas para festa e alfaiataria.",
      },
      { property: "og:title", content: "Marcas parceiras — Sengaliz" },
      {
        property: "og:description",
        content: "Curadoria de marcas para festa, alfaiataria e ocasiões especiais.",
      },
    ],
  }),
  component: MarcasPage,
});

function MarcasPage() {
  return (
    <div>
      <section className="bg-black py-24 text-white">
        <div className="container-page text-center">
          <Butterfly className="mx-auto h-8 w-8 text-[color:var(--gold)]" />
          <p className="eyebrow mt-6 text-[color:var(--gold)]">Curadoria</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl">Marcas parceiras</h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/70">
            Cada marca na Sengaliz é escolhida pela qualidade do tecido, pelo caimento e pela história.
            Do atelier próprio às maisons convidadas.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <div key={b} className="group border border-border p-10 transition-colors hover:border-[color:var(--gold)]">
              <p className="eyebrow text-[color:var(--gold)]">Marca {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-serif text-3xl">{b}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Uma seleção pensada para quem quer se destacar sem esforço. Tecidos nobres, corte contemporâneo
                e assinatura unissex.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
