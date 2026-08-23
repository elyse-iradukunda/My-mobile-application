// lib/services/tool.service.ts
import { apiClient } from '@/lib/api-client';

export interface Tool {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  pricePerDay: number;
  deposit?: number;
  location: string;
  lat?: number;
  lng?: number;
  images: string[];
  status: 'available' | 'rented' | 'unavailable' | 'pending';
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateToolData {
  title: string;
  description?: string;
  category: string;
  pricePerDay: number;
  deposit?: number;
  location: string;
  lat?: number;
  lng?: number;
  images?: string[];
}

export interface UpdateToolData {
  title?: string;
  description?: string;
  category?: string;
  pricePerDay?: number;
  deposit?: number;
  location?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  status?: string;
}

export interface SearchParams {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  search?: string;
  ownerId?: string;
  limit?: number;
  offset?: number;
}

export interface CategoryStats {
  category: string;
  count: number;
}

export interface ToolStats {
  total: number;
  available: number;
  rented: number;
  myTotal: number;
  myAvailable: number;
  myRented: number;
}

export const toolService = {
  // ========== CRUD Operations ==========

  // Create a new tool
  create: async (data: CreateToolData): Promise<Tool> => {
    const response = await apiClient.post<{ success: boolean; data: Tool }>(
      '/tools',
      data
    );
    return response.data.data;
  },

  // Get all tools with filters
  getAll: async (params?: SearchParams): Promise<Tool[]> => {
    const response = await apiClient.get<{ success: boolean; data: Tool[] }>(
      '/tools',
      { params }
    );
    return response.data.data;
  },

  // Get a single tool by ID
  getById: async (id: string): Promise<Tool> => {
    const response = await apiClient.get<{ success: boolean; data: Tool }>(
      `/tools/${id}`
    );
    return response.data.data;
  },

  // Update a tool
  update: async (id: string, data: UpdateToolData): Promise<Tool> => {
    const response = await apiClient.put<{ success: boolean; data: Tool }>(
      `/tools/${id}`,
      data
    );
    return response.data.data;
  },

  // Delete a tool
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tools/${id}`);
  },

  // ========== User-Specific ==========

  // Get current user's tools
  getMyTools: async (): Promise<Tool[]> => {
    const response = await apiClient.get<{ success: boolean; data: Tool[] }>(
      '/tools/my-tools'
    );
    return response.data.data;
  },

  // Get tools with owner details
  getWithOwner: async (params?: SearchParams): Promise<Tool[]> => {
    const response = await apiClient.get<{ success: boolean; data: Tool[] }>(
      '/tools/with-owner',
      { params }
    );
    return response.data.data;
  },

  // ========== Status & Availability ==========

  // Update tool status
  updateStatus: async (id: string, status: string): Promise<Tool> => {
    const response = await apiClient.patch<{ success: boolean; data: Tool }>(
      `/tools/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  // Check if tool is available
  checkAvailability: async (id: string): Promise<boolean> => {
    const response = await apiClient.get<{
      success: boolean;
      data: { isAvailable: boolean };
    }>(`/tools/${id}/availability`);
    return response.data.data.isAvailable;
  },

  // ========== Categories ==========

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<{ success: boolean; data: string[] }>(
      '/tools/categories'
    );
    return response.data.data;
  },

  // Get categories with counts
  getCategoryStats: async (): Promise<CategoryStats[]> => {
    const response = await apiClient.get<{
      success: boolean;
      data: CategoryStats[];
    }>('/tools/categories/stats');
    return response.data.data;
  },

  // ========== Featured & Stats ==========

  // Get featured tools
  getFeatured: async (limit: number = 6): Promise<Tool[]> => {
    const response = await apiClient.get<{ success: boolean; data: Tool[] }>(
      '/tools/featured',
      { params: { limit } }
    );
    return response.data.data;
  },

  // Get tool statistics
  getStats: async (): Promise<ToolStats> => {
    const response = await apiClient.get<{ success: boolean; data: ToolStats }>(
      '/tools/stats'
    );
    return response.data.data;
  },

  // ========== Bulk Operations ==========

  // Bulk update status
  bulkUpdateStatus: async (toolIds: string[], status: string): Promise<Tool[]> => {
    const response = await apiClient.patch<{ success: boolean; data: Tool[] }>(
      '/tools/bulk/status',
      { toolIds, status }
    );
    return response.data.data;
  },

  // Bulk delete
  bulkDelete: async (toolIds: string[]): Promise<void> => {
    await apiClient.delete('/tools/bulk', { data: { toolIds } });
  },
};