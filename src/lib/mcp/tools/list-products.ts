import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { formatPrice, products } from "../../products";

export default defineTool({
  name: "list_products",
  title: "Listar produtos",
  description: "Lista as peças públicas do catálogo Sengaliz, com filtros opcionais por categoria e linha.",
  inputSchema: {
    category: z.enum(["alfaiataria", "festa", "feminino", "masculino"]).optional().describe("Categoria do catálogo."),
    line: z.enum(["Executiva", "Alfaiataria Feminina", "Térmica", "Operacional"]).optional().describe("Linha de produto Sengaliz."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, line }) => {
    const matches = products
      .filter((product) => !category || product.category === category)
      .filter((product) => !line || product.line === line)
      .map((product) => ({
        slug: product.slug,
        name: product.name,
        price: product.price,
        formattedPrice: formatPrice(product.price),
        category: product.category,
        line: product.line ?? "Criação Sengaliz",
        occasion: product.occasion,
        image: product.image,
      }));

    return {
      content: [{ type: "text", text: matches.length ? JSON.stringify(matches, null, 2) : "Nenhum produto encontrado para esses filtros." }],
      structuredContent: { products: matches, total: matches.length },
    };
  },
});