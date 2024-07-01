import { Product } from "@interfaces/products.interfaces";
import { create } from "zustand";

interface ProductsState {
  products: Product[];
  removeProduct: (id: string) => void;
  setProducts: (products: Product[]) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],

  setProducts: (products: Product[]) => {
    set({
      products,
    });
  },

  removeProduct: (id: string) => {
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },
}));
