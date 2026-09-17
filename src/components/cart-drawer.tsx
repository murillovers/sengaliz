import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";
import { getPixPrice, PIX_DISCOUNT_PERCENT } from "@/lib/pricing";

const WHATSAPP_NUMBER = "5554933803839";

export function CartDrawer() {
  const { items, total, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [closeCart, isOpen]);

  if (!isOpen) return null;

  const checkout = () => {
    const lines = items.map((item) =>
      `• ${item.name} — Tam. ${item.size} — ${item.quantity}x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`,
    );
    const message = [
      "Olá, Sengaliz! Gostaria de finalizar este pedido:",
      "",
      ...lines,
      "",
      `Total no cartão: ${formatPrice(total)}`,
      `Total no Pix (${PIX_DISCOUNT_PERCENT}% de desconto): ${formatPrice(getPixPrice(total))}`,
      "",
      "Podem me orientar sobre pagamento e entrega?",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Sacola de compras">
      <button className="absolute inset-0 bg-graphite/60" onClick={closeCart} aria-label="Fechar sacola" />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-modal">
        <div className="flex min-h-20 items-center justify-between border-b border-border px-5 sm:px-7">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl">Sua sacola</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Fechar sacola">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="mt-5 font-serif text-2xl">Sua sacola está vazia</p>
            <p className="mt-2 text-sm text-muted-foreground">Escolha uma peça e o tamanho para começar.</p>
            <Button className="mt-6" variant="outline" onClick={closeCart}>Continuar comprando</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-7">
              {items.map((item) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <article key={`${item.slug}-${item.size}`} className="grid grid-cols-[80px_1fr] gap-4 border-b border-border py-5">
                    <img src={item.image} alt="" className="aspect-[3/4] w-20 object-cover" />
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">Tamanho {item.size}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-9 w-9 flex-none" onClick={() => removeItem(item.slug, item.size)} aria-label={`Remover ${item.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div className="flex h-10 items-center border border-border">
                          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)} disabled={item.quantity === 1} aria-label={`Diminuir quantidade de ${item.name}`}>
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-8 text-center text-sm" aria-label={`Quantidade ${item.quantity}`}>{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)} aria-label={`Aumentar quantidade de ${item.name}`}>
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">De <span className="line-through">{formatPrice(itemTotal)}</span></p>
                          <p className="mt-0.5 text-sm font-semibold text-[color:var(--gold)]">{formatPrice(getPixPrice(itemTotal))} no Pix</p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="border-t border-border bg-surface p-5 sm:p-7">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.16em]">Total</span>
                  <p className="mt-1 text-xs text-muted-foreground">De <span className="line-through">{formatPrice(total)}</span></p>
                </div>
                <div className="text-right">
                  <strong className="font-serif text-2xl text-[color:var(--gold)]">{formatPrice(getPixPrice(total))}</strong>
                  <p className="text-xs text-muted-foreground">no Pix • {PIX_DISCOUNT_PERCENT}% off</p>
                </div>
              </div>
              <Button size="lg" className="mt-5 w-full" onClick={checkout}>Finalizar pelo WhatsApp</Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Pagamento e entrega serão combinados no atendimento.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
