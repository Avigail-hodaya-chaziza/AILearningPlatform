// ===== USER TYPES =====
export interface User {
  id: number;
  name: string;
  phone: string;
}

export interface UserRequest {
  name: string;
  phone: string;
}

export interface UserResponse {
  id: number;
  name: string;
  phone: string;
}

// ===== CATEGORY TYPES =====
export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface SubCategoryRequest {
  name: string;
  categoryId: number;
}

export interface SubCategoryResponse {
  id: number;
  name: string;
  categoryId: number;
}

// ===== PROMPT TYPES =====
export interface PromptRequest {
  userId: number;
  categoryId: number;
  subCategoryId: number;
  promptText: string;
}

export interface PromptResponse {
  id: number;
  promptText: string;
  response: string;
  categoryName: string;
  subCategoryName: string;
  createdAt: string;
}

export interface CreatePromptResponse {
  response: string;
}

// ===== ADMIN TYPES =====
export interface AdminUserView {
  id: number;
  name: string;
  phone: string;
  registrationDate: string;
  totalPrompts: number;
  lastActivity: string;
}

export interface AdminPromptView {
  id: number;
  promptText: string;
  response: string;
  userName: string;
  userPhone: string;
  categoryName: string;
  subCategoryName: string;
  createdAt: string;
}

// ===== COMPONENT PROPS TYPES =====
export interface HeaderProps {
  currentUser?: string;
  isAdmin?: boolean;
}

export interface LoadingProps {
  message?: string;
}

export interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export interface UserRegistrationProps {
  onUserRegistered: (userId: number, userName: string) => void;
}

export interface CategorySelectorProps {
  onSelectionChange: (categoryId: number, subCategoryId: number) => void;
}

export interface PromptFormProps {
  userId: number;
  categoryId: number;
  subCategoryId: number;
  onPromptSubmitted: (response: string) => void;
}

export interface AIResponseProps {
  response: string | null;
  isLoading?: boolean;
}

export interface UserHistoryProps {
  userId: number;
  refreshTrigger?: number;
}

// ===== UTILITY TYPES =====
export type AdminView = 'dashboard' | 'users' | 'prompts';

export interface AppStats {
  totalUsers: number;
  totalPrompts: number;
  todayPrompts: number;
}
