import * as mockRouter from 'next-router-mock';
import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  vi.mock('next/navigation', () => ({
    ...mockRouter,
    usePathname: () => {
      const router = mockRouter.useRouter();
      return router.pathname;
    },
  }));
});
