import * as mockRouter from 'next-router-mock';

import { beforeAll, vi } from 'vitest';
beforeAll(() => {
  vi.mock('next/navigation', () => ({
    ...mockRouter,
    usePathname: () => {
      const router = mockRouter.useRouter();
      const pathname = router.pathname;

      return pathname;
    },
  }));
});
