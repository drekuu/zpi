import mockRouter from 'next-router-mock';

import { beforeAll, vi } from 'vitest';
beforeAll(() => {
  vi.mock('next/navigation', () => mockRouter);
});
