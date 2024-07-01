import create from 'zustand';

interface Category {
  _id: string;
  name: string;
  description: string;
}

interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoriesStore = create<CategoryState>((set) => ({
  categories: [],

  setCategories: (categories: Category[]) => {
    set({
      categories,
    });
  },

}));
