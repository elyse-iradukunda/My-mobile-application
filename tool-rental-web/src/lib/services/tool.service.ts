import { apiClient } from '@/lib/api-client';
import { Tool, ToolSearchParams } from '@/types/tool.types';

export const toolService = {
  search: (params?: ToolSearchParams) =>
    apiClient.get<{ data: Tool[] }>('/tools/search', { params }),

  getById: (id: string) =>
    apiClient.get<{ data: Tool }>(`/tools/${id}`),

  getByOwner: (ownerId: string) =>
    apiClient.get<{ data: Tool[] }>(`/tools/owner/${ownerId}`),

  create: (data: {
    title: string;
    description?: string;
    category: string;
    pricePerDay: number;
    deposit?: number;
    location: string;
    lat?: number;
    lng?: number;
    images?: string[];
  }) =>
    apiClient.post<{ success: boolean; data: Tool }>('/tools', data),

  update: (id: string, data: Partial<Tool>) =>
    apiClient.patch<{ data: Tool }>(`/tools/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/tools/${id}`),
};
