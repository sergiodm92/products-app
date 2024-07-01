import { ProductsState } from "@interfaces/stores.interfaces";
import { Product } from "@interfaces/products.interfaces";
import { create } from "zustand";

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],

  setProducts: (products: Product[]) => {
    set({
      products,
    });
  },

  addProduct: (product: Product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },

  removeProduct: (id: string) => {
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },
}));
