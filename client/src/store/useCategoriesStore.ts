import { Category } from "@/interfaces/products.interfaces";
import { CategoryState } from "@/interfaces/stores.interfaces";
import create from "zustand";

export const useCategoriesStore = create<CategoryState>((set) => ({
  categories: [],

  setCategories: (categories: Category[]) => {
    set({
      categories,
    });
  },

  addCategory: (category: Category) => {
    set((state) => ({
      categories: [...state.categories, category],
    }));
  },
}));
