import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductService } from "@services/products.services";
import {
  ModalNewProductProps,
  ProductFormInput,
} from "@interfaces/products.interfaces";
import { createProductValidationSchema } from "@validations/products.validations";
import toast from "react-hot-toast";
import { useProductsStore } from "@store/useProductsStore";
import { useCategoriesStore } from "@store/useCategoriesStore";
import { getcategoriesService } from "@services/categories.services";

export const NewProductModal = ({ isOpen, onClose }: ModalNewProductProps) => {
  const categories = useCategoriesStore((state) => state.categories);
  const [loading, setLoading] = useState(true);
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const addProduct = useProductsStore((state) => state.addProduct);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getcategoriesService();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const {
    register: newProduct,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: yupResolver(createProductValidationSchema),
  });

  const onSubmit: SubmitHandler<ProductFormInput> = async (data) => {
    try {
      const response = await createProductService(data);
      if (response.status === 201) {
        const newProduct = response.data;
        addProduct(newProduct);
        toast.success("Product created successfully");
        onClose(); // Cierra el modal después de crear el producto
      } else {
        toast.error("Failed to create product");
      }
    } catch (error: any) {
      toast.error("Failed to create product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-secondaryDark p-4 rounded-xl w-96 text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white close border-[1px] rounded-full hover:bg-primary"
        />

        <h1 className="font-semibold text-center text-xl text-white">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex flex-col text-left">
            <label className="text-white">Name</label>
            <input
              type="text"
              {...newProduct("name")}
              className="border border-white p-2 rounded text-primaryDark"
            />
            {errors.name && (
              <p className="text-danger text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col text-left">
            <label className="text-white ">Price</label>
            <input
              type="text"
              {...newProduct("price")}
              className="border border-white p-2 rounded text-primaryDark"
            />
            {errors.price && (
              <p className="text-danger text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="flex flex-col text-left">
            <label className="text-white">Description</label>
            <textarea
              {...newProduct("description")}
              className="border border-white p-2 rounded text-primaryDark"
            />
            {errors.description && (
              <p className="text-danger text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col text-left">
            <label className="text-white">Category</label>
            <select
              {...newProduct("category")}
              className="border border-white p-2 rounded text-primaryDark"
            >
              {loading ? (
                <option value="">Loading...</option>
              ) : (
                <option value="">Select a category</option>
              )}
              {categories?.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-danger text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="flex flex-col text-left">
            <label className="text-white">Image URL</label>
            <input
              type="text"
              {...newProduct("image")}
              className="border border-white p-2 rounded text-primaryDark"
            />
            {errors.image && (
              <p className="text-danger text-sm">{errors.image.message}</p>
            )}
          </div>
          <div className="flex flex-col text-left">
            <label className="text-white">Stock</label>
            <input
              type="text"
              {...newProduct("stock")}
              className="border border-white p-2 rounded text-primaryDark"
            />
            {errors.stock && (
              <p className="text-danger text-sm">{errors.stock.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-5 py-2 rounded bg-primary text-white hover:bg-primary/50"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
