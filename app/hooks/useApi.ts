import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '~/utils/config';

interface UseApiOptions {
  enabled?: boolean;
}

export function useApi<T>(endpoint: string, options?: UseApiOptions) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`);
      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      return response.json() as Promise<T>;
    },
    ...options,
  });
}
