import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface FiltersState {
  category?: string;
  priceRange: number[];
  tags: Array<string>;
}

interface NewPageState {
  filters: FiltersState;
}

interface NewPageActions {
  setCategoryFilter: (category: string | undefined) => void;
  setPriceRangeFilter: (priceRange: number[]) => void;
  setTagsFilter: (tags: Array<string>) => void;
}

type NewPageStore = NewPageState & NewPageActions;

export const useNewPageStore = create<NewPageStore>()(
  devtools(
    immer((set) => ({
      filters: {
        category: undefined,
        priceRange: [],
        tags: [],
      },
      setCategoryFilter: (category: string | undefined) =>
        set((state) => {
          state.filters.category = category;
        }),
      setPriceRangeFilter: (priceRange: number[]) =>
        set((state) => {
          state.filters.priceRange = priceRange;
        }),
      setTagsFilter: (tags: Array<string>) =>
        set((state) => {
          state.filters.tags = tags;
        }),
    })),
  ),
);
