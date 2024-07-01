"use client";
import React from "react";
import toast from "react-hot-toast";
import { toastDelete } from "./ToastDelete";
import { ModalProps } from "@/interfaces/products.interfaces";
import { useProductsStore } from "@/store/useProductsStore";

export const DetailModal = ({ product, isOpen, onClose }: ModalProps) => {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const handleOnClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.id === "modal") {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleDeleteProduct = async () => {
    try {
      toastDelete({ product, onClose, products, setProducts }); // Llama a la función toastDelete para mostrar el modal de confirmación
    } catch (error: any) {
      console.log(error)
      toast.error("Something went wrong");
    }
  };

  return (
    <section
      id="modal"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOnClose}
    >
      <div className="relative bg-secondaryDark p-4 rounded-xl w-96 text-white flex flex-col justify-center items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white close border-[1px] rounded-full hover:bg-primary"
        />
        <h1 className="font-semibold text-center text-xl text-white max-w-[80%]">
          {product.name}
        </h1>
        <div className="w-full p-2 bg-white rounded-lg flex flex-col justify-center items-center m-4">
          <img
            src={
              product.image
                ? product.image
                : "https://focaris.com.ar/wp-content/plugins/ecommerce-product-catalog/img/no-default-thumbnail.png"
            }
            className="rounded-lg max-h-[100px] max-w-[100px]"
            alt="Product Image"
          />
        </div>
        <div className="flex flex-col justify-center items-start m-2 gap-2 w-full">
          <p>{product.description}</p>
          <p>
            <b>Price: </b>
            {product.price}
          </p>
          <p>
            <b>Category: </b>
            {product.category}
          </p>
          <p>
            <b>Stock: </b>
            {product.stock}
          </p>
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleDeleteProduct}
        >
          Delete Product
        </button>
      </div>
    </section>
  );
};
