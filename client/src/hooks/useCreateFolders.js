import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFolder } from '../api/folders';

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
}