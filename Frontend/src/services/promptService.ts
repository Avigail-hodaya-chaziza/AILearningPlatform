import { api } from './api.ts';
import type { PromptRequest, PromptResponse, CreatePromptResponse } from '../types';

export const promptService = {
  // יצירת פרומפט חדש - POST /api/Prompts
  createPrompt: async (promptData: PromptRequest): Promise<CreatePromptResponse> => {
    try {
      const response = await api.post('/Prompts', promptData);
      return response.data;
    } catch (error: any) {
      const msg = error.userMessage || error.response?.data || error.message;
      console.error("Error creating prompt (normalized):", msg);
      throw error;
    }
  },

  // קבלת היסטוריית משתמש - GET /api/Prompts/history/{userId}
  getUserHistory: async (userId: number): Promise<PromptResponse[]> => {
    try {
      const response = await api.get(`/Prompts/history/${userId}`);
      return response.data;
    } catch (error: any) {
      const msg = error.userMessage || error.response?.data || error.message;
      console.error("Error fetching user history (normalized):", msg);
      throw error;
    }
  },
};
