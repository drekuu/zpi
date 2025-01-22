import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';
import { redirect } from 'next/navigation';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: (opts) => {
      const { error } = opts;

      if (error.code === 'UNAUTHORIZED') {
        redirect('/login');
      }
    },
  });

export { handler as GET, handler as POST };
