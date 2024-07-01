export interface CreateProductDto {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
  ratings?: number[];
  stock: number;
}
export interface ModalNewProductProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  setProducts: (products: any[]) => void;
  products: CreateProductDto[];
}

export interface ModalNewCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export interface CategoryFormInput {
  name: string;
  description: string;
}

export interface Category {
  name: string;
  description: string;
  _id: string;
}

export interface ProductFormInput {
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  stock: number;
}
