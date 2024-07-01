import { CreateProductDto } from "./products.intefaces";

interface Column {
  key: string;
  name: string;
  render?: (value: any) => JSX.Element;
}

export interface TableProps {
  data: any[];
  columns: Column[];
  products: CreateProductDto[];
  setProducts: React.Dispatch<React.SetStateAction<CreateProductDto[]>>;
}
