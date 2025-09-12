import { api } from './api';
import type { AppStats, AdminUserView, AdminPromptView } from '../types';

export const adminService = {
  // קבלת סטטיסטיקות מ-AdminController
  getStats: async (): Promise<AppStats> => {
    try {
      const response = await api.get('/Admin/stats');
      return response.data;
    } catch (error: any) {
      console.error("Error fetching admin stats:", error);
      throw error;
    }
  },

  // קבלת כל המשתמשים מ-AdminController
  getAllUsers: async (): Promise<AdminUserView[]> => {
    try {
      const response = await api.get('/Admin/users');
      return response.data;
    } catch (error: any) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // קבלת כל הפרומפטים מ-AdminController
  getAllPrompts: async (): Promise<AdminPromptView[]> => {
    try {
      const response = await api.get('/Admin/prompts');
      return response.data;
    } catch (error: any) {
      console.error("Error fetching prompts:", error);
      throw error;
    }
  },
};
