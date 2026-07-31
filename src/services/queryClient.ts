import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './apiClient';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status && error.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});
