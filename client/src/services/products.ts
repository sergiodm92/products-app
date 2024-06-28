import axiosInstance from "@lib/axiosInstance";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createProduct = async (product: any) => {
  try {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateProduct = async (id: string, product: any) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
