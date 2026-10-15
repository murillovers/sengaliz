/**
 * Cupons aplicados em toda a sacola, independente da categoria do item.
 * Adicione ou desative códigos aqui, após aprovação das condições comerciais.
 * O atendimento confirma os valores ao finalizar o pedido pelo WhatsApp.
 */
export type Coupon = {
  code: string;
  description: string;
  discountPercent: number;
};

const coupons: Record<string, Coupon> = {
  CONSUMIDOR30: {
    code: "CONSUMIDOR30",
    description: "30% de desconto em produtos do catálogo",
    discountPercent: 30,
  },
};

export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, "").slice(0, 40);
}

export function findCoupon(code: string): Coupon | undefined {
  return coupons[normalizeCouponCode(code)];
}

export function getCouponDiscount(amount: number, coupon?: Coupon): number {
  if (!coupon || amount <= 0) return 0;
  return Math.round(amount * coupon.discountPercent) / 100;
}

export function getCouponPrice(amount: number, coupon?: Coupon): number {
  return Math.max(0, Math.round((amount - getCouponDiscount(amount, coupon)) * 100) / 100);
}
