import { useState, type FormEvent } from "react";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-context";

/** Entrada compartilhada de cupom entre a página do produto e a sacola. */
export function CouponField({ compact = false }: { compact?: boolean }) {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (applyCoupon(code)) {
      setCode("");
      setError("");
    } else {
      setError("Cupom não encontrado. Confira o código e tente novamente.");
    }
  };

  return (
    <div className={compact ? "space-y-2" : "border border-border bg-surface/60 p-4"}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
        <Tag className="h-4 w-4 text-gold" /> Cupom de desconto
      </p>
      {coupon ? (
        <div className="mt-2 flex items-center justify-between gap-3 rounded-sm border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-3 py-2">
          <span className="min-w-0 text-xs">
            <strong className="block">{coupon.code}</strong>
            <span className="text-muted-foreground">{coupon.discountPercent}% de desconto aplicado aos itens</span>
          </span>
          <button
            type="button"
            onClick={() => { removeCoupon(); setError(""); }}
            className="flex h-9 w-9 flex-none items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Remover cupom"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-2 flex flex-wrap gap-2">
          <input
            aria-label="Código do cupom"
            aria-invalid={Boolean(error)}
            type="text"
            autoComplete="off"
            maxLength={40}
            placeholder="Digite seu cupom"
            value={code}
            onChange={(event) => { setCode(event.target.value); setError(""); }}
            className="min-h-11 min-w-0 flex-1 border border-border bg-background px-3 text-xs uppercase outline-none focus:border-gold"
          />
          <Button type="submit" variant="outline" className="min-h-11 px-4">
            Aplicar
          </Button>
        </form>
      )}
      {error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
      {!compact && <p className="mt-2 text-[11px] text-muted-foreground">Válido para os itens do catálogo. Valores e condições confirmados no atendimento.</p>}
    </div>
  );
}
