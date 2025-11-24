import { api } from './api.ts';
import type { UserRequest, UserResponse } from '../types';

interface UserLoginPayload { phone: string }
interface UserLoginResponse { token: string; id: number; name: string; phone: string }

export const userService = {
  // רישום משתמש חדש - בהתאם ל-UserController
  registerUser: async (userData: UserRequest): Promise<UserResponse> => {
    try {
      const response = await api.post('/User/register', userData);
      return response.data; // cookie נוצר בצד שרת, לא שומרים token
    } catch (error: any) {
      // משתמש בהודעה מנורמלת מה-interceptor אם קיימת
      const msg = error.userMessage || error.response?.data || error.message;
      console.error("Error registering user (normalized):", msg);
      throw error;
    }
  },
  // לוגין משתמש קיים לפי מספר טלפון בלבד
  loginUser: async (phone: string): Promise<UserLoginResponse> => {
    try {
      const response = await api.post('/User/login', { phone } as UserLoginPayload);
      return response.data; // גם כאן נשען על cookie
    } catch (error: any) {
      const msg = error.userMessage || error.response?.data || error.message;
      console.error("Error logging user (normalized):", msg);
      throw error;
    }
  },
  // מבטיח סשן: אם אין טוקן אבל יש טלפון שמור – מבצע לוגין שקט
  ensureSession: async (): Promise<UserLoginResponse | null> => {
    // בודקים אם יש cookie (לא נגיש ב-JS כי HttpOnly). אם יש token ב-localStorage מהעבר – מתעלמים.
    const savedPhone = localStorage.getItem('userPhone');
    if (!savedPhone) {
      return null; // אין טלפון שמור לבצע לוגין
    }
    try {
      const login = await api.post('/User/login', { phone: savedPhone } as UserLoginPayload);
      const data: UserLoginResponse = login.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (e) {
      console.warn('Silent auto login failed');
      return null;
    }
  }
  
};
