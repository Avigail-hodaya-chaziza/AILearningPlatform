import { api } from './api';
import type { SubCategoryRequest, SubCategoryResponse } from '../types';

export const subCategoryService = {
  // יצירת תת-קטגוריה חדשה - POST /api/SubCategory
  createSubCategory: async (subCategoryData: SubCategoryRequest): Promise<void> => {
    try {
      await api.post('/SubCategory', subCategoryData);
    } catch (error: any) {
      console.error("Error creating subcategory:", error.response?.data || error.message);
      throw error;
    }
  },

  // קבלת תת-קטגוריה לפי ID - GET /api/SubCategory/{id}
  getSubCategoryById: async (id: number): Promise<SubCategoryResponse> => {
    try {
      const response = await api.get(`/SubCategory/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching subcategory:", error.response?.data || error.message);
      throw error;
    }
  },
};
