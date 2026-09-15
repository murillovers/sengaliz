import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { formatPrice, products } from "../../products";

export default defineTool({
  name: "get_product",
  title: "Consultar produto",
  description: "Consulta os detalhes públicos de uma peça Sengaliz pelo identificador do produto.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Identificador do produto, como polo-executiva-grafite."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const product = products.find((item) => item.slug === slug);
    if (!product) throw new ToolError(`Produto não encontrado: ${slug}`);

    const details = {
      slug: product.slug,
      name: product.name,
      price: product.price,
      formattedPrice: formatPrice(product.price),
      category: product.category,
      line: product.line ?? "Criação Sengaliz",
      occasion: product.occasion,
      description: product.description ?? "Consulte a Sengaliz para conhecer tecido, modelagem e opções sob medida.",
      image: product.image,
      productUrl: `/produto/${product.slug}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
      structuredContent: details,
    };
  },
});