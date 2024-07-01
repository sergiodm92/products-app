"use client";
import { useEffect, useState } from "react";
import { getProductsService } from "@/services/products.services";
import {
  Table,
  Spinner,
  Search,
  PriceFilter,
  StockFilter,
  Pagination,
  Header,
} from "@components/index";

const SectionProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("No products available");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [stockRange, setStockRange] = useState({ min: 0, max: 1000 });
  const [isPriceFilterEnabled, setIsPriceFilterEnabled] = useState(false);
  const [isStockFilterEnabled, setIsStockFilterEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const columns = [
    { key: "name", name: "NAME" },
    { key: "price", name: "PRICE" },
    { key: "category", name: "CATEGORY" },
    { key: "image", name: "IMAGE" },
    { key: "ratings", name: "RATING" },
    { key: "stock", name: "STOCK" },
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getProductsService();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        setStatus("Connection error");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      // Apply search query filter
      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply price range filter if enabled
      if (isPriceFilterEnabled) {
        filtered = filtered.filter(
          (product) =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );
      }

      // Apply stock range filter if enabled
      if (isStockFilterEnabled) {
        filtered = filtered.filter(
          (product) =>
            product.stock >= stockRange.min && product.stock <= stockRange.max
        );
      }

      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to first page on filter change
      if (filtered.length === 0) {
        setStatus("No products found");
      }
    };

    filterProducts();
  }, [
    searchQuery,
    priceRange,
    isPriceFilterEnabled,
    stockRange,
    isStockFilterEnabled,
    products,
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handleStockFilter = (min: number, max: number) => {
    setStockRange({ min, max });
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentPageData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="flex-col container w-full justify-start text-center items-center">
      <Header setProducts={setProducts} products={products} />
      <div className="flex flex-col md:flex-row mt-10 w-auto justify-start items-start md:justify-center gap-2 lg:gap-10">
        <Search onSearch={handleSearch} />
        <div className="flex items-center justify-center gap-2 h-auto">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              checked={isPriceFilterEnabled}
              onChange={() => setIsPriceFilterEnabled(!isPriceFilterEnabled)}
              className="mr-2"
            />
            Price
          </label>
          <PriceFilter
            onFilter={handlePriceFilter}
            disabled={!isPriceFilterEnabled}
          />
        </div>
        <div className="flex items-center justify-center gap-2 h-auto">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              checked={isStockFilterEnabled}
              onChange={() => setIsStockFilterEnabled(!isStockFilterEnabled)}
              className="mr-2"
            />
            Stock
          </label>
          <StockFilter
            onFilter={handleStockFilter}
            disabled={!isStockFilterEnabled}
          />
        </div>
      </div>
      {loading ? (
        <div className="mt-20">
          <Spinner />
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <Table data={currentPageData} columns={columns} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center text-center font-bold text-2xl text-white mt-20 p-10">
          {status}
        </div>
      )}
    </section>
  );
};

export default SectionProducts;
