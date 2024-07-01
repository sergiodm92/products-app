import { Product } from "./products.interfaces";

export interface ToastDeleteProps {
  product: Product;
  onClose: () => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}