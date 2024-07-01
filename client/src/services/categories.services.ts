import axiosInstance from "@lib/axiosInstance";

export const getcategoriesService = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    throw error
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createCategoryService = async (category: any) => {
  try {
    const response = await axiosInstance.post("/categories", category);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryService = async (id: string, category: any) => {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, category);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteCategoryService = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
