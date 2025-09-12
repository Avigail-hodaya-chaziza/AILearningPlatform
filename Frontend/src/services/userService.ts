import { api } from './api';
import type { UserRequest, UserResponse } from '../types';

export const userService = {
  // רישום משתמש חדש - בהתאם ל-UserController
  registerUser: async (userData: UserRequest): Promise<UserResponse> => {
    try {
      const response = await api.post('/User/register', userData);
      return response.data;
    } catch (error: any) {
      console.error("Error registering user:", error.response?.data || error.message);
      throw error;
    }
  },
  
};
