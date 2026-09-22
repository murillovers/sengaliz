import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { LogOut, Sparkles, Trash2 } from "lucide-react";
import emblem from "@/assets/sengaliz-emblema-transparente.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/consultora")({
  head: () => ({
    meta: [
      { title: "Consultora Sengaliz — Assistente de produtos" },
      {
        name: "description",
        content:
          "Converse com a Consultora Sengaliz para comparar peças, encontrar opções para a sua ocasião e tirar dúvidas sobre o catálogo.",
      },
      { property: "og:title", content: "Consultora Sengaliz — Assistente de produtos" },
      {
        property: "og:description",
        content: "Uma consultora virtual conectada ao catálogo atual da Sengaliz.",
      },
    ],
  }),
  component: ConsultoraPage,
});

const suggestions = [
  "Qual terno você recomenda para um casamento à noite?",
  "Compare o Smoking Noir com o Terno Obsidiana.",
  "Monte uma sugestão feminina para um evento corporativo.",
  "Quais peças funcionam melhor em tons claros?",
];

function messageText(message: UIMessage) {
  return message.parts
    .filter((part): part is Extract<UIMessage["parts"][number], { type: "text" }> => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim();
}

function storedParts(parts: UIMessage["parts"]): Json {
  return JSON.parse(JSON.stringify(parts)) as Json;
}

function rowToMessage(row: {
  id: string;
  role: string;
  content: string;
  parts: Json;
}): UIMessage | null {
  if (row.role !== "user" && row.role !== "assistant") return null;

  const parts =
    Array.isArray(row.parts) && row.parts.length
      ? (row.parts as unknown as UIMessage["parts"])
      : ([{ type: "text", text: row.content }] as UIMessage["parts"]);

  return { id: row.id, role: row.role, parts };
}

function ConsultoraPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/consultora" }), []);

  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
    stop,
    setMessages,
    clearError,
  } = useChat({
    transport,
    onFinish: async ({ message }) => {
      const text = messageText(message);
      if (!text) return;

      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) return;

      const { error: saveError } = await supabase.from("product_chat_messages").insert({
        user_id: user.id,
        role: "assistant",
        content: text.slice(0, 12000),
        parts: storedParts(message.parts),
      });

      if (saveError) console.error("[Consultora] Falha ao salvar resposta", saveError);
    },
  });

  const loadHistory = useCallback(
    async (userId: string) => {
      setHistoryLoading(true);
      const { data, error: historyError } = await supabase
        .from("product_chat_messages")
        .select("id, role, content, parts")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (historyError) {
        console.error("[Consultora] Falha ao carregar histórico", historyError);
        setHistoryLoading(false);
        return;
      }

      const restored = (data ?? [])
        .map(rowToMessage)
        .filter((message): message is UIMessage => Boolean(message));

      if (restored.length) setMessages(restored);
      setHistoryLoading(false);
    },
    [setMessages],
  );

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setAuthReady(true);
      if (data.session?.user) void loadHistory(data.session.user.id);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      setAuthReady(true);
      if (nextSession?.user) void loadHistory(nextSession.user.id);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [loadHistory]);

  const persistUserMessage = useCallback(async (text: string) => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;

    const parts = [{ type: "text", text }] as UIMessage["parts"];
    const { error: saveError } = await supabase.from("product_chat_messages").insert({
      user_id: user.id,
      role: "user",
      content: text.slice(0, 12000),
      parts: storedParts(parts),
    });

    if (saveError) console.error("[Consultora] Falha ao salvar pergunta", saveError);
  }, []);

  const ask = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || status === "submitted" || status === "streaming") return;
      clearError();
      await persistUserMessage(clean);
      await sendMessage({ text: clean });
    },
    [clearError, persistUserMessage, sendMessage, status],
  );

  const handlePrompt = async (message: PromptInputMessage) => {
    await ask(message.text);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setAuthBusy(true);
    setLoginMessage("");
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: { emailRedirectTo: window.location.origin + "/consultora" },
    });

    setAuthBusy(false);
    setLoginMessage(
      signInError
        ? "Não foi possível enviar o link agora. Tente novamente."
        : "Enviamos um link de acesso para o seu e-mail.",
    );
  };

  const clearConversation = async () => {
    if (!window.confirm("Apagar todo o histórico desta conversa?")) return;

    if (session?.user) {
      const { error: deleteError } = await supabase
        .from("product_chat_messages")
        .delete()
        .eq("user_id", session.user.id);

      if (deleteError) {
        console.error("[Consultora] Falha ao limpar histórico", deleteError);
        return;
      }
    }

    setMessages([]);
    clearError();
  };

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-black text-white">
        <div className="container-page grid gap-8 py-12 md:grid-cols-[auto_1fr_auto] md:items-center md:py-16">
          <img
            src={emblem.url}
            alt=""
            aria-hidden="true"
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
          <div>
            <p className="eyebrow text-[color:var(--gold)]">Atendimento inteligente</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Consultora Sengaliz</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
              Conte sua ocasião, compare peças e tire dúvidas usando o catálogo atual da Sengaliz.
              Quando uma informação não estiver disponível, a consultora indica o canal certo para confirmar.
            </p>
          </div>
          {messages.length > 0 && (
            <Button
              variant="outline"
              onClick={clearConversation}
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Trash2 className="h-4 w-4" /> Limpar conversa
            </Button>
          )}
        </div>
      </section>

      <section className="container-page py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-h-[640px] flex-col overflow-hidden border border-border bg-card shadow-card">
            <Conversation className="min-h-0 flex-1">
              <ConversationContent className="gap-5 p-4 sm:p-6">
                {historyLoading ? (
                  <div className="flex min-h-48 items-center justify-center">
                    <Shimmer>Carregando seu histórico…</Shimmer>
                  </div>
                ) : messages.length === 0 ? (
                  <ConversationEmptyState
                    icon={<Sparkles className="h-7 w-7 text-[color:var(--gold)]" />}
                    title="Como posso ajudar no seu look?"
                    description="Escolha uma sugestão abaixo ou escreva sua própria pergunta."
                  >
                    <div className="w-full max-w-2xl">
                      <Sparkles className="mx-auto h-8 w-8 text-[color:var(--gold)]" />
                      <h2 className="mt-4 font-serif text-2xl">Comece pela sua ocasião.</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Posso comparar peças, explicar diferenças do catálogo e sugerir opções para o que você procura.
                      </p>
                      <div className="mt-6 grid gap-2 sm:grid-cols-2">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => void ask(suggestion)}
                            disabled={status === "submitted" || status === "streaming"}
                            className="border border-border bg-background px-4 py-3 text-left text-sm leading-relaxed transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] disabled:opacity-50"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </ConversationEmptyState>
                ) : (
                  messages.map((message) => {
                    const text = messageText(message);
                    if (!text) return null;
                    return (
                      <Message key={message.id} from={message.role}>
                        <MessageContent>
                          {message.role === "assistant" ? (
                            <MessageResponse>{text}</MessageResponse>
                          ) : (
                            <p className="whitespace-pre-wrap">{text}</p>
                          )}
                        </MessageContent>
                      </Message>
                    );
                  })
                )}

                {status === "submitted" && (
                  <Message from="assistant">
                    <MessageContent>
                      <Shimmer>Consultando o catálogo…</Shimmer>
                    </MessageContent>
                  </Message>
                )}

                {error && (
                  <div className="border border-destructive/30 bg-destructive/5 p-4">
                    <p className="text-sm font-medium">Não consegui concluir a resposta.</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {error.message || "Sua pergunta continua na conversa e pode ser enviada novamente."}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        clearError();
                        void regenerate();
                      }}
                    >
                      Tentar novamente
                    </Button>
                  </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <div className="border-t border-border bg-background p-3 sm:p-4">
              <PromptInput onSubmit={handlePrompt}>
                <PromptInputBody>
                  <PromptInputTextarea
                    placeholder="Ex.: Preciso de um look para casamento à noite…"
                    disabled={status === "submitted" || status === "streaming"}
                  />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools>
                    <span className="px-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Baseada no catálogo Sengaliz
                    </span>
                  </PromptInputTools>
                  <PromptInputSubmit
                    status={status}
                    onStop={stop}
                    disabled={status === "submitted"}
                    aria-label="Enviar pergunta"
                  />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>

          <aside className="h-fit border border-border bg-surface p-5 lg:sticky lg:top-28">
            <p className="eyebrow text-[color:var(--gold)]">Seu histórico</p>
            {!authReady ? (
              <p className="mt-4 text-sm text-muted-foreground">Verificando acesso…</p>
            ) : session ? (
              <div className="mt-4">
                <p className="text-sm font-medium">Histórico sincronizado</p>
                <p className="mt-1 break-all text-xs text-muted-foreground">{session.user.email}</p>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Suas perguntas e respostas ficam disponíveis quando você voltar com esta conta.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 px-0"
                  onClick={() => void supabase.auth.signOut()}
                >
                  <LogOut className="h-4 w-4" /> Sair
                </Button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm font-medium">Entre para salvar a conversa</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Você pode usar a consultora sem conta. Informe seu e-mail para sincronizar o histórico entre dispositivos.
                </p>
                <form onSubmit={handleLogin} className="mt-4 space-y-3">
                  <label className="block">
                    <span className="sr-only">E-mail</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="seu@email.com"
                      className="h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-[color:var(--gold)]"
                    />
                  </label>
                  <Button type="submit" variant="gold" className="w-full" disabled={authBusy}>
                    {authBusy ? "Enviando…" : "Enviar link de acesso"}
                  </Button>
                </form>
                {loginMessage && <p className="mt-3 text-xs text-muted-foreground">{loginMessage}</p>}
              </div>
            )}

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs leading-relaxed text-muted-foreground">
                A consultora não confirma estoque, disponibilidade de tamanhos ou informações que não estejam publicadas no catálogo.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
