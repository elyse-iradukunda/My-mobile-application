import { useQuery } from '@tanstack/react-query';
import { toolService } from '@/lib/services/tool.service';
import { ToolSearchParams } from '@/types/tool.types';

export function useTools(params?: ToolSearchParams) {
  return useQuery({
    queryKey: ['tools', params],
    queryFn: () => toolService.search(params).then((res) => res.data.data),
  });
}
