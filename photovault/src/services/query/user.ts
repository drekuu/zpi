import { useQuery } from '@tanstack/react-query';
import { getMyself } from '@/app/api/user';

export function useMyself() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getMyself().then((me) => me),
  });
}
