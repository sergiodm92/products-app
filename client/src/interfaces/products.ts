import { ProductCategory } from "@enums/product-category.enum";

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  category: ProductCategory;
  image?: string;
  ratings?: number[];
  stock: number;
}
