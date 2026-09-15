import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = Pick<Product, "slug" | "name" | "price" | "image"> & {
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  addItem: (product: Product, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
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
    addItem: (product, size) => {
      setItems((current) => {
        const existing = current.find((item) => item.slug === product.slug && item.size === size);
        if (existing) {
          return current.map((item) =>
            item.slug === product.slug && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...current, { slug: product.slug, name: product.name, price: product.price, image: product.image, size, quantity: 1 }];
      });
      setIsOpen(true);
    },
    updateQuantity: (slug, size, quantity) => {
      if (quantity < 1) return;
      setItems((current) => current.map((item) => item.slug === slug && item.size === size ? { ...item, quantity } : item));
    },
    removeItem: (slug, size) => setItems((current) => current.filter((item) => item.slug !== slug || item.size !== size)),
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