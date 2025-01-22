import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { PhotoFilters } from '@/models/photo';

interface NewPageState {
  filters: PhotoFilters;
}

interface NewPageActions {
  setCategoryFilter: (category: number | undefined) => void;
  setPriceRangeFilter: (priceRange: [number, number]) => void;
  setTagsFilter: (tags: Array<number>) => void;
}

type NewPageStore = NewPageState & NewPageActions;

export const useNewPageStore = create<NewPageStore>()(
  devtools(
    immer(
      (set): NewPageStore => ({
        filters: {
          category: undefined,
          priceRange: [0, 1000],
          tags: [],
        },
        setCategoryFilter: (category: number | undefined) =>
          set((state) => {
            state.filters!.category = category;
          }),
        setPriceRangeFilter: (priceRange: [number, number]) =>
          set((state) => {
            state.filters!.priceRange = priceRange;
          }),
        setTagsFilter: (tags: Array<number>) =>
          set((state) => {
            state.filters!.tags = tags;
          }),
      }),
    ),
  ),
);
