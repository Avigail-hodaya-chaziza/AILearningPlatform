import { api } from './api';
import type { PromptRequest, PromptResponse, CreatePromptResponse } from '../types';

export const promptService = {
  // יצירת פרומפט חדש - POST /api/Prompts/CreatePrompt
  createPrompt: async (promptData: PromptRequest): Promise<CreatePromptResponse> => {
    try {
      const response = await api.post('/Prompts/CreatePrompt', promptData);
      return response.data;
    } catch (error: any) {
      console.error("Error creating prompt:", error.response?.data || error.message);
      throw error;
    }
  },

  // קבלת היסטוריית משתמש - GET /api/Prompts/GetUserHistory/{userId}
  getUserHistory: async (userId: number): Promise<PromptResponse[]> => {
    try {
      const response = await api.get(`/Prompts/GetUserHistory/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user history:", error.response?.data || error.message);
      throw error;
    }
  },
};
