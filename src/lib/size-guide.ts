import type { Product } from "@/lib/products";

export type MeasurementKey = "busto" | "cintura" | "quadril";
export type RecommendedSize = "P" | "M" | "G" | "GG";
export type Measurements = Partial<Record<MeasurementKey, number>>;

type Range = readonly [number, number];

type SizeRow = {
  size: RecommendedSize;
  values: Partial<Record<MeasurementKey, Range>>;
};

export type SizeGuide = {
  label: string;
  fields: MeasurementKey[];
  rows: SizeRow[];
};

export const measurementLabels: Record<MeasurementKey, string> = {
  busto: "Busto",
  cintura: "Cintura",
  quadril: "Quadril",
};

const topRows: SizeRow[] = [
  { size: "P", values: { busto: [86, 92], cintura: [70, 76] } },
  { size: "M", values: { busto: [93, 99], cintura: [77, 83] } },
  { size: "G", values: { busto: [100, 106], cintura: [84, 90] } },
  { size: "GG", values: { busto: [107, 114], cintura: [91, 99] } },
];

const bottomRows: SizeRow[] = [
  { size: "P", values: { cintura: [70, 76], quadril: [92, 98] } },
  { size: "M", values: { cintura: [77, 83], quadril: [99, 105] } },
  { size: "G", values: { cintura: [84, 90], quadril: [106, 112] } },
  { size: "GG", values: { cintura: [91, 99], quadril: [113, 121] } },
];

const fullBodyRows: SizeRow[] = [
  { size: "P", values: { busto: [86, 92], cintura: [70, 76], quadril: [92, 98] } },
  { size: "M", values: { busto: [93, 99], cintura: [77, 83], quadril: [99, 105] } },
  { size: "G", values: { busto: [100, 106], cintura: [84, 90], quadril: [106, 112] } },
  { size: "GG", values: { busto: [107, 114], cintura: [91, 99], quadril: [113, 121] } },
];

const guides = {
  top: { label: "Parte superior", fields: ["busto", "cintura"], rows: topRows },
  bottom: { label: "Calças", fields: ["cintura", "quadril"], rows: bottomRows },
  fullBody: { label: "Vestidos e conjuntos", fields: ["busto", "cintura", "quadril"], rows: fullBodyRows },
} satisfies Record<string, SizeGuide>;

const bottomSlugs = new Set(["calca-alfaiataria-cintura-alta", "calca-operacional-sarja"]);
const fullBodySlugs = new Set([
  "conjunto-alfaiataria-nude",
  "vestido-dourado-lume",
  "vestido-veludo-bordo",
  "vestido-metalico",
]);

export function getSizeGuide(product: Product): SizeGuide {
  if (bottomSlugs.has(product.slug)) return guides.bottom;
  if (fullBodySlugs.has(product.slug)) return guides.fullBody;
  return guides.top;
}

export function recommendSize(guide: SizeGuide, measurements: Measurements): RecommendedSize | undefined {
  if (guide.fields.some((field) => !Number.isFinite(measurements[field]))) return undefined;

  const scored = guide.rows.map((row) => {
    const score = guide.fields.reduce((sum, field) => {
      const value = measurements[field] as number;
      const range = row.values[field];
      if (!range) return sum;
      if (value < range[0]) return sum + (range[0] - value);
      if (value > range[1]) return sum + (value - range[1]);
      return sum;
    }, 0);
    return { size: row.size, score };
  });

  return scored.reduce((best, current) => (current.score < best.score ? current : best)).size;
}
