import create from "zustand";
import { FilteredProductsState } from "@interfaces/stores.interfaces";

export const useFilteredProductsStore = create<FilteredProductsState>(
  (set) => ({
    filteredProducts: [],
    setFilteredProducts: (products) => set({ filteredProducts: products }),
  })
);
