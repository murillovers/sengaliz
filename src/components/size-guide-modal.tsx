import { useMemo, useState } from "react";
import { Ruler } from "lucide-react";
import type { Product } from "@/lib/products";
import {
  getSizeGuide,
  measurementLabels,
  recommendSize,
  type Measurements,
  type RecommendedSize,
} from "@/lib/size-guide";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SizeGuideModal({
  product,
  onSelectSize,
}: {
  product: Product;
  onSelectSize: (size: RecommendedSize) => void;
}) {
  const [open, setOpen] = useState(false);
  const [measurements, setMeasurements] = useState<Measurements>({});
  const [recommended, setRecommended] = useState<RecommendedSize>();
  const guide = useMemo(() => getSizeGuide(product), [product]);
  const canRecommend = guide.fields.every((field) => Number.isFinite(measurements[field]));

  const handleRecommend = () => {
    const size = recommendSize(guide, measurements);
    setRecommended(size);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground">
          <Ruler className="h-3.5 w-3.5" /> Guia de tamanhos
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-none border-[color:var(--gold)]/30 p-0">
        <div className="border-b border-border bg-black px-6 py-7 text-white sm:px-8">
          <DialogHeader>
            <p className="eyebrow text-[color:var(--gold)]">Guia de medidas</p>
            <DialogTitle className="font-serif text-3xl font-normal">Encontre seu tamanho</DialogTitle>
            <DialogDescription className="text-white/65">
              Meça o corpo com uma fita métrica, sem apertar, mantendo a fita paralela ao chão. As medidas abaixo são em centímetros.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-8 px-6 pb-7 sm:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">1. Informe suas medidas</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {guide.fields.map((field) => (
                <label key={field} className="block">
                  <span className="mb-2 block text-sm font-medium">{measurementLabels[field]}</span>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="40"
                      max="200"
                      step="0.5"
                      value={measurements[field] ?? ""}
                      onChange={(event) => {
                        const value = event.target.value ? Number(event.target.value) : undefined;
                        setMeasurements((current) => ({ ...current, [field]: value }));
                        setRecommended(undefined);
                      }}
                      className="h-11 w-full border border-border bg-background px-3 pr-10 text-sm outline-none transition-colors focus:border-[color:var(--gold)]"
                      aria-label={`${measurementLabels[field]} em centímetros`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">cm</span>
                  </div>
                </label>
              ))}
            </div>
            <Button className="mt-5 w-full sm:w-auto" variant="gold" onClick={handleRecommend} disabled={!canRecommend}>
              Recomendar tamanho
            </Button>
          </div>

          {recommended && (
            <div className="border border-[color:var(--gold)]/45 bg-[color:var(--gold)]/5 p-5" role="status">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tamanho recomendado</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <strong className="font-serif text-4xl text-[color:var(--gold)]">{recommended}</strong>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
                    Recomendação calculada pela proximidade das suas medidas com a faixa de referência desta peça.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    onSelectSize(recommended);
                    setOpen(false);
                  }}
                >
                  Usar tamanho {recommended}
                </Button>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">2. Tabela de referência</p>
                <h3 className="mt-2 font-serif text-2xl">{guide.label}</h3>
              </div>
              <span className="text-xs text-muted-foreground">medidas em cm</span>
            </div>
            <div className="mt-4 overflow-x-auto border border-border">
              <table className="w-full min-w-[460px] border-collapse text-left text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tamanho</th>
                    {guide.fields.map((field) => (
                      <th key={field} className="px-4 py-3 font-medium">{measurementLabels[field]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.rows.map((row) => (
                    <tr key={row.size} className={recommended === row.size ? "bg-[color:var(--gold)]/10" : "border-t border-border"}>
                      <td className="px-4 py-3 font-semibold">{row.size}</td>
                      {guide.fields.map((field) => {
                        const range = row.values[field];
                        return <td key={field} className="px-4 py-3 text-muted-foreground">{range ? `${range[0]}–${range[1]}` : "—"}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              A tabela é uma referência de modelagem. Se você ficar entre dois tamanhos ou preferir um caimento mais solto, escolha o maior.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
