export interface stockFilterProps {
  onFilter: (min: number, max: number) => void;
  disabled: boolean;
}

export interface PriceFilterProps {
  onFilter: (min: number, max: number) => void;
  disabled: boolean;
}
