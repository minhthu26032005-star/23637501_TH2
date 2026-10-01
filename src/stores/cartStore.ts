import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT, PRICE_MULTIPLIER } from '@constants/student';

export interface CartItem {
  id: number;
  title: string;
  rawPrice: number;
  unitPriceVND: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: { id: number; title: string; price: number; image: string }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        const existing = currentItems.find((item) => item.id === product.id);
        const unitVND = Math.round(product.price * PRICE_MULTIPLIER);

        if (existing) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: product.id,
                title: product.title,
                rawPrice: product.price,
                unitPriceVND: unitVND,
                quantity: 1,
                image: product.image,
              },
            ],
          });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, delta) => {
        const updated = get()
          .items.map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter((item): item is CartItem => item !== null);

        set({ items: updated });
      },
      totalQuantity: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      totalAmount: () => {
        return get().items.reduce(
          (sum, item) => sum + item.unitPriceVND * item.quantity,
          0,
        );
      },
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);