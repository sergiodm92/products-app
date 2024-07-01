import { CreateProductDto } from "@/interfaces/products.intefaces";

export interface ToastDeleteProps {
  data: CreateProductDto;
  onClose: () => void;
}
