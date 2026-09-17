export const PIX_DISCOUNT_PERCENT = 10;

export const getPixPrice = (price: number) =>
  Math.round(price * (1 - PIX_DISCOUNT_PERCENT / 100) * 100) / 100;

export const getInstallmentPrice = (price: number, installments = 6) =>
  Math.round((price / installments) * 100) / 100;
