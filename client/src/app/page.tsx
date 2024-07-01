"use client";
import { useEffect, useState } from "react";
import { getProductsService } from "@services/products.services";
import {
  Table,
  Spinner,
  Search,
  PriceFilter,
  StockFilter,
  Pagination,
  HomeHeader,
} from "@components/index";
import { useProductsStore } from "@store/useProductsStore";
import { Product } from "@interfaces/products.interfaces";
import { useFilteredProductsStore } from "@store/useFilteredProductsStore";

const Home = () => {
  const allProducts = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [stockRange, setStockRange] = useState({ min: 0, max: 1000 });
  const [isPriceFilterEnabled, setIsPriceFilterEnabled] = useState(false);
  const [isStockFilterEnabled, setIsStockFilterEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredProducts = useFilteredProductsStore(
    (state) => state.filteredProducts
  );
  const setFilteredProducts = useFilteredProductsStore(
    (state) => state.setFilteredProducts
  );

  const columns = [
    { key: "name", name: "NAME" },
    { key: "price", name: "PRICE" },
    { key: "category", name: "CATEGORY" },
    { key: "image", name: "IMAGE" },
    { key: "ratings", name: "RATING" },
    { key: "stock", name: "STOCK" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handleStockFilter = (min: number, max: number) => {
    setStockRange({ min, max });
  };

  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const currentPageData = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsService();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...allProducts]; 

      if (searchQuery) {
        filtered = filtered.filter((product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (isPriceFilterEnabled) {
        filtered = filtered.filter(
          (product) =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );
      }

      if (isStockFilterEnabled) {
        filtered = filtered.filter(
          (product) =>
            product.stock >= stockRange.min && product.stock <= stockRange.max
        );
      }

      setFilteredProducts(filtered);
      setCurrentPage(1); 
    };

    filterProducts();
  }, [
    allProducts,
    searchQuery,
    priceRange,
    isPriceFilterEnabled,
    stockRange,
    isStockFilterEnabled,
    setFilteredProducts, 
  ]);


  useEffect(() => {
    if (!isPriceFilterEnabled && !isStockFilterEnabled) {
      setFilteredProducts(allProducts);
    }
  }, [
    isPriceFilterEnabled,
    isStockFilterEnabled,
    allProducts,
    setFilteredProducts,
  ]);

  return (
    <section className="flex-col container w-full justify-start items-center">
      <HomeHeader />
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
      ) : filteredProducts?.length > 0 ? (
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
          No products found
        </div>
      )}
    </section>
  );
};

export default Home;
