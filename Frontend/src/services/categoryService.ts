import { api } from './api.ts';
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

  // הוספת קטגוריה חדשה - POST /api/Category
  addCategory: async (name: string): Promise<Category> => {
    try {
      const response = await api.post('/Category', { name });
      return response.data;
    } catch (error: any) {
      console.error("Error adding category:", error.response?.data || error.message);
      throw error;
    }
  },

  // הוספת תת-קטגוריה - POST /api/Category/subcategories
  addSubCategory: async (categoryId: number, name: string): Promise<SubCategory> => {
    try {
      const response = await api.post('/Category/subcategories', { name, categoryId });
      return response.data;
    } catch (error: any) {
      console.error("Error adding subcategory:", error.response?.data || error.message);
      throw error;
    }
  },

  // יצירת קטגוריות בסיסיות - POST /api/Category/seed
  seedCategories: async (): Promise<void> => {
    try {
      await api.post('/Category/seed');
    } catch (error: any) {
      console.error("Error seeding categories:", error.response?.data || error.message);
      throw error;
    }
  },
};
