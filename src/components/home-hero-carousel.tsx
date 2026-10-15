import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ROTATION_INTERVAL_MS = 6000;

const banners = [
  {
    image: "/images/campanha-black-friday.webp",
    alt: "Capa Black Friday Sengaliz com vestido azul e condições promocionais",
    title: "Black Friday Sengaliz",
    to: "/festa",
  },
  {
    image: "/images/campanha-semana-consumidor.webp",
    alt: "Capa Semana do Consumidor Sengaliz com fotografias de moda festa",
    title: "Semana do Consumidor",
    to: "/festa",
  },
  {
    image: "/images/campanha-nova-colecao.webp",
    alt: "Capa da nova coleção Sengaliz com polo e chamada de compra",
    title: "Nova coleção",
    to: "/uniformes",
  },
] as const;

export function HomeHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const lastWheelAt = useRef(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % banners.length) + banners.length) % banners.length);
  }, []);

  const next = useCallback(() => setActiveIndex((index) => (index + 1) % banners.length), []);
  const previous = useCallback(
    () => setActiveIndex((index) => (index - 1 + banners.length) % banners.length),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    const syncVisibility = () => setIsVisible(!document.hidden);

    syncMotion();
    syncVisibility();
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);

    return () => {
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || reduceMotion) return;
    const timer = window.setInterval(next, ROTATION_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, isVisible, next, reduceMotion]);

  const navigateByDistance = (distance: number) => {
    if (Math.abs(distance) < 55) return false;
    if (distance > 0) previous();
    else next();
    return true;
  };

  return (
    <section
      aria-label="Capas e campanhas Sengaliz"
      aria-roledescription="carrossel"
      className="group relative isolate bg-[#111111] text-white"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
        suppressClick.current = navigateByDistance(distance);
        touchStartX.current = null;
      }}
      onMouseDown={(event) => {
        if (event.button === 0) mouseStartX.current = event.clientX;
      }}
      onMouseUp={(event) => {
        if (mouseStartX.current === null) return;
        suppressClick.current = navigateByDistance(event.clientX - mouseStartX.current);
        mouseStartX.current = null;
      }}
      onClickCapture={(event) => {
        if (suppressClick.current) {
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }
      }}
      onWheel={(event) => {
        const horizontal = event.shiftKey ? event.deltaY : event.deltaX;
        if (Math.abs(horizontal) < 20 || (!event.shiftKey && Math.abs(horizontal) <= Math.abs(event.deltaY))) return;
        const now = Date.now();
        if (now - lastWheelAt.current < 550) return;
        lastWheelAt.current = now;
        if (horizontal > 0) next();
        else previous();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }
      }}
    >
      <div className="relative aspect-[1440/585] min-h-[215px] w-full overflow-hidden sm:min-h-[270px] md:min-h-0">
        {banners.map((banner, index) => (
          <Link
            key={banner.image}
            to={banner.to}
            aria-label={`Abrir ${banner.title}`}
            aria-hidden={index !== activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            className={`absolute inset-0 block transition-opacity ease-in-out ${reduceMotion ? "duration-0" : "duration-700"} ${index === activeIndex ? "z-[1] opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className="h-full w-full select-none object-contain md:object-cover"
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </Link>
        ))}

        <button
          type="button"
          aria-label="Capa anterior"
          onClick={previous}
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-md backdrop-blur-sm transition hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--gold)] sm:left-5"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Próxima capa"
          onClick={next}
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-md backdrop-blur-sm transition hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--gold)] sm:right-5"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/60 px-3 py-2 backdrop-blur-sm sm:bottom-5">
        {banners.map((banner, index) => (
          <button
            key={banner.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Mostrar capa ${index + 1}: ${banner.title}`}
            aria-pressed={index === activeIndex}
            className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${index === activeIndex ? "w-7 bg-[color:var(--gold)]" : "w-2.5 bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="off">Capa {activeIndex + 1} de {banners.length}</span>
    </section>
  );
}
