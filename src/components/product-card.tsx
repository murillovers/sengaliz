import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block border border-border bg-card transition-all duration-300 hover:border-gold hover:shadow-card"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
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
        <span className="absolute left-4 top-4 border border-white/70 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur">
          {product.occasion}
        </span>
      </div>
      <div className="flex min-h-32 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold leading-tight">{product.name}</h3>
        <p className="mt-auto text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
