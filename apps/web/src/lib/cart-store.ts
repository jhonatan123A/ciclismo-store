import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
  category: 'running' | 'cycling';
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getOriginalPrice: () => number;
  getSavings: () => number;
  getItemCount: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) =>
            item.productId === newItem.productId &&
            item.size === newItem.size &&
            item.color === newItem.color
        );

        if (existingIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          const item: CartItem = {
            ...newItem,
            id: `${newItem.productId}-${newItem.size}-${newItem.color}-${Date.now()}`,
          };
          set({ items: [...items, item] });
        }
        // Abrir el carrito al agregar
        set({ isOpen: true });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        );
        set({ items: updatedItems.filter((item) => item.quantity > 0) });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getOriginalPrice: () => {
        return get().items.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);
      },

      getSavings: () => {
        const total = get().getTotalPrice();
        const original = get().getOriginalPrice();
        return original - total;
      },

      getItemCount: (productId) => {
        const { items } = get();
        return items.filter((item) => item.productId === productId).reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    {
      name: 'bestige-cart',
    }
  )
);