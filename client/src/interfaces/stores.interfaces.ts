import { Category, Product } from "./products.interfaces";

export interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
}

export interface ProductsState {
  products: Product[];
  removeProduct: (id: string) => void;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
}



export interface FilteredProductsState {
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
}