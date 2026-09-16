import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { OAuthAuthorizationDetails } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Autorizar integração | Sengaliz" },
      { name: "description", content: "Revise e autorize o acesso de uma integração às ferramentas da Sengaliz." },
      { property: "og:title", content: "Autorizar integração | Sengaliz" },
      { property: "og:description", content: "Revise e autorize o acesso de uma integração às ferramentas da Sengaliz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  errorComponent: () => <ConsentMessage title="Não foi possível abrir esta autorização" detail="Volte ao aplicativo que iniciou a conexão e tente novamente." />,
  component: OAuthConsentPage,
});

type Mode = "sign-in" | "sign-up";

function OAuthConsentPage() {
  const [authorizationId, setAuthorizationId] = useState("");
  const [details, setDetails] = useState<OAuthAuthorizationDetails | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Verificando a solicitação…");
  const [busy, setBusy] = useState(false);

  const loadAuthorization = useCallback(async (id: string) => {
    setMessage("Verificando a solicitação…");
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setNeedsLogin(true);
      setMessage("");
      return;
    }

    const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(id);
    if (error || !data) {
      setMessage("Esta solicitação expirou ou não é válida.");
      return;
    }
    if ("redirect_url" in data) {
      window.location.assign(data.redirect_url);
      return;
    }
    setNeedsLogin(false);
    setDetails(data);
    setMessage("");
  }, []);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("authorization_id")?.trim() ?? "";
    setAuthorizationId(id);
    if (!id) {
      setMessage("A solicitação de autorização está incompleta.");
      return;
    }
    void loadAuthorization(id);
  }, [loadAuthorization]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authorizationId || password.length < 8) {
      setMessage("Informe um e-mail válido e uma senha com pelo menos 8 caracteres.");
      return;
    }
    setBusy(true);
    setMessage("");
    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setMessage("Não foi possível entrar. Confira o e-mail e a senha.");
      else await loadAuthorization(authorizationId);
    } else {
      const returnUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: returnUrl },
      });
      if (error) setMessage("Não foi possível criar a conta. Verifique os dados e tente novamente.");
      else if (!data.session) setMessage("Confira seu e-mail para confirmar a conta e continuar a conexão.");
      else await loadAuthorization(authorizationId);
    }
    setBusy(false);
  }

  async function decide(approve: boolean) {
    if (!authorizationId) return;
    setBusy(true);
    setMessage(approve ? "Autorizando…" : "Cancelando…");
    const result = approve
      ? await supabase.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })
      : await supabase.auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true });
    if (result.error || !result.data?.redirect_url) {
      setMessage("Não foi possível concluir. Tente novamente.");
      setBusy(false);
      return;
    }
    window.location.assign(result.data.redirect_url);
  }

  if (needsLogin) {
    return (
      <ConsentLayout>
        <p className="eyebrow text-gold">Conexão segura</p>
        <h1 className="mt-3 font-serif text-3xl">{mode === "sign-in" ? "Entre para continuar" : "Crie sua conta"}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Sua conta confirma quem está autorizando o acesso ao catálogo.</p>
        <form className="mt-8 space-y-4" onSubmit={handleAuth}>
          <label className="block text-xs font-medium uppercase tracking-[0.14em]">E-mail
            <input className="mt-2 min-h-11 w-full border border-input bg-background px-3 text-sm normal-case tracking-normal" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="block text-xs font-medium uppercase tracking-[0.14em]">Senha
            <input className="mt-2 min-h-11 w-full border border-input bg-background px-3 text-sm normal-case tracking-normal" type="password" minLength={8} autoComplete={mode === "sign-in" ? "current-password" : "new-password"} required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {message && <p className="text-sm text-muted-foreground" role="status">{message}</p>}
          <Button className="w-full" type="submit" disabled={busy}>{mode === "sign-in" ? "Entrar e continuar" : "Criar conta"}</Button>
          <button className="min-h-11 w-full text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground" type="button" onClick={() => { setMode(mode === "sign-in" ? "sign-up" : "sign-in"); setMessage(""); }}>
            {mode === "sign-in" ? "Ainda não tenho conta" : "Já tenho uma conta"}
          </button>
        </form>
      </ConsentLayout>
    );
  }

  if (!details) return <ConsentMessage title="Conexão Sengaliz" detail={message} />;

  const scopes = details.scope.split(/\s+/).filter(Boolean);
  return (
    <ConsentLayout>
      <p className="eyebrow text-gold">Conexão segura</p>
      <h1 className="mt-3 font-serif text-3xl">Conectar {details.client.name} à Sengaliz?</h1>
      <p className="mt-3 text-sm text-muted-foreground">Esta integração poderá consultar as ferramentas habilitadas enquanto estiver conectada.</p>
      <div className="mt-7 border-y border-border py-5 text-sm">
        <p><span className="text-muted-foreground">Conta:</span> {details.user.email}</p>
        <p className="mt-2 break-all"><span className="text-muted-foreground">Retorno:</span> {details.redirect_uri}</p>
      </div>
      <div className="mt-6">
        <h2 className="font-sans text-sm font-semibold">Acesso solicitado</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>Consultar o catálogo público e os detalhes dos produtos Sengaliz</li>
          {scopes.includes("email") && <li>Ver o endereço de e-mail da sua conta</li>}
          {scopes.includes("profile") && <li>Ver as informações básicas do seu perfil</li>}
        </ul>
      </div>
      {message && <p className="mt-5 text-sm text-muted-foreground" role="status">{message}</p>}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button variant="outline" disabled={busy} onClick={() => void decide(false)}>Cancelar conexão</Button>
        <Button disabled={busy} onClick={() => void decide(true)}>Autorizar</Button>
      </div>
      <p className="mt-5 text-xs leading-5 text-muted-foreground">Esta autorização não ignora as permissões e regras de segurança da Sengaliz.</p>
    </ConsentLayout>
  );
}

function ConsentLayout({ children }: { children: ReactNode }) {
  return <main className="flex min-h-[70vh] items-center justify-center bg-background px-5 py-16"><section className="w-full max-w-xl border border-border bg-card p-7 shadow-modal sm:p-10">{children}</section></main>;
}

function ConsentMessage({ title, detail }: { title: string; detail: string }) {
  return <ConsentLayout><h1 className="font-serif text-3xl">{title}</h1><p className="mt-4 text-sm text-muted-foreground" role="status">{detail}</p></ConsentLayout>;
}