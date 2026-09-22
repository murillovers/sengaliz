"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RotateCcw, Sparkles, Trash2, X } from "lucide-react";
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

const STORAGE_KEY = "sengaliz-consultora-chat-v1";
const lizEmblem = "/branding/liz-sengaliz-button.png";

const suggestions = [
  "Tenho um casamento à noite",
  "Estou em dúvida entre dois ternos",
  "Quero montar um look executivo",
];

function messageText(message: UIMessage) {
  return message.parts
    .filter((part): part is Extract<UIMessage["parts"][number], { type: "text" }> => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim();
}

function isStoredMessage(value: unknown): value is UIMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { id?: unknown; role?: unknown; parts?: unknown };
  return (
    typeof candidate.id === "string" &&
    (candidate.role === "user" || candidate.role === "assistant") &&
    Array.isArray(candidate.parts)
  );
}

export function ConsultoraFab() {
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

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
  } = useChat({ transport });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const restored = parsed.filter(isStoredMessage).slice(-20);
          if (restored.length) setMessages(restored);
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, [setMessages]);

  useEffect(() => {
    if (!hydrated) return;
    if (messages.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const compact = messages
      .map((message) => {
        const text = messageText(message);
        if (!text) return null;
        return {
          id: message.id,
          role: message.role,
          parts: [{ type: "text", text }],
        } satisfies UIMessage;
      })
      .filter((message): message is UIMessage => Boolean(message))
      .slice(-20);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(compact));
  }, [hydrated, messages]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const ask = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || status === "submitted" || status === "streaming") return;
      clearError();
      await sendMessage({ text: clean });
    },
    [clearError, sendMessage, status],
  );

  const handlePrompt = async (message: PromptInputMessage) => {
    await ask(message.text);
  };

  const clearConversation = () => {
    setMessages([]);
    clearError();
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-label="Liz — consultora online da Sengaliz"
          className="fixed bottom-40 right-4 z-[60] flex h-[520px] max-h-[calc(100vh-11rem)] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden border border-[color:var(--gold)]/35 bg-background shadow-modal sm:right-6"
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-graphite px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={lizEmblem}
                alt=""
                aria-hidden="true"
                className="h-9 w-9 flex-none rounded-full object-cover"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-serif text-lg leading-none">Liz</p>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.12)]" aria-hidden="true" />
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/50">Consultora online</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-[color:var(--gold)]"
                  onClick={clearConversation}
                  aria-label="Limpar conversa"
                  title="Limpar conversa"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white hover:bg-white/10 hover:text-[color:var(--gold)]"
                onClick={() => setOpen(false)}
                aria-label="Fechar consultora"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </header>

          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-4 p-4">
              {messages.length === 0 ? (
                <ConversationEmptyState>
                  <div className="w-full text-left">
                    <div className="flex items-center gap-2 text-[color:var(--gold)]">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em]">Posso te ajudar</span>
                    </div>
                    <h2 className="mt-3 font-serif text-2xl">Oi, eu sou a Liz.</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Sou a consultora online da Sengaliz. Me conte a ocasião, o estilo ou a peça que você procura e eu te ajudo a escolher pelo catálogo.
                    </p>
                    <div className="mt-5 space-y-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => void ask(suggestion)}
                          disabled={status === "submitted" || status === "streaming"}
                          className="w-full border border-border bg-card px-3 py-2.5 text-left text-xs leading-relaxed transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] disabled:opacity-50"
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
                    <Message key={message.id} from={message.role} className="max-w-full">
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
                    <Shimmer>Deixa eu ver algumas opções…</Shimmer>
                  </MessageContent>
                </Message>
              )}

              {error && (
                <div className="border border-destructive/30 bg-destructive/5 p-3">
                  <p className="text-xs font-medium">Não consegui concluir agora.</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {error.message || "Tente novamente em alguns instantes."}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      clearError();
                      void regenerate();
                    }}
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Tentar novamente
                  </Button>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border bg-background p-3">
            <PromptInput onSubmit={handlePrompt}>
              <PromptInputBody>
                <PromptInputTextarea
                  placeholder="Pergunte sobre uma peça ou ocasião…"
                  className="max-h-28 min-h-14 text-sm"
                  disabled={status === "submitted" || status === "streaming"}
                />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools>
                  <span className="px-1 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    Atendimento virtual Sengaliz
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
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fechar conversa com a Liz" : "Conversar com a Liz"}
        aria-expanded={open}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gold-gradient text-graphite shadow-modal transition-transform hover:scale-105"
      >
        <img
          src={lizEmblem}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </button>
    </>
  );
}
