import { Link } from "@tanstack/react-router";
import { formatPrice, getProductColors, type Product } from "@/lib/products";
import { getCouponPrice } from "@/lib/coupons";
import { useCart } from "@/components/cart-context";
import { getPixPrice, PIX_DISCOUNT_PERCENT } from "@/lib/pricing";

export function ProductCard({ product }: { product: Product }) {
  const { coupon } = useCart();
  const colors = getProductColors(product);
  const priceAfterCoupon = getCouponPrice(product.price, coupon);
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block border border-border bg-card text-card-foreground transition-all duration-300 hover:border-gold hover:shadow-card"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {product.imagePosition ? (
          <div
            role="img"
            aria-label={product.name}
            className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-[1.02]"
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: "600% 300%",
              backgroundPosition: product.imagePosition,
            }}
          />
        ) : (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
              loading="lazy"
            />
            <img
              src={product.hover}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              loading="lazy"
            />
          </>
        )}
        <span className="absolute left-4 top-4 border border-white/70 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur">
          {product.line ?? product.occasion}
        </span>
      </div>
      <div className="flex min-h-36 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold leading-tight">{product.name}</h3>
        <div className="flex items-center gap-1.5" aria-label={`Opções de cor: ${colors.map((color) => color.name).join(", ")}`}>
          {colors.slice(0, 5).map((color) => (
            <span
              key={color.name}
              title={color.name}
              aria-hidden="true"
              className="h-4 w-4 rounded-full border border-black/20 ring-1 ring-border"
              style={{ backgroundColor: color.hex }}
            />
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">{colors.length} cores · consulte disponibilidade</span>
        </div>
        {product.priceOnRequest ? (
          <p className="mt-auto text-sm font-semibold text-foreground">Sob consulta</p>
        ) : (
          <div className="mt-auto">
            <p className="text-xs text-muted-foreground">
              De <span className="line-through">{formatPrice(product.price)}</span>
            </p>
            <p className="mt-0.5 text-base font-semibold text-[color:var(--gold)]">
              Por {formatPrice(getPixPrice(priceAfterCoupon))} <span className="text-xs font-medium">no Pix</span>
            </p>
            {coupon && <p className="mt-1 text-[10px] font-medium text-[color:var(--gold-deep)]">Cupom {coupon.code}: -{coupon.discountPercent}%</p>}
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{PIX_DISCOUNT_PERCENT}% no Pix</p>
          </div>
        )}
      </div>
    </Link>
  );
}
