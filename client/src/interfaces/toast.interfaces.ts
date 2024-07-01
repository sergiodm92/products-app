import { CreateProductDto } from "@/interfaces/products.intefaces";

export interface ToastDeleteProps {
  product: CreateProductDto;
  onClose: () => void;
  products: CreateProductDto[];
  setProducts: React.Dispatch<React.SetStateAction<CreateProductDto[]>>;
}
