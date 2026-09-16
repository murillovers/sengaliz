import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProductTool from "./tools/get-product";
import listProductsTool from "./tools/list-products";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "sengaliz-style-uniforms",
  title: "Sengaliz: Style & Uniforms",
  version: "0.1.0",
  instructions: "Consulte o catálogo público da Sengaliz. Use list_products para descobrir peças e get_product para ver os detalhes de uma peça específica.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProductsTool, getProductTool],
});