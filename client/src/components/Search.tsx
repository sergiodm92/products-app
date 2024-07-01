import { SearchProps } from "@/interfaces/search.interfaces";
import React, { useState } from "react";

export const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: any) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="relative w-auto h-auto">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="relative flex justify-between w-full max-w-[15rem] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm"
        />
        <span className="absolute right-2 top-2">🔎</span>
      </div>
    </div>
  );
};

