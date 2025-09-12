import { api } from './api';
import type { Category, SubCategory } from '../types';

export const categoryService = {
  // קבלת כל הקטגוריות - GET /api/Category
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/Category');
      return response.data;
    } catch (error: any) {
      console.error("Error fetching categories:", error.response?.data || error.message);
      throw error;
    }
  },

  // קבלת תת-קטגוריות לפי קטגוריה - GET /api/Category/{categoryId}/subcategories
  getSubCategories: async (categoryId: number): Promise<SubCategory[]> => {
    try {
      const response = await api.get(`/Category/${categoryId}/subcategories`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching subcategories:", error.response?.data || error.message);
      throw error;
    }
  },
};
