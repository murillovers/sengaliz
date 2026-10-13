import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

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
  isOpen: boolean;
  addItem: (product: Product, size: string, color?: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number, color?: string) => void;
  removeItem: (slug: string, size: string, color?: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "sengaliz-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    isOpen,
    addItem: (product, size, color) => {
      const variant = product.colors?.find((item) => item.name === color) ?? product.colors?.[0];
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
  }), [isOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}