import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  searchTerm: string;
  sortOrder: string;
  selectedCategories: string[];
  priceRange: [number, number];
  setSearchTerm: (term: string) => void;
  setSortOrder: (order: string) => void;
  setSelectedCategories: (updater: (prev: string[]) => string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

const initialState = {
  searchTerm: '',
  sortOrder: 'relevance',
  selectedCategories: [],
  priceRange: [0, 1000] as [number, number],
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      ...initialState,
      setSearchTerm: (term) => set({ searchTerm: term }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setSelectedCategories: (updater) => set((state) => ({ selectedCategories: updater(state.selectedCategories) })),
      setPriceRange: (range) => set({ priceRange: range }),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'filter-storage',
    }
  )
);