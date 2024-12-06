import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { CartPhoto } from '@/models/cart';
import { immer } from 'zustand/middleware/immer';

interface CartState {
  photos: Array<CartPhoto>;
}

interface CartActions {
  addToCart: (photo: CartPhoto) => void;
  removeFromCart: (index: number) => void;
  editInCart: (index: number, photo: CartPhoto) => void;
  changeQuantity: (index: number, quantity: number) => void;
  isEmpty: () => boolean;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      immer(
        (set, get): CartStore => ({
          photos: [],
          addToCart: (photo: CartPhoto) =>
            set((state) => {
              state.photos.push(photo);
            }),
          removeFromCart: (index: number) =>
            set((state) => {
              state.photos.splice(index, 1);
            }),
          editInCart: (index: number, photo: CartPhoto) =>
            set((state) => {
              state.photos[index] = photo;
            }),
          changeQuantity: (index: number, quantity: number) =>
            set((state) => {
              state.photos[index].quantity = quantity;
            }),
          isEmpty: () => get().photos.length === 0,
        }),
      ),
      {
        name: 'cart',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
