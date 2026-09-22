import { createFileRoute } from "@tanstack/react-router";
import type { UIMessage } from "ai";
import { buildConsultoraSystemPrompt, CONSULTORA_MODEL } from "@/lib/consultora-prompt";

type RateEntry = { count: number; resetAt: number };
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 15;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2500;
const rateLimit = new Map<string, RateEntry>();

function clientKey(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous"
  );
}

function allowRequest(key: string) {
  const now = Date.now();
  const current = rateLimit.get(key);

  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
}

function sanitizeMessages(input: unknown): UIMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .slice(-MAX_MESSAGES)
    .map((message, index) => {
      if (!message || typeof message !== "object") return null;
      const candidate = message as { id?: unknown; role?: unknown; parts?: unknown };
      if (candidate.role !== "user" && candidate.role !== "assistant") return null;

      const text = Array.isArray(candidate.parts)
        ? candidate.parts
            .filter(
              (part): part is { type: "text"; text: string } =>
                Boolean(
                  part &&
                    typeof part === "object" &&
                    (part as { type?: unknown }).type === "text" &&
                    typeof (part as { text?: unknown }).text === "string",
                ),
            )
            .map((part) => part.text)
            .join("")
            .trim()
            .slice(0, MAX_MESSAGE_CHARS)
        : "";

      if (!text) return null;

      return {
        id:
          typeof candidate.id === "string" && candidate.id
            ? candidate.id
            : "msg-" + index + "-" + Date.now(),
        role: candidate.role,
        parts: [{ type: "text", text }],
      } as UIMessage;
    })
    .filter((message): message is UIMessage => Boolean(message));
}

function publicAiError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  if (message.includes("402") || message.includes("credit") || message.includes("payment")) {
    return "A consultora está temporariamente indisponível por limite de créditos. Tente novamente mais tarde.";
  }

  if (message.includes("429") || message.includes("rate") || message.includes("limit")) {
    return "Recebemos muitas perguntas em pouco tempo. Aguarde alguns instantes e tente novamente.";
  }

  return "Não consegui concluir a resposta agora. Sua pergunta foi mantida para você tentar novamente.";
}

export const Route = createFileRoute("/api/consultora")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];

        if (!apiKey) {
          return new Response("A IA da Sengaliz ainda não está habilitada neste ambiente.", {
            status: 503,
            headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
          });
        }

        if (!allowRequest(clientKey(request))) {
          return new Response("Muitas perguntas em sequência. Aguarde alguns minutos e tente novamente.", {
            status: 429,
            headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
          });
        }

        const contentLength = Number(request.headers.get("content-length") ?? "0");
        if (contentLength > 100_000) {
          return new Response("A conversa enviada é grande demais.", { status: 413 });
        }

        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return new Response("Requisição inválida.", { status: 400 });
        }

        const messages = sanitizeMessages(body.messages);
        if (!messages.length || messages.at(-1)?.role !== "user") {
          return new Response("Envie uma pergunta para a Consultora Sengaliz.", { status: 400 });
        }

        try {
          const [{ createOpenAI }, { convertToModelMessages, streamText }] = await Promise.all([
            import("@ai-sdk/openai"),
            import("ai"),
          ]);

          const lovable = createOpenAI({
            apiKey,
            baseURL: "https://ai.gateway.lovable.dev/v1",
            headers: { "Lovable-API-Key": apiKey },
          });

          const result = streamText({
            model: lovable.responses(CONSULTORA_MODEL),
            system: buildConsultoraSystemPrompt(),
            messages: await convertToModelMessages(messages),
            maxOutputTokens: 900,
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages,
            generateMessageId: () => crypto.randomUUID(),
            headers: { "cache-control": "no-store" },
            onError: publicAiError,
          });
        } catch (error) {
          console.error("[Consultora Sengaliz]", error);
          return new Response(publicAiError(error), {
            status: 502,
            headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
          });
        }
      },
    },
  },
});
