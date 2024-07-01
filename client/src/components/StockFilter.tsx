import React, { useState, useEffect } from "react";

interface stockFilterProps {
  onFilter: (min: number, max: number) => void;
  disabled: boolean;
}

const StockFilter: React.FC<stockFilterProps> = ({ onFilter, disabled }) => {
  const [minstock, setMinstock] = useState(0);
  const [maxstock, setMaxstock] = useState(1000);

  const stockOptions = [0, 25, 50, 75, 100, 150, 200, 250, 300];

  const [filteredMaxOptions, setFilteredMaxOptions] =
    useState<number[]>(stockOptions);

  useEffect(() => {
    setFilteredMaxOptions(stockOptions.filter((stock) => stock > minstock));
  }, [minstock]);

  const handleMinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setMinstock(value);
    if (value >= maxstock) {
      setMaxstock(value + 1);
    }
    onFilter(value, maxstock);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxstock(value);
    onFilter(minstock, value);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <select
        value={minstock}
        onChange={handleMinChange}
        disabled={disabled}
        className="w-17 lg:w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {stockOptions.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
      <span>-</span>
      <select
        value={maxstock}
        onChange={handleMaxChange}
        disabled={disabled}
        className="w-17 lg:w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {filteredMaxOptions.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockFilter;
