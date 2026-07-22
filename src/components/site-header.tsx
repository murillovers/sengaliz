import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import logo from "@/assets/sengaliz-logo.png.asset.json";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        scrolled
          ? "border-border/60 bg-black/90 backdrop-blur"
          : "border-transparent bg-black"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <button
          className="text-white/80 hover:text-[color:var(--gold)] lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center">
          <img src={logo.url} alt="Sengaliz" className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.72rem] uppercase tracking-[0.28em] text-white/80 transition-colors hover:text-[color:var(--gold)]"
              activeProps={{ className: "text-[color:var(--gold)]" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-white/80">
          <button aria-label="Buscar" className="hover:text-[color:var(--gold)]">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Favoritos" className="hidden hover:text-[color:var(--gold)] sm:block">
            <Heart className="h-5 w-5" />
          </button>
          <button aria-label="Sacola" className="relative hover:text-[color:var(--gold)]">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--gold)] text-[10px] font-medium text-black">
              0
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black lg:hidden">
          <div className="container-page flex h-20 items-center justify-between">
            <img src={logo.url} alt="Sengaliz" className="h-10 w-auto" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="text-white/80 hover:text-[color:var(--gold)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container-page mt-10 flex flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-white hover:text-[color:var(--gold)]"
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
