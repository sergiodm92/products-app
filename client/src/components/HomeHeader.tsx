"use client";
import { NewCategoryModal, NewProductModal } from "@/components/index";
import { useState } from "react";

export const HomeHeader = () => {
  const [isOpenProdctModal, setIsOpenProdctModal] = useState(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);

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
        />
      )}
      {isOpenCategoryModal && (
        <NewCategoryModal
          isOpen={isOpenCategoryModal}
          onClose={() => setIsOpenCategoryModal(false)}
        />
      )}
    </section>
  );
};
