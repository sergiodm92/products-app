import axiosInstance from "@lib/axiosInstance";

export const getProductsService = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    throw error
  }
};

export const createProductService = async (product: any) => {
  try {
    const response = await axiosInstance.post("/products", product);
    return response;
  } catch (error) {
    throw error;
  }
};

