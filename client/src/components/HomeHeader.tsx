"use client";
import { NewCategoryModal, NewProductModal } from "@/components/index";
import { getcategoriesService } from "@/services/categories.services";
import { useEffect, useState } from "react";

export const HomeHeader = ({
  setProducts,
  products,
}: {
  setProducts: (products: any[]) => void;
  products: any[];
}) => {
  const [isOpenProdctModal, setIsOpenProdctModal] = useState(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getcategoriesService();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  return (
    <section className="flex justify-center items-center w-full mt-4 text-white gap-5">
      <button
        className="bg-white text-black rounded px-4 py-2 hover:bg-primary hover:text-white"
        onClick={() => setIsOpenProdctModal(true)}
      >
        New Product
      </button>
      <button
        className="bg-white text-black rounded px-4 py-2 hover:bg-primary hover:text-white"
        onClick={() => setIsOpenCategoryModal(true)}
      >
        New Category
      </button>
      {isOpenProdctModal && (
        <NewProductModal
          isOpen={isOpenProdctModal}
          onClose={() => setIsOpenProdctModal(false)}
          categories={categories}
          setProducts={setProducts}
          products={products}
        />
      )}
      {isOpenCategoryModal && (
        <NewCategoryModal
          isOpen={isOpenCategoryModal}
          onClose={() => setIsOpenCategoryModal(false)}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </section>
  );
};
