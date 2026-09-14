import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import logo from "@/assets/sengaliz-marketplace-logo.webp.asset.json";
import emblem from "@/assets/sengaliz-emblema.jpg.asset.json";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/alfaiataria", label: "Alfaiataria" },
  { to: "/festa", label: "Festa & Eventos" },
  { to: "/feminino", label: "Feminino" },
  { to: "/masculino", label: "Masculino" },
  { to: "/marcas", label: "Marcas" },
  { to: "/uniformes", label: "Uniformes" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-graphite text-gold">
        <div className="container-page flex h-8 items-center justify-center text-center text-[10px] font-medium uppercase tracking-[0.2em]">
          Peças sob medida · Atendimento VIP · Envio para todo o Brasil
        </div>
      </div>
      <div className="container-page grid h-20 grid-cols-[44px_1fr_auto] items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <button
          type="button"
          onClick={() => setSearchOpen((value) => !value)}
          className="hidden min-h-11 max-w-xs items-center gap-3 border-b border-border text-left text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-gold hover:text-foreground lg:flex"
          aria-expanded={searchOpen}
        >
          <Search className="h-4 w-4" /> Produtos, alfaiates ou ateliês
        </button>

        <Link to="/" className="flex justify-center">
          <img src={logo.url} alt="Sengaliz — Estúdio de costura" className="h-12 w-auto max-w-[220px] object-contain md:h-14 md:max-w-[300px]" />
        </Link>

        <div className="flex items-center justify-end gap-1 text-foreground">
          <Button variant="ghost" size="icon" aria-label="Buscar" className="lg:hidden" onClick={() => setSearchOpen((value) => !value)}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Favoritos" className="hidden sm:inline-flex">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Sacola" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-graphite">
              0
            </span>
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-surface">
          <form className="container-page flex py-3" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="market-search">Buscar no marketplace</label>
            <input id="market-search" autoFocus placeholder="Busque produtos, alfaiates ou ateliês" className="h-11 flex-1 border border-border bg-background px-4 text-sm outline-none focus:border-gold" />
            <Button type="submit" aria-label="Executar busca"><Search className="h-4 w-4" /> Buscar</Button>
          </form>
        </div>
      )}

      <nav className="hidden border-t border-border lg:block">
        <div className="container-page flex h-12 items-center justify-center gap-8">
          {nav.map((item) => <Link key={item.to} to={item.to} className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>{item.label}</Link>)}
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-graphite lg:hidden">
          <div className="container-page flex h-20 items-center justify-between">
            <img src={emblem.url} alt="Emblema Sengaliz" className="h-12 w-12 object-contain" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="text-primary-foreground hover:text-gold"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="container-page mt-10 flex flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-primary-foreground hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/70">
              <Link to="/styling" onClick={() => setOpen(false)} className="uppercase tracking-[0.24em]">
                Styling & Atendimento
              </Link>
              <Link to="/sobre" onClick={() => setOpen(false)} className="uppercase tracking-[0.24em]">
                Sobre
              </Link>
              <Link to="/contato" onClick={() => setOpen(false)} className="uppercase tracking-[0.24em]">
                Contato
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
