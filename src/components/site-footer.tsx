import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/sengaliz-logo.png.asset.json";
import { Butterfly } from "./butterfly";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-black text-white/70">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src={logo.url} alt="Sengaliz" className="h-14 w-auto" />
            <p className="mt-6 text-sm leading-relaxed">
              Curadoria de moda unissex para festa, alfaiataria e uniformes corporativos.
              Caxias do Sul — RS.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-[color:var(--gold)]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[color:var(--gold)]">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-[color:var(--gold)]">Coleção</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/alfaiataria" className="hover:text-white">Alfaiataria</Link></li>
              <li><Link to="/festa" className="hover:text-white">Festa & Eventos</Link></li>
              <li><Link to="/feminino" className="hover:text-white">Feminino</Link></li>
              <li><Link to="/masculino" className="hover:text-white">Masculino</Link></li>
              <li><Link to="/marcas" className="hover:text-white">Marcas parceiras</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[color:var(--gold)]">Sengaliz</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/sobre" className="hover:text-white">Sobre nós</Link></li>
              <li><Link to="/styling" className="hover:text-white">Styling & Atendimento</Link></li>
              <li><Link to="/uniformes" className="hover:text-white">Uniformes corporativos</Link></li>
              <li><Link to="/contato" className="hover:text-white">Loja física & contato</Link></li>
              <li><Link to="/politicas" className="hover:text-white">Trocas & FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[color:var(--gold)]">Atendimento</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 flex-none text-[color:var(--gold)]" /> R. Sinimbu, 000 — Centro, Caxias do Sul/RS</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 flex-none text-[color:var(--gold)]" /> (54) 99999-0000</li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 flex-none text-[color:var(--gold)]" /> ola@sengaliz.com.br</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Butterfly className="h-6 w-6 text-[color:var(--gold)]/70" />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Sengaliz. Todos os direitos reservados.</p>
          <div className="flex items-center gap-3">
            <span>Pagamento seguro</span>
            <span className="rounded border border-white/20 px-2 py-1">Pix</span>
            <span className="rounded border border-white/20 px-2 py-1">Visa</span>
            <span className="rounded border border-white/20 px-2 py-1">Master</span>
            <span className="rounded border border-white/20 px-2 py-1">Amex</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
