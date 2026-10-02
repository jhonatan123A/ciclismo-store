import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  category: 'running' | 'cycling';
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  isOpen: boolean;
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  toggleWishlist: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),

      addItem: (newItem) => {
        const { items } = get();
        const exists = items.some((item) => item.productId === newItem.productId);
        if (exists) return;

        const item: WishlistItem = {
          ...newItem,
          addedAt: Date.now(),
        };
        set({ items: [...items, item] });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },

      toggleItem: (newItem) => {
        const { items } = get();
        const exists = items.some((item) => item.productId === newItem.productId);

        if (exists) {
          set({ items: items.filter((item) => item.productId !== newItem.productId) });
        } else {
          const item: WishlistItem = {
            ...newItem,
            addedAt: Date.now(),
          };
          set({ items: [...items, item] });
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },

      clearWishlist: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'bestige-wishlist',
    }
  )
);