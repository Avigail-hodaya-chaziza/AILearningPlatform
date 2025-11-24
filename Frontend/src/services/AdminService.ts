import { api } from './api.ts';
import type { AppStats, AdminUserView, AdminPromptView } from '../types';

export const adminService = {
  // קבלת סטטיסטיקות מ-AdminController
  getStats: async (): Promise<AppStats> => {
    console.log('[getStats] התחלה, הטוקן ב-localStorage:', localStorage.getItem('adminToken'));
    // Removed Authorization header dependency as cookies will be used for authentication
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await api.get('/Admin/stats', {
        // Force header as a fallback while cookies are tightened
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : undefined,
        withCredentials: true,
      }); // הסרתי את /api הכפול
      console.log('[getStats] תשובה מהשרת:', response);
      return response.data;
    } catch (error) {
      console.error('[getStats] שגיאה בקבלת סטטיסטיקות:', error);
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

  // ⭐ פונקציית LOGIN למנהל
  loginAdmin: async (Name: string, PassWord: string, phoneNumber: string) => {
    console.log('[loginAdmin] התחלה, username:', Name);
    try {
      const payload = { Name, PassWord, phoneNumber };
  const response = await api.post('/Admin/login', payload, { withCredentials: true });
      console.log('[loginAdmin] קיבלתי תשובה מהשרת:', response);
      const token = response.data.token;
      console.log('[loginAdmin] הטוקן שהתקבל:', token);
      localStorage.setItem('adminToken', token);
      console.log('[loginAdmin] הטוקן נשמר ב-localStorage:', localStorage.getItem('adminToken'));
      // ודא שהטוקן נשמר לפני קריאת stats
      const stats = await adminService.getStats();
      console.log('[loginAdmin] קיבלתי סטטיסטיקות:', stats);
      return stats;
    } catch (error: any) {
      console.error('[loginAdmin] שגיאה בתהליך ההתחברות:', error);
      throw error;
    }
  }
};
export const { loginAdmin } = adminService;
