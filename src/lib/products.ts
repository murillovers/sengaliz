export type ProductPhoto = {
  src: string;
  alt: string;
  /** Posição de uma fotografia dentro de um sprite (sem duplicar ou inventar imagens). */
  spritePosition?: string;
  spriteSize?: string;
};

export type ProductColor = {
  name: string;
  hex: string;
  photos: ProductPhoto[];
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  priceOnRequest?: boolean;
  category: "alfaiataria" | "festa" | "feminino" | "masculino";
  occasion: string;
  line?: "Executiva" | "Alfaiataria Feminina" | "Térmica" | "Operacional";
  description?: string;
  image: string;
  hover: string;
  imagePosition?: string;
  colors?: ProductColor[];
};

const rawCatalog = "https://raw.githubusercontent.com/murillovers/sengaliz/main/public/catalog";

// Fotografias reais de cada variação. Preto é a cor padrão da calça.
const calcaColors: ProductColor[] = [
  {
    name: "Preto",
    hex: "#25242A",
    photos: [
      { src: "/catalog/calca-preta-frente.webp", alt: "Calça de alfaiataria preta — vista frontal" },
      { src: "/catalog/calca-preta-lateral.webp", alt: "Calça de alfaiataria preta — vista lateral" },
      { src: "/catalog/calca-preta-costas.webp", alt: "Calça de alfaiataria preta — vista traseira" },
    ],
  },
  {
    name: "Azul-marinho",
    hex: "#192D53",
    photos: [
      { src: "/catalog/calca-azul-marinho-frente.webp", alt: "Calça de alfaiataria azul-marinho — vista frontal" },
      { src: "/catalog/calca-azul-marinho-lateral.webp", alt: "Calça de alfaiataria azul-marinho — vista lateral" },
      { src: "/catalog/calca-azul-marinho-costas.webp", alt: "Calça de alfaiataria azul-marinho — vista traseira" },
    ],
  },
  {
    name: "Bege",
    hex: "#BEAA89",
    photos: [
      { src: "/catalog/Gemini_Generated_Image_c96r6cc96r6cc96r.jfif", alt: "Calça de alfaiataria bege" },
    ],
  },
];

export const products: Product[] = [
  { slug: "camisa-feminina-crepe", name: "Camisa Feminina Crepe Marfim", brand: "Sengaliz", price: 980, category: "feminino", occasion: "Ambientes executivos e ocasiões sociais", line: "Alfaiataria Feminina", description: "Camisa em crepe encorpado com toque macio, corte fluido e pala traseira que favorece o caimento. Gola alongada, punhos largos e fechamento com botões forrados criam um acabamento refinado para alfaiataria feminina.", image: "/catalog/Gemini_Generated_Image_nudgwanudgwanudg.jfif", hover: "/catalog/Gemini_Generated_Image_nudgwanudgwanudg.jfif" },
  { slug: "calca-alfaiataria-cintura-alta", name: "Calça Alfaiataria Cintura Alta", brand: "Sengaliz", price: 1490, category: "feminino", occasion: "Trabalho, eventos e composições formais", line: "Alfaiataria Feminina", description: "Calça em lã fria com elastano, cintura alta anatômica e perna reta de vinco marcado. Cós interno estruturado, bolsos embutidos e barra invisível entregam acabamento sob medida para conjuntos e produções formais.", image: "/catalog/calca-preta-frente.webp", hover: "/catalog/calca-preta-lateral.webp", colors: calcaColors },
  { slug: "conjunto-alfaiataria-nude", name: "Conjunto Alfaiataria Nude", brand: "Sengaliz", price: 2450, category: "feminino", occasion: "Corporativo", line: "Alfaiataria Feminina", image: "/catalog/Gemini_Generated_Image_lb6a42lb6a42lb6a.jfif", hover: "/catalog/Gemini_Generated_Image_lb6a42lb6a42lb6a.jfif" },
  { slug: "vestido-dourado-lume", name: "Vestido Longo Lume", brand: "Sengaliz", price: 3450, category: "festa", occasion: "Formatura", image: "/catalog/Gemini_Generated_Image_1edrmf1edrmf1edr.jfif", hover: "/catalog/Gemini_Generated_Image_1edrmf1edrmf1edr.jfif" },
  { slug: "vestido-veludo-bordo", name: "Vestido Veludo Bordô", brand: "Sengaliz", price: 2790, category: "festa", occasion: "Réveillon", image: "/catalog/Gemini_Generated_Image_r78zjr78zjr78zjr.jfif", hover: "/catalog/Gemini_Generated_Image_r78zjr78zjr78zjr.jfif" },
  { slug: "vestido-metalico", name: "Vestido Metálico Astrée", brand: "Sengaliz", price: 3990, category: "festa", occasion: "Gala", image: "/catalog/Gemini_Generated_Image_qx9rl2qx9rl2qx9r.jfif", hover: "/catalog/Gemini_Generated_Image_qx9rl2qx9rl2qx9r.jfif" },
  { slug: "camisa-seda-perola", name: "Camisa Seda Pérola", brand: "Sengaliz", price: 890, category: "masculino", occasion: "Festa", image: `${rawCatalog}/Gemini_Generated_Image_qx9rl2qx9rl2qx9r%20(1).jfif`, hover: `${rawCatalog}/Gemini_Generated_Image_qx9rl2qx9rl2qx9r%20(1).jfif` },
  { slug: "colete-laco-seda-champagne", name: "Colete e Laço Seda Champagne", brand: "Sengaliz", price: 890, category: "masculino", occasion: "Gala e eventos formais", description: "Colete e laço em seda champagne, do mesmo corte de tecido para garantir tom idêntico entre as peças. Ajuste traseiro por fivela e laço pré-amarrado com fecho ajustável.", image: "/catalog/Gemini_Generated_Image_kmaan8kmaan8kmaa.jfif", hover: "/catalog/Gemini_Generated_Image_kmaan8kmaan8kmaa.jfif" },
  { slug: "polo-executiva-grafite", name: "Polo Executiva Grafite", brand: "Sengaliz", price: 590, category: "masculino", occasion: "Rotina executiva e reuniões informais", line: "Executiva", description: "Polo em piquê premium de algodão com elastano, corte reto estruturado e gola entretelada. Acabamento com vista reforçada, botões foscos e costuras internas limpas para o escritório e compromissos profissionais.", image: "/catalog/Gemini_Generated_Image_8i478f8i478f8i47.jfif", hover: "/catalog/Gemini_Generated_Image_8i478f8i478f8i47.jfif" },
  { slug: "polo-executiva-perola", name: "Polo Executiva Pérola", brand: "Sengaliz", price: 620, category: "feminino", occasion: "Escritório, viagens e atendimento ao cliente", line: "Executiva", description: "Polo em malha dupla de algodão penteado, modelagem levemente acinturada e manga com proporção alongada. Gola firme, bainha rebatida e acabamento interno em viés asseguram presença profissional com conforto prolongado.", image: `${rawCatalog}/Gemini_Generated_Image_8i478f8i478f8i47%20(1).jfif`, hover: `${rawCatalog}/Gemini_Generated_Image_8i478f8i478f8i47%20(1).jfif` },
  { slug: "camisa-executiva-tricoline", name: "Camisa Executiva Tricoline", brand: "Sengaliz", price: 890, category: "masculino", occasion: "Reuniões, cerimônias e eventos corporativos", line: "Executiva", description: "Camisa em tricoline 100% algodão de fio longo, corte slim sem restringir os movimentos e colarinho estruturado. Punhos ajustáveis, botões de madrepérola e costura francesa completam o acabamento de alfaiataria.", image: `${rawCatalog}/Gemini_Generated_Image_8i478f8i478f8i47%20(2).jfif`, hover: `${rawCatalog}/Gemini_Generated_Image_8i478f8i478f8i47%20(2).jfif` },
  { slug: "polo-operacional-marinho", name: "Polo Operacional Marinho", brand: "Sengaliz", price: 520, category: "masculino", occasion: "Equipes técnicas, atendimento e uso diário", line: "Operacional", description: "Polo em piquê tecnológico de alta resistência, corte confortável com mobilidade nos ombros e fendas laterais. Possui gola estabilizada, pespontos duplos e acabamento reforçado para jornadas intensas e uniformização de equipes.", image: "/catalog/Gemini_Generated_Image_q31j89q31j89q31j.jfif", hover: "/catalog/Gemini_Generated_Image_q31j89q31j89q31j.jfif" },
  { slug: "calca-operacional-sarja", name: "Calça Operacional Sarja Técnica", brand: "Sengaliz", price: 980, category: "alfaiataria", occasion: "Operações, atendimento e visitas técnicas", line: "Operacional", description: "Calça em sarja técnica de algodão com elastano, corte reto ergonômico e reforço nas áreas de maior atrito. Bolsos funcionais discretos, travetes de segurança e acabamento resistente unem apresentação profissional e mobilidade diária.", image: "/catalog/Gemini_Generated_Image_lnxdhqlnxdhqlnxd.jfif", hover: "/catalog/Gemini_Generated_Image_lnxdhqlnxdhqlnxd.jfif" },
  { slug: "camiseta-operacional-algodao-pv", name: "Camiseta Operacional Algodão PV", brand: "Sengaliz", price: 189, category: "masculino", occasion: "Linha operacional e equipes", line: "Operacional", description: "Malha PV que equilibra conforto térmico com boa resposta a lavagens industriais frequentes. Gola careca reforçada com fita dupla e bainha inferior dupla, com espaço reservado no peito para logotipo.", image: `${rawCatalog}/Gemini_Generated_Image_lnxdhqlnxdhqlnxd%20(1).jfif`, hover: `${rawCatalog}/Gemini_Generated_Image_lnxdhqlnxdhqlnxd%20(1).jfif` },
];


/** Paleta visual de cores para consulta; somente a fotografia original confirma a tonalidade cadastrada. */
export const PRODUCT_COLOR_SWATCHES: Record<string, string> = {
  "Preto": "#28272B",
  "Azul-marinho": "#192D53",
  "Bege": "#BEAA89",
  "Off-white": "#F2EEE5",
  "Marfim": "#F0E6D3",
  "Nude": "#D9BBAA",
  "Grafite": "#56575C",
  "Bordô": "#72283A",
  "Dourado": "#C7A45B",
  "Champagne": "#D8C7A3",
  "Pérola": "#EAE6E0",
  "Terracota": "#BD523D",
  "Branco": "#FFFFFF",
  "Prata": "#B9BCC2",
  "Azul-petróleo": "#27545C",
};

const originalColors: Record<string, string> = {
  "camisa-feminina-crepe": "Marfim",
  "conjunto-alfaiataria-nude": "Nude",
  "vestido-dourado-lume": "Dourado",
  "vestido-veludo-bordo": "Bordô",
  "vestido-metalico": "Prata",
  "camisa-seda-perola": "Pérola",
  "colete-laco-seda-champagne": "Champagne",
  "polo-executiva-grafite": "Grafite",
  "polo-executiva-perola": "Pérola",
  "camisa-executiva-tricoline": "Branco",
  "polo-operacional-marinho": "Azul-marinho",
  "calca-operacional-sarja": "Grafite",
  "camiseta-operacional-algodao-pv": "Branco",
};

/** Todos os itens possuem cores selecionáveis; opções sem foto são sob consulta. */
export function getProductColors(product: Product): ProductColor[] {
  if (product.colors?.length) return product.colors;

  const original = originalColors[product.slug] ?? "Preto";
  const proposals = product.category === "festa"
    ? ["Preto", "Azul-marinho", "Bordô", "Champagne"]
    : product.line === "Operacional"
      ? ["Preto", "Azul-marinho", "Grafite", "Branco"]
      : ["Preto", "Azul-marinho", "Bege", "Off-white", "Grafite"];
  const options = [original, ...proposals].filter((name, index, all) => all.indexOf(name) === index);

  return options.map((name, index) => ({
    name,
    hex: PRODUCT_COLOR_SWATCHES[name] ?? "#888888",
    photos: index === 0
      ? [
          {
            src: product.image,
            alt: `${product.name} — fotografia original (${name})`,
            spritePosition: product.imagePosition,
            spriteSize: product.imagePosition ? "600% 300%" : undefined,
          },
          ...(product.hover !== product.image
            ? [{ src: product.hover, alt: `${product.name} — ângulo alternativo (${name})` }]
            : []),
        ]
      : [],
  }));
}

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
