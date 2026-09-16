import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProductTool from "./tools/get-product";
import listProductsTool from "./tools/list-products";

export default defineMcp({
  name: "sengaliz-style-uniforms",
  title: "Sengaliz: Style & Uniforms",
  version: "0.1.0",
  instructions: "Consulte o catálogo público da Sengaliz. Use list_products para descobrir peças e get_product para ver os detalhes de uma peça específica.",
  auth: auth.oauth.issuer({
    issuer: "https://nrnaevgwfzmlqdwxtrcm.supabase.co/auth/v1",
    acceptedAudiences: "authenticated",
    jwksUri: "https://nrnaevgwfzmlqdwxtrcm.supabase.co/auth/v1/.well-known/jwks.json",
  }),
  tools: [listProductsTool, getProductTool],
});