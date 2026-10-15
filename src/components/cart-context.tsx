import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductColors, type Product } from "@/lib/products";
import { findCoupon, getCouponDiscount, getCouponPrice, type Coupon } from "@/lib/coupons";
import { getPixPrice } from "@/lib/pricing";

export type CartItem = Pick<Product, "slug" | "name" | "price" | "image"> & {
  color?: string;
  imagePosition?: string;
  imageSize?: string;
  imageColor?: string;
  photoPending?: boolean;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  coupon?: Coupon;
  couponDiscount: number;
  discountedTotal: number;
  pixTotal: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isOpen: boolean;
  addItem: (product: Product, size: string, color?: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number, color?: string) => void;
  removeItem: (slug: string, size: string, color?: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "sengaliz-cart";
const COUPON_STORAGE_KEY = "sengaliz-applied-coupon";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
      const storedCode = window.localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCode && findCoupon(storedCode)) setCouponCode(findCoupon(storedCode)!.code);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  useEffect(() => {
    if (!ready) return;
    if (couponCode) window.localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
    else window.localStorage.removeItem(COUPON_STORAGE_KEY);
  }, [couponCode, ready]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const coupon = findCoupon(couponCode);
  const couponDiscount = getCouponDiscount(total, coupon);
  const discountedTotal = getCouponPrice(total, coupon);
  const pixTotal = getPixPrice(discountedTotal);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total,
    coupon,
    couponDiscount,
    discountedTotal,
    pixTotal,
    applyCoupon: (code) => {
      const validCoupon = findCoupon(code);
      if (!validCoupon) return false;
      setCouponCode(validCoupon.code);
      return true;
    },
    removeCoupon: () => setCouponCode(""),
    isOpen,
    addItem: (product, size, color) => {
      const variants = getProductColors(product);
      const variant = variants.find((item) => item.name === color) ?? variants[0];
      const photo = variant?.photos[0];
      const variantName = variant?.name;
      setItems((current) => {
        const existing = current.find(
          (item) => item.slug === product.slug && item.size === size && item.color === variantName,
        );
        if (existing) {
          return current.map((item) =>
            item.slug === product.slug && item.size === size && item.color === variantName
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [
          ...current,
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: photo?.src ?? product.image,
            imagePosition: photo?.spritePosition,
            imageSize: photo?.spriteSize,
            imageColor: variant?.hex,
            photoPending: Boolean(variant && !photo),
            color: variantName,
            size,
            quantity: 1,
          },
        ];
      });
      setIsOpen(true);
    },
    updateQuantity: (slug, size, quantity, color) => {
      if (quantity < 1) return;
      setItems((current) =>
        current.map((item) =>
          item.slug === slug && item.size === size && item.color === color
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    removeItem: (slug, size, color) =>
      setItems((current) =>
        current.filter((item) => !(item.slug === slug && item.size === size && item.color === color)),
      ),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }), [isOpen, items, total, coupon, couponDiscount, discountedTotal, pixTotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}