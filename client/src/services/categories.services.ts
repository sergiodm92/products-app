import axiosInstance from "@lib/axiosInstance";

export const getcategoriesService = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    throw error
  }
};

export const createCategoryService = async (category: any) => {
  try {
    const response = await axiosInstance.post("/categories", category);
    return response;
  } catch (error) {
    throw error;
  }
};


