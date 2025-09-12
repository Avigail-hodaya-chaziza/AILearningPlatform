import { api } from './api';

export interface Course {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export const courseService = {
  getCourses: async (): Promise<Course[]> => {
    const response = await api.get('/courses');
    return response.data;
  },

  getCourseById: async (id: number): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData: Omit<Course, 'id' | 'createdAt'>): Promise<Course> => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },
};