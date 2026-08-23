// hooks/useTools.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toolService } from '@/lib/services/tool.service';
import { ToolSearchParams, Tool } from '@/types/tool.types';

export type CreateToolInput = {
  title: string;
  description?: string;
  category: string;
  pricePerDay: number;
  deposit?: number;
  location: string;
  lat?: number;
  lng?: number;
  images?: string[];
};

export type UpdateToolInput = Partial<Tool>;

// ========== Queries ==========
export const useTools = (params?: ToolSearchParams) => {
  return useQuery({
    queryKey: ['tools', params],
    queryFn: () => toolService.search(params),
  });
};

export const useFeaturedTools = (limit: number = 6) => {
  return useQuery({
    queryKey: ['tools', 'featured', limit],
    queryFn: async () => {
      const response = await toolService.search();
      return response.data.data.slice(0, limit);
    },
  });
};

export const useTool = (id: string) => {
  return useQuery({
    queryKey: ['tools', id],
    queryFn: () => toolService.getById(id).then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useMyTools = () => {
  return useQuery({
    queryKey: ['tools', 'my-tools'],
    queryFn: async () => {
      const response = await toolService.search({});
      return response.data.data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['tools', 'categories'],
    queryFn: async () => {
      const response = await toolService.search();
      return [...new Set(response.data.data.map((tool) => tool.category))];
    },
  });
};

export const useCategoryStats = () => {
  return useQuery({
    queryKey: ['tools', 'categories', 'stats'],
    queryFn: async () => {
      const response = await toolService.search();
      const groups = new Map<string, number>();
      response.data.data.forEach((tool) => {
        groups.set(tool.category, (groups.get(tool.category) ?? 0) + 1);
      });
      return Array.from(groups.entries()).map(([category, count]) => ({ category, count }));
    },
  });
};

export const useToolStats = () => {
  return useQuery({
    queryKey: ['tools', 'stats'],
    queryFn: async () => {
      const response = await toolService.search();
      const tools = response.data.data;
      return {
        total: tools.length,
        available: tools.filter((tool) => tool.status === 'available').length,
        rented: tools.filter((tool) => tool.status === 'rented').length,
        myTotal: tools.length,
        myAvailable: tools.filter((tool) => tool.status === 'available').length,
        myRented: tools.filter((tool) => tool.status === 'rented').length,
      };
    },
  });
};

// ========== Mutations ==========
export const useCreateTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateToolInput) => toolService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
};

export const useUpdateTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateToolInput }) =>
      toolService.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      queryClient.invalidateQueries({ queryKey: ['tools', response.data.data.id] });
    },
  });
};

export const useDeleteTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toolService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
};

export const useUpdateToolStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return toolService.update(id, { status });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      queryClient.invalidateQueries({ queryKey: ['tools', response.data.data.id] });
    },
  });
};