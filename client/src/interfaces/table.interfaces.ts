export interface Column {
  key: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  ratings: number[];
  stock: number;
}

export interface TableProps {
  data: Product[] | any[];
  columns: Column[];
}
