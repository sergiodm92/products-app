import React, { useState, useEffect } from "react";

interface PriceFilterProps {
  onFilter: (min: number, max: number) => void;
  disabled: boolean;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onFilter, disabled }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const priceOptions = [0, 25, 50, 75, 100, 150, 200, 250, 300];

  const [filteredMaxOptions, setFilteredMaxOptions] =
    useState<number[]>(priceOptions);

  useEffect(() => {
    setFilteredMaxOptions(priceOptions.filter((price) => price > minPrice));
  }, [minPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setMinPrice(value);
    if (value >= maxPrice) {
      setMaxPrice(value + 1);
    }
    onFilter(value, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxPrice(value);
    onFilter(minPrice, value);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <select
        value={minPrice}
        onChange={handleMinChange}
        disabled={disabled}
        className="w-17 lg:w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {priceOptions.map((price) => (
          <option key={price} value={price}>
            ${price}
          </option>
        ))}
      </select>
      <span>-</span>
      <select
        value={maxPrice}
        onChange={handleMaxChange}
        disabled={disabled}
        className="w-17 lg:w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {filteredMaxOptions.map((price) => (
          <option key={price} value={price}>
            ${price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
